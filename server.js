const path = require('path');
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = __dirname;

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']);
const MAX_FILES = 3;
const MAX_TOTAL_SIZE_BYTES = 10 * 1024 * 1024;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_TOTAL_SIZE_BYTES,
        files: MAX_FILES
    },
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname || '').toLowerCase();
        if (!ALLOWED_EXTENSIONS.has(extension)) {
            return cb(new Error(`Formato no permitido: ${file.originalname}`));
        }
        cb(null, true);
    }
}).fields([
    { name: 'attachment', maxCount: 1 },
    { name: 'attachment2', maxCount: 1 },
    { name: 'attachment3', maxCount: 1 }
]);

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Evita saltos de línea y caracteres que rompen cabeceras MIME o el nombre del adjunto. */
function safeAttachmentFilename(name) {
    const base = String(name || 'adjunto')
        .replace(/[\r\n\x00-\x1f"<>|?*\\]+/g, '_')
        .trim();
    return base.slice(0, 200) || 'adjunto';
}

/**
 * Validación básica para To/Cc/Reply-To. Si Reply-To es inválido, no se envía esa cabecera
 * (Gmail puede generar rebotes raros con direcciones mal formadas).
 */
function isValidEmailAddress(value) {
    if (!value || typeof value !== 'string') return false;
    const s = value.trim();
    if (s.length < 5 || s.length > 254) return false;
    if (/\s|[<>[\]]/.test(s)) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function parseEmailList(raw) {
    if (!raw || typeof raw !== 'string') return [];
    return raw
        .split(/[,;]/)
        .map((p) => p.trim())
        .filter(isValidEmailAddress);
}

function getTransporter() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        throw new Error('Faltan variables SMTP en .env');
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });
}

app.use(express.static(ROOT_DIR));

app.post('/api/contact', (req, res) => {
    const prefersJson = (req.get('accept') || '').includes('application/json');
    const replyError = (statusCode = 400) => {
        if (prefersJson) {
            return res.status(statusCode).json({ ok: false });
        }
        return res.redirect(303, '/?sent=error#contacto');
    };

    const replySuccess = () => {
        if (prefersJson) {
            return res.status(200).json({ ok: true });
        }
        return res.redirect(303, '/?sent=ok#contacto');
    };

    upload(req, res, async (uploadError) => {
        if (uploadError) {
            console.error(uploadError);
            return replyError(400);
        }

        if (req.body.website) {
            return replySuccess();
        }

        const fullName = (req.body.fullName || '').trim();
        const email = (req.body.email || '').trim();
        const whatsapp = (req.body.whatsapp || '').trim();
        const additionalMessage = (req.body.additionalMessage || '').trim() || 'Sin mensaje adicional.';

        const filesByField = req.files || {};
        const attachments = Object.values(filesByField).flat();
        const totalSize = attachments.reduce((sum, file) => sum + file.size, 0);

        if (!fullName || !email || attachments.length === 0 || attachments.length > MAX_FILES || totalSize > MAX_TOTAL_SIZE_BYTES) {
            return replyError(400);
        }

        if (!isValidEmailAddress(email)) {
            return replyError(400);
        }

        const mailToList = parseEmailList(process.env.MAIL_TO || '');
        if (mailToList.length === 0) {
            console.error('MAIL_TO no configurado o no es un correo válido en .env');
            return replyError(500);
        }

        const ccList = parseEmailList(process.env.MAIL_CC || '');
        const smtpUser = (process.env.SMTP_USER || '').trim();
        if (!isValidEmailAddress(smtpUser)) {
            console.error('SMTP_USER no es un correo válido en .env');
            return replyError(500);
        }

        // Gmail exige que el remitente sea esa cuenta o un alias "Enviar correo como" verificado.
        const fromRaw = (process.env.MAIL_FROM || '').trim();
        const fromHeader = fromRaw && isValidEmailAddress(fromRaw) ? fromRaw : smtpUser;

        const filesListHtml = attachments
            .map((file) => `<li>${escapeHtml(file.originalname)}</li>`)
            .join('');

        const html = `
            <h2>Nueva solicitud de traduccion</h2>
            <p><strong>Nombre completo:</strong> ${escapeHtml(fullName)}</p>
            <p><strong>Correo electrónico:</strong> ${escapeHtml(email)}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp ? escapeHtml(whatsapp) : '-'}</p>
            <p><strong>Mensaje adicional:</strong><br>${escapeHtml(additionalMessage).replace(/\n/g, '<br>')}</p>
            <p><strong>Archivos adjuntos:</strong></p>
            <ul>${filesListHtml}</ul>
        `;

        const text = [
            'Nueva solicitud de traduccion',
            `Nombre completo: ${fullName}`,
            `Correo electrónico: ${email}`,
            `WhatsApp: ${whatsapp || '-'}`,
            `Mensaje adicional: ${additionalMessage}`,
            'Archivos adjuntos:',
            ...attachments.map((file) => `- ${file.originalname}`)
        ].join('\n');

        try {
            const transporter = getTransporter();
            const envelopeTo = [...mailToList, ...ccList];
            const mailOptions = {
                from: fromHeader,
                envelope: {
                    from: smtpUser,
                    to: envelopeTo
                },
                to: mailToList.join(', '),
                subject: 'Nueva solicitud de traducción — Sitio web',
                text,
                html,
                attachments: attachments.map((file) => ({
                    filename: safeAttachmentFilename(file.originalname),
                    content: file.buffer,
                    contentType: file.mimetype || undefined
                }))
            };
            if (ccList.length) {
                mailOptions.cc = ccList.join(', ');
            }
            mailOptions.replyTo = email.trim();

            await transporter.sendMail(mailOptions);

            return replySuccess();
        } catch (mailError) {
            console.error(mailError);
            return replyError(500);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});
