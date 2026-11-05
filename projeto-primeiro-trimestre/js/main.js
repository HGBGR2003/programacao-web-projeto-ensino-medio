document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('themeToggle');
    const rootHtml = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    rootHtml.setAttribute('data-theme', initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = rootHtml.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            rootHtml.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            showToast(`Tema ${newTheme === 'dark' ? 'Escuro' : 'Claro'} ativado!`, 'info');
        });
    }

    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-links a:not(.nav-badge-link)');

    const highlightNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.style.color = '';
            item.style.background = '';
            if (item.getAttribute('href') === `#${current}`) {
                item.style.color = 'var(--primary-light)';
                item.style.background = 'rgba(99, 102, 241, 0.08)';
            }
        });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    const animatedElements = document.querySelectorAll(
        '.card, .form-wrapper, .about-text, .about-stats'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('visible'));
    }

    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(99, 102, 241, ${Math.random() * 0.35 + 0.15});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 4}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    const openImageModal = document.getElementById('openImageModal');
    const imageLightboxModal = document.getElementById('imageLightboxModal');
    const btnCloseLightbox = document.getElementById('btnCloseLightbox');
    const imageLightboxBackdrop = document.getElementById('imageLightboxBackdrop');

    const openLightbox = () => {
        if (imageLightboxModal) {
            imageLightboxModal.classList.add('show');
            imageLightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeLightbox = () => {
        if (imageLightboxModal) {
            imageLightboxModal.classList.remove('show');
            imageLightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (openImageModal) {
        openImageModal.addEventListener('click', openLightbox);
        openImageModal.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox();
            }
        });
    }

    if (btnCloseLightbox) btnCloseLightbox.addEventListener('click', closeLightbox);
    if (imageLightboxBackdrop) imageLightboxBackdrop.addEventListener('click', closeLightbox);

    const form = document.getElementById('mainForm');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('senha');
    const inputData = document.getElementById('data');
    const inputPeso = document.getElementById('peso');
    const btnFillToday = document.getElementById('btnFillToday');

    const successModal = document.getElementById('successModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const modalSummary = document.getElementById('modalSummary');

    const fillTodayDate = () => {
        if (inputData) {
            const today = new Date().toISOString().split('T')[0];
            inputData.value = today;
            clearFieldError(inputData, 'errorData');
        }
    };

    if (btnFillToday) btnFillToday.addEventListener('click', fillTodayDate);
    if (inputData && !inputData.value) {
        fillTodayDate();
    }

    const setFieldError = (input, errorId, message) => {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        const errElem = document.getElementById(errorId);
        if (errElem) errElem.textContent = message;
    };

    const clearFieldError = (input, errorId) => {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        const errElem = document.getElementById(errorId);
        if (errElem) errElem.textContent = '';
    };

    inputNome?.addEventListener('blur', () => {
        if (!inputNome.value.trim() || inputNome.value.trim().length < 3) {
            setFieldError(inputNome, 'errorNome', 'Informe o nome completo (mínimo 3 caracteres).');
        } else {
            clearFieldError(inputNome, 'errorNome');
        }
    });

    inputEmail?.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputEmail.value.trim() || !emailRegex.test(inputEmail.value.trim())) {
            setFieldError(inputEmail, 'errorEmail', 'Informe um endereço de e-mail válido.');
        } else {
            clearFieldError(inputEmail, 'errorEmail');
        }
    });

    inputSenha?.addEventListener('blur', () => {
        if (!inputSenha.value || inputSenha.value.length < 6) {
            setFieldError(inputSenha, 'errorSenha', 'A senha deve conter no mínimo 6 caracteres.');
        } else {
            clearFieldError(inputSenha, 'errorSenha');
        }
    });

    inputPeso?.addEventListener('blur', () => {
        const val = parseFloat(inputPeso.value);
        if (isNaN(val) || val <= 0 || val > 500) {
            setFieldError(inputPeso, 'errorPeso', 'Peso deve ser maior que 0 e menor que 500 kg.');
        } else {
            clearFieldError(inputPeso, 'errorPeso');
        }
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            const nomeVal = inputNome.value.trim();
            if (!nomeVal || nomeVal.length < 3) {
                setFieldError(inputNome, 'errorNome', 'Informe o nome completo (mínimo 3 caracteres).');
                isValid = false;
            } else {
                clearFieldError(inputNome, 'errorNome');
            }

            const emailVal = inputEmail.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                setFieldError(inputEmail, 'errorEmail', 'Informe um endereço de e-mail válido.');
                isValid = false;
            } else {
                clearFieldError(inputEmail, 'errorEmail');
            }

            const senhaVal = inputSenha.value;
            if (!senhaVal || senhaVal.length < 6) {
                setFieldError(inputSenha, 'errorSenha', 'A senha deve conter no mínimo 6 caracteres.');
                isValid = false;
            } else {
                clearFieldError(inputSenha, 'errorSenha');
            }

            const dataVal = inputData.value;
            if (!dataVal) {
                setFieldError(inputData, 'errorData', 'Selecione uma data válida.');
                isValid = false;
            } else {
                clearFieldError(inputData, 'errorData');
            }

            const pesoVal = parseFloat(inputPeso.value);
            if (isNaN(pesoVal) || pesoVal <= 0 || pesoVal > 500) {
                setFieldError(inputPeso, 'errorPeso', 'Informe um peso numérico positivo válido (ex: 72.5).');
                isValid = false;
            } else {
                clearFieldError(inputPeso, 'errorPeso');
            }

            if (!isValid) {
                showToast('Por favor, corrija os erros no formulário antes de prosseguir.', 'error');
                return;
            }

            const [ano, mes, dia] = dataVal.split('-');
            const dataFormatadaPtBr = `${dia}/${mes}/${ano}`;

            if (modalSummary) {
                modalSummary.innerHTML = `
                    <div class="summary-item">
                        <span class="summary-label">Nome:</span>
                        <span class="summary-value">${escapeHtml(nomeVal)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">E-mail:</span>
                        <span class="summary-value">${escapeHtml(emailVal)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Data Informada:</span>
                        <span class="summary-value">${dataFormatadaPtBr}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Peso Corporal:</span>
                        <span class="summary-value">${pesoVal.toFixed(1)} kg</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Status do Backend:</span>
                        <span class="summary-value" style="color: var(--success);">Validado &bull; Pronto para Servlet</span>
                    </div>
                `;
            }

            if (successModal) {
                successModal.classList.add('show');
                successModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }

            showToast('Cadastro realizado e validado com sucesso!', 'success');
        });

        form.addEventListener('reset', () => {
            setTimeout(() => {
                document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                    el.classList.remove('is-valid', 'is-invalid');
                });
                document.querySelectorAll('.field-error').forEach(el => {
                    el.textContent = '';
                });
                fillTodayDate();
            }, 50);
        });
    }

    const closeSuccessModal = () => {
        if (successModal) {
            successModal.classList.remove('show');
            successModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (btnCloseModal) btnCloseModal.addEventListener('click', closeSuccessModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeSuccessModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeSuccessModal();
        }
    });

    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '⚠️';

        toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
