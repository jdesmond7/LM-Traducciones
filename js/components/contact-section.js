/**
 * Contact Section Component
 * Reusable contact block for pages that need the full form.
 */
(function initContactSectionComponent() {
    const root = document.getElementById('contact-section-root');
    if (!root) return;

    root.innerHTML = `
        <section class="contact" id="contacto">
            <div class="container">
                <div class="contact-wrapper">
                    <div class="contact-info fade-in">
                        <span class="section-tag">Contacto</span>
                        <h2 class="section-title">
                            ¿Listo para<br>
                            <span class="accent">comenzar?</span>
                        </h2>
                        <p class="contact-description">
                            Envíame tu documento para recibir una cotización personalizada.
                            Respuesta garantizada en menos de 24 horas.
                        </p>

                        <div class="contact-methods">
                            <a href="https://wa.me/528116009783" class="contact-method" target="_blank" rel="noopener">
                                <div class="method-icon whatsapp">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </div>
                                <div class="method-info">
                                    <span class="method-label">WhatsApp</span>
                                    <span class="method-value">8116009783</span>
                                </div>
                            </a>

                            <a href="mailto:maleni.uribe.mtz@gmail.com" class="contact-method">
                                <div class="method-icon email">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                                        <path d="M22 6l-10 7L2 6"/>
                                    </svg>
                                </div>
                                <div class="method-info">
                                    <span class="method-label">Email</span>
                                    <span class="method-value">maleni.uribe.mtz@gmail.com</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="contact-form-wrapper fade-in">
                        <form class="contact-form" id="contact-form" action="/api/contact" method="POST" enctype="multipart/form-data">
                            <input type="text" name="website" class="form-honeypot" tabindex="-1" autocomplete="off">
                            <div class="form-group">
                                <label for="name">Nombre completo</label>
                                <input type="text" id="name" name="fullName" required placeholder="Tu nombre">
                            </div>
                            <div class="form-group">
                                <label for="email">Correo electrónico</label>
                                <input type="email" id="email" name="email" required placeholder="tu@email.com">
                            </div>
                            <div class="form-group">
                                <label for="whatsapp">WhatsApp (opcional)</label>
                                <input type="tel" id="whatsapp" name="whatsapp" placeholder="+52 81 1234 5678">
                            </div>
                            <div class="form-group">
                                <label for="files">Documentos</label>
                                <input type="file" id="files" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple class="file-input-hidden">
                                <input type="file" name="attachment" class="file-input-hidden" data-attachment-slot="1" tabindex="-1" aria-hidden="true">
                                <input type="file" name="attachment2" class="file-input-hidden" data-attachment-slot="2" tabindex="-1" aria-hidden="true">
                                <input type="file" name="attachment3" class="file-input-hidden" data-attachment-slot="3" tabindex="-1" aria-hidden="true">
                                <div class="dropzone" id="file-dropzone" role="button" tabindex="0" aria-controls="files" aria-label="Seleccionar documentos">
                                    <p class="dropzone-title">Haz clic aquí o arrastra tus archivos</p>
                                    <p class="dropzone-subtitle">Formatos permitidos: PDF, DOC, DOCX, JPG y PNG</p>
                                    <p class="dropzone-limits">Máximo 3 archivos por envío, 10MB en total.</p>
                                </div>
                                <div id="file-feedback" class="file-feedback" aria-live="polite"></div>
                                <ul id="file-list" class="file-list"></ul>
                            </div>
                            <div class="form-group">
                                <label for="optional-message">Mensaje adicional (opcional)</label>
                                <textarea id="optional-message" name="additionalMessage" rows="4" placeholder="Detalles adicionales sobre tu documento..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-full">
                                <span>Enviar solicitud</span>
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
