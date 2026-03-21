/**
 * LM Landing - Liz Maleni Traductora Certificada
 * JavaScript - Animations & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Each initializer runs in isolation so one failure (e.g. missing DOM node)
    // does not skip later setup — notably initContactForm must always attach
    // submit handler to avoid a native POST and full-page redirect from /api/contact.
    const safe = (fn, name) => {
        try {
            fn();
        } catch (err) {
            console.error(`[LM] ${name} failed:`, err);
        }
    };

    safe(initNavbar, 'initNavbar');
    safe(initMobileMenu, 'initMobileMenu');
    safe(initScrollAnimations, 'initScrollAnimations');
    safe(initLanguageToggle, 'initLanguageToggle');
    safe(initSmoothScroll, 'initSmoothScroll');
    safe(initContactForm, 'initContactForm');
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    const links = menu.querySelectorAll('.nav-link');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Scroll-triggered fade-in animations
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.transitionDelay = `${delay * 0.1}s`;
                }
                
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));
}

/**
 * Language toggle for pricing section
 */
function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-es][data-en]');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;

            // Update active state
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Translate elements
            translatableElements.forEach(el => {
                const text = el.dataset[lang];
                if (text) {
                    // Animate the transition
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(-5px)';
                    
                    setTimeout(() => {
                        el.textContent = text;
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 150);
                }
            });
        });
    });

    // Add transition styles dynamically
    translatableElements.forEach(el => {
        el.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    function ensureSuccessModal() {
        let modal = document.getElementById('success-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'success-modal';
            modal.id = 'success-modal';
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
                <div class="success-modal__backdrop" data-close-success-modal></div>
                <div class="success-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="success-modal-title">
                    <div id="success-animation" class="success-modal__animation" aria-hidden="true"></div>
                    <h3 id="success-modal-title" class="success-modal__title">Solicitud enviada correctamente</h3>
                    <p class="success-modal__message">
                        Gracias por tu solicitud. La revisare a la brevedad y recibiras una respuesta en un plazo de 24 a 48 horas.
                        Por favor, mantente al pendiente de tu correo electronico.
                    </p>
                    <button type="button" class="btn btn-primary btn-full success-modal__button" id="success-modal-close">
                        Entendido
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
        }

        if (!window.lottie && !document.querySelector('script[data-lottie-loader="true"]')) {
            const lottieScript = document.createElement('script');
            lottieScript.src = 'js/vendor/lottie.min.js';
            lottieScript.setAttribute('data-lottie-loader', 'true');
            document.body.appendChild(lottieScript);
        }

        return {
            successModal: modal,
            successModalCloseBtn: modal.querySelector('#success-modal-close'),
            successModalBackdrop: modal.querySelector('[data-close-success-modal]'),
            successAnimationContainer: modal.querySelector('#success-animation')
        };
    }

    const {
        successModal,
        successModalCloseBtn,
        successModalBackdrop,
        successAnimationContainer
    } = ensureSuccessModal();

    const filePickerInput = form.querySelector('#files');
    const attachmentInputs = Array.from(form.querySelectorAll('[data-attachment-slot]'));
    const dropzone = form.querySelector('#file-dropzone');
    const fileList = form.querySelector('#file-list');
    const fileFeedback = form.querySelector('#file-feedback');
    const optionalMessageInput = form.querySelector('#optional-message');

    if (!fileList || !fileFeedback || !dropzone || !optionalMessageInput || attachmentInputs.length === 0) {
        console.warn('[LM] Formulario de contacto incompleto: faltan nodos esperados.');
        return;
    }

    const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']);
    const MAX_FILES = 3;
    const MAX_TOTAL_SIZE_BYTES = 10 * 1024 * 1024;
    const MIN_SPINNER_MS = 900;

    let selectedFiles = [];
    let successAnimationInstance = null;

    function playSuccessAnimationOnce() {
        if (!successAnimationContainer || !window.lottie) return;

        if (!successAnimationInstance) {
            successAnimationInstance = window.lottie.loadAnimation({
                container: successAnimationContainer,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'js/Success.json'
            });
        }

        successAnimationInstance.stop();
        successAnimationInstance.goToAndPlay(0, true);
    }

    function closeSuccessModal() {
        if (!successModal || !successModal.classList.contains('is-open')) return;

        successModal.classList.add('is-closing');
        successModal.classList.remove('is-open');

        const dialog = successModal.querySelector('.success-modal__dialog');
        const finishClose = () => {
            successModal.classList.remove('is-closing');
            successModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (dialog) {
            dialog.addEventListener('transitionend', finishClose, { once: true });
        } else {
            finishClose();
        }
    }

    function openSuccessModal() {
        if (!successModal) return;
        successModal.classList.remove('is-closing');
        successModal.classList.add('is-open');
        successModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        playSuccessAnimationOnce();
    }

    function setSubmitLoadingState(isLoading) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Enviando...</span>
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                    </circle>
                </svg>
            `;
            return;
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <span>Enviar solicitud</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
        `;
    }

    function bytesToMB(bytes) {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    function setFeedback(message, type = '') {
        fileFeedback.textContent = message;
        fileFeedback.className = 'file-feedback';
        dropzone.classList.remove('invalid');

        if (type) {
            fileFeedback.classList.add(type);
        }

        if (type === 'error') {
            dropzone.classList.add('invalid');
        }
    }

    function getFileKey(file) {
        return `${file.name}-${file.size}-${file.lastModified}`;
    }

    function isDropzoneDisabled() {
        return selectedFiles.length >= MAX_FILES;
    }

    function updateDropzoneState() {
        const disabled = isDropzoneDisabled();
        dropzone.classList.toggle('disabled', disabled);
        dropzone.setAttribute('aria-disabled', String(disabled));
    }

    function renderFileList() {
        fileList.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            const item = document.createElement('li');
            item.className = 'file-card';
            item.innerHTML = `
                <div class="file-card-meta">
                    <p class="file-card-name">${file.name}</p>
                    <p class="file-card-size">${bytesToMB(file.size)}</p>
                </div>
                <button type="button" class="file-card-remove" data-remove-file-index="${index}" aria-label="Eliminar ${file.name}">
                    Eliminar
                </button>
            `;
            fileList.appendChild(item);
        });
    }

    function syncAttachmentInputs() {
        attachmentInputs.forEach((attachmentInput, index) => {
            const dataTransfer = new DataTransfer();
            const file = selectedFiles[index];
            if (file) {
                dataTransfer.items.add(file);
            }
            attachmentInput.files = dataTransfer.files;
        });
    }

    function addFilesToSelection(files) {
        const incomingFiles = Array.from(files || []);
        if (incomingFiles.length === 0) {
            return false;
        }

        const invalidExtensionFiles = incomingFiles.filter(file => {
            const extension = `.${(file.name.split('.').pop() || '').toLowerCase()}`;
            return !ALLOWED_EXTENSIONS.has(extension);
        });

        if (invalidExtensionFiles.length > 0) {
            setFeedback(
                `Archivo no permitido: ${invalidExtensionFiles.map(file => file.name).join(', ')}. Solo PDF, DOC, DOCX, JPG y PNG.`,
                'error'
            );
            return false;
        }

        const currentKeys = new Set(selectedFiles.map(getFileKey));
        const dedupedIncomingFiles = incomingFiles.filter(file => !currentKeys.has(getFileKey(file)));
        const mergedFiles = [...selectedFiles, ...dedupedIncomingFiles];

        if (mergedFiles.length > MAX_FILES) {
            setFeedback(`Solo se permiten ${MAX_FILES} archivos por envío.`, 'error');
            return false;
        }

        const totalSize = mergedFiles.reduce((sum, file) => sum + file.size, 0);
        if (totalSize > MAX_TOTAL_SIZE_BYTES) {
            setFeedback(
                `El peso total excede 10MB (${bytesToMB(totalSize)}). Reduce el tamaño de los archivos.`,
                'error'
            );
            return false;
        }

        selectedFiles = mergedFiles;
        syncAttachmentInputs();
        renderFileList();
        updateDropzoneState();
        setFeedback(`${selectedFiles.length} archivo(s) listo(s) para enviar.`, 'success');
        return true;
    }

    if (dropzone && filePickerInput) {
        dropzone.addEventListener('click', () => {
            if (isDropzoneDisabled()) {
                setFeedback(`Ya alcanzaste el límite de ${MAX_FILES} archivos.`, 'error');
                return;
            }
            filePickerInput.click();
        });
        dropzone.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if (isDropzoneDisabled()) {
                    setFeedback(`Ya alcanzaste el límite de ${MAX_FILES} archivos.`, 'error');
                    return;
                }
                filePickerInput.click();
            }
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (event) => {
                event.preventDefault();
                if (isDropzoneDisabled()) return;
                dropzone.classList.add('active');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.remove('active');
            });
        });

        dropzone.addEventListener('drop', (event) => {
            event.preventDefault();
            if (isDropzoneDisabled()) {
                setFeedback(`Ya alcanzaste el límite de ${MAX_FILES} archivos.`, 'error');
                return;
            }
            addFilesToSelection(event.dataTransfer.files);
        });

        filePickerInput.addEventListener('change', () => {
            addFilesToSelection(filePickerInput.files);
            filePickerInput.value = '';
        });
    }

    fileList.addEventListener('click', (event) => {
        const removeButton = event.target.closest('[data-remove-file-index]');
        if (!removeButton) return;

        const fileIndex = Number(removeButton.dataset.removeFileIndex);
        if (Number.isNaN(fileIndex)) return;

        selectedFiles.splice(fileIndex, 1);
        syncAttachmentInputs();
        renderFileList();
        updateDropzoneState();

        if (selectedFiles.length === 0) {
            setFeedback('No hay archivos seleccionados.');
            return;
        }

        setFeedback(`${selectedFiles.length} archivo(s) listo(s) para enviar.`, 'success');
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (selectedFiles.length === 0) {
            setFeedback('Debes agregar al menos un archivo.', 'error');
            return;
        }

        syncAttachmentInputs();
        const preparedAttachments = attachmentInputs.reduce(
            (total, attachmentInput) => total + (attachmentInput.files?.length || 0),
            0
        );
        if (preparedAttachments !== selectedFiles.length) {
            setFeedback('No fue posible preparar los archivos para el envío. Intenta de nuevo.', 'error');
            return;
        }

        // Keep the optional message field meaningful even when left blank.
        if (!optionalMessageInput.value.trim()) {
            optionalMessageInput.value = 'Sin mensaje adicional.';
        }

        setSubmitLoadingState(true);

        try {
            const formData = new FormData(form);
            const [response] = await Promise.all([
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json'
                    }
                }),
                new Promise(resolve => setTimeout(resolve, MIN_SPINNER_MS))
            ]);

            if (!response.ok) {
                throw new Error('Error al enviar formulario');
            }

            setFeedback('Solicitud enviada correctamente. Revisaremos tu informacion pronto.', 'success');
            form.reset();
            selectedFiles = [];
            syncAttachmentInputs();
            renderFileList();
            updateDropzoneState();
            openSuccessModal();
        } catch (error) {
            setFeedback('No se pudo enviar la solicitud. Intenta nuevamente.', 'error');
        } finally {
            setSubmitLoadingState(false);
        }
    });

    setFeedback('No hay archivos seleccionados.');

    updateDropzoneState();

    if (successModalCloseBtn) {
        successModalCloseBtn.addEventListener('click', closeSuccessModal);
    }

    if (successModalBackdrop) {
        successModalBackdrop.addEventListener('click', closeSuccessModal);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSuccessModal();
        }
    });

    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Parallax effect for hero (subtle)
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (!hero || !heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    });
}

/**
 * Typing animation for hero title (optional enhancement)
 */
function initTypingAnimation() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            line.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
}

/**
 * Counter animation for statistics (if added later)
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
