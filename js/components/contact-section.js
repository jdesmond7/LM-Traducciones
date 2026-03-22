/**
 * Contact Section Component
 * Reusable contact block for pages that need the full form.
 */
(function initContactSectionComponent() {
    const root = document.getElementById('contact-section-root');
    if (!root) return;

    const lang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase();
    const isEn = lang.startsWith('en');
    const imgPrefix = isEn ? '../' : '';

    const svgWhatsApp = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>`;

    const copy = isEn
        ? {
              tag: 'Contact',
              titleLine1: 'Ready to',
              titleAccent: 'get started?',
              intro:
                  'Send your document for a personalized quote. I respond within 24 hours.',
              platforms:
                  'Find me on professional platforms to verify my credentials and learn more about my academic and professional background.',
              qrIntro:
                  'To verify the authenticity and validity of my authorization as a Court-Certified Translator, scan the following QR code:',
              qrAlt:
                  'QR code to verify the authenticity and validity of the Court-Certified Translator authorization',
              waLabel: 'WhatsApp, open chat at 81 1600 9783',
              emailLabel: 'Send email to maleni.uribe.mtz@gmail.com',
              linkedInLabel: "LinkedIn, Liz Maleni Uribe's profile",
              uanlLabel: 'Researcher profile at UANL',
              igLabel: 'Instagram @lizmalenitraduccion',
              profLabel: 'Professional profile',
              fullName: 'Full name',
              fullNamePh: 'Your name',
              email: 'Email',
              emailPh: 'you@email.com',
              wa: 'WhatsApp (optional)',
              waPh: '+52 81 1234 5678',
              files: 'Documents',
              dzLabel: 'Select documents',
              dzTitle: 'Click here or drag your files',
              dzSub: 'Allowed formats: PDF, DOC, DOCX, JPG and PNG',
              dzLim: 'Up to 3 files per submission, 10MB total.',
              msg: 'Additional message (optional)',
              msgPh: 'Additional details about your document…',
              submit: 'Send request',
          }
        : {
              tag: 'Contacto',
              titleLine1: '¿Listo para',
              titleAccent: 'comenzar?',
              intro:
                  'Envíame tu documento para recibir una cotización personalizada. Respuesta garantizada en menos de 24 horas.',
              platforms:
                  'Encuéntrame en plataformas profesionales para verificar mis credenciales y conocer más sobre mi trayectoria académica y profesional.',
              qrIntro:
                  'Para verificar la autenticidad y vigencia de mi autorización como perito, escanee el siguiente código QR:',
              qrAlt:
                  'Código QR para verificar la autenticidad y vigencia de la autorización como perito',
              waLabel: 'WhatsApp, abrir chat al 81 1600 9783',
              emailLabel: 'Enviar correo a maleni.uribe.mtz@gmail.com',
              linkedInLabel: 'LinkedIn, perfil de Liz Maleni Uribe',
              uanlLabel: 'Perfil de investigadora en la UANL',
              igLabel: 'Instagram @lizmalenitraduccion',
              profLabel: 'Perfil profesional',
              fullName: 'Nombre completo',
              fullNamePh: 'Tu nombre',
              email: 'Correo electrónico',
              emailPh: 'tu@email.com',
              wa: 'WhatsApp (opcional)',
              waPh: '+52 81 1234 5678',
              files: 'Documentos',
              dzLabel: 'Seleccionar documentos',
              dzTitle: 'Haz clic aquí o arrastra tus archivos',
              dzSub: 'Formatos permitidos: PDF, DOC, DOCX, JPG y PNG',
              dzLim: 'Máximo 3 archivos por envío, 10MB en total.',
              msg: 'Mensaje adicional (opcional)',
              msgPh: 'Detalles adicionales sobre tu documento...',
              submit: 'Enviar solicitud',
          };

    root.innerHTML = `
        <section class="contact" id="contacto">
            <div class="container">
                <header class="contact-section-header fade-in">
                    <span class="section-tag">${copy.tag}</span>
                    <h2 class="section-title">
                        ${copy.titleLine1}<br>
                        <span class="accent">${copy.titleAccent}</span>
                    </h2>
                    <p class="contact-description">
                        ${copy.intro}
                    </p>
                </header>
                <div class="contact-wrapper">
                    <div class="contact-info fade-in">
                        <div class="contact-methods contact-info-direct">
                            <a href="https://wa.me/528116009783" class="contact-method" target="_blank" rel="noopener" aria-label="${copy.waLabel}">
                                <div class="method-icon whatsapp">
                                    ${svgWhatsApp}
                                </div>
                                <div class="method-info">
                                    <span class="method-label">WhatsApp</span>
                                </div>
                            </a>

                            <a href="mailto:maleni.uribe.mtz@gmail.com" class="contact-method" aria-label="${copy.emailLabel}">
                                <div class="method-icon email">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                                        <path d="M22 6l-10 7L2 6"/>
                                    </svg>
                                </div>
                                <div class="method-info">
                                    <span class="method-label">Email</span>
                                </div>
                            </a>
                        </div>

                        <p class="contact-description">
                            ${copy.platforms}
                        </p>
                        <div class="contact-methods contact-info-professional-links" role="list">
                            <a href="https://www.linkedin.com/in/lizmaleni/" class="contact-method" target="_blank" rel="noopener noreferrer" role="listitem" aria-label="${copy.linkedInLabel}">
                                <div class="method-icon linkedin" aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </div>
                                <div class="method-info">
                                    <span class="method-label">LinkedIn</span>
                                </div>
                            </a>
                            <a href="https://www.uanl.mx/investigadores/liz-maleni-uribe-martinez/" class="contact-method" target="_blank" rel="noopener noreferrer" role="listitem" aria-label="${copy.uanlLabel}">
                                <div class="method-icon graduation-cap" aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                                    </svg>
                                </div>
                                <div class="method-info">
                                    <span class="method-label">${copy.profLabel}</span>
                                </div>
                            </a>
                            <a href="https://www.instagram.com/lizmalenitraduccion?igsh=a3MxbWJubjM4cWFs" class="contact-method" target="_blank" rel="noopener noreferrer" role="listitem" aria-label="${copy.igLabel}">
                                <div class="method-icon instagram" aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </div>
                                <div class="method-info">
                                    <span class="method-label">Instagram</span>
                                </div>
                            </a>
                        </div>

                        <div class="contact-perito-qr">
                            <p class="contact-description">
                                ${copy.qrIntro}
                            </p>
                            <img src="${imgPrefix}images/QR-perito.png" alt="${copy.qrAlt}" class="contact-perito-qr__image" loading="lazy" decoding="async">
                        </div>
                    </div>

                    <div class="contact-form-wrapper fade-in">
                        <form class="contact-form" id="contact-form" action="/api/contact" method="POST" enctype="multipart/form-data">
                            <input type="text" name="website" class="form-honeypot" tabindex="-1" autocomplete="off">
                            <div class="form-group">
                                <label for="name">${copy.fullName}</label>
                                <input type="text" id="name" name="fullName" required placeholder="${copy.fullNamePh}">
                            </div>
                            <div class="form-group">
                                <label for="email">${copy.email}</label>
                                <input type="email" id="email" name="email" required placeholder="${copy.emailPh}">
                            </div>
                            <div class="form-group">
                                <label for="whatsapp">${copy.wa}</label>
                                <input type="tel" id="whatsapp" name="whatsapp" placeholder="${copy.waPh}">
                            </div>
                            <div class="form-group">
                                <label for="files">${copy.files}</label>
                                <input type="file" id="files" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple class="file-input-hidden">
                                <input type="file" name="attachment" class="file-input-hidden" data-attachment-slot="1" tabindex="-1" aria-hidden="true">
                                <input type="file" name="attachment2" class="file-input-hidden" data-attachment-slot="2" tabindex="-1" aria-hidden="true">
                                <input type="file" name="attachment3" class="file-input-hidden" data-attachment-slot="3" tabindex="-1" aria-hidden="true">
                                <div class="dropzone" id="file-dropzone" role="button" tabindex="0" aria-controls="files" aria-label="${copy.dzLabel}">
                                    <p class="dropzone-title">${copy.dzTitle}</p>
                                    <p class="dropzone-subtitle">${copy.dzSub}</p>
                                    <p class="dropzone-limits">${copy.dzLim}</p>
                                </div>
                                <div id="file-feedback" class="file-feedback" aria-live="polite"></div>
                                <ul id="file-list" class="file-list"></ul>
                            </div>
                            <div class="form-group">
                                <label for="optional-message">${copy.msg}</label>
                                <textarea id="optional-message" name="additionalMessage" rows="4" placeholder="${copy.msgPh}"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-full">
                                <span>${copy.submit}</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `;
})();
