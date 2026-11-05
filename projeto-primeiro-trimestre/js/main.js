/* ==========================================================================
   MAIN.JS — Funcionalidades, Temas, Validações e Interatividade
   Henrique Gabriel Barbosa — IF Goiano (Programação Web)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. TEMA CLARO / ESCURO (DARK / LIGHT THEME) COM PERSISTÊNCIA
    // ==========================================================================
    const themeToggle = document.getElementById('themeToggle');
    const rootHtml = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Define o tema inicial (salvo > preferência do sistema > dark)
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

    // ==========================================================================
    // 2. NAVBAR: EFEITO DE SCROLL E MENU MOBILE
    // ==========================================================================
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

        // Fecha o menu mobile ao clicar em qualquer link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ==========================================================================
    // 3. SCROLL SUAVE PARA ÂNCORAS
    // ==========================================================================
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

    // ==========================================================================
    // 4. DESTAQUE DO LINK ATIVO NA NAVBAR CONFORME SCROLL
    // ==========================================================================
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

    // ==========================================================================
    // 5. ANIMAÇÕES DE SCROLL (INTERSECTION OBSERVER)
    // ==========================================================================
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

    // ==========================================================================
    // 6. PARTÍCULAS NO HERO
    // ==========================================================================
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

    // ==========================================================================
    // 7. LIGHTBOX DA IMAGEM
    // ==========================================================================
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

    // ==========================================================================
    // 8. FORMULÁRIO: VALIDAÇÃO COMPLETA E MODAL DE SUCESSO
    // ==========================================================================
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

    // Botão para preencher data de hoje
    const fillTodayDate = () => {
        if (inputData) {
            const today = new Date().toISOString().split('T')[0];
            inputData.value = today;
            clearFieldError(inputData, 'errorData');
        }
    };

    if (btnFillToday) btnFillToday.addEventListener('click', fillTodayDate);
    // Inicializa data com hoje se vazio
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

    // Validação inline ao sair do campo
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

    // Envio do Formulário
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Validar Nome
            const nomeVal = inputNome.value.trim();
            if (!nomeVal || nomeVal.length < 3) {
                setFieldError(inputNome, 'errorNome', 'Informe o nome completo (mínimo 3 caracteres).');
                isValid = false;
            } else {
                clearFieldError(inputNome, 'errorNome');
            }

            // Validar Email
            const emailVal = inputEmail.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                setFieldError(inputEmail, 'errorEmail', 'Informe um endereço de e-mail válido.');
                isValid = false;
            } else {
                clearFieldError(inputEmail, 'errorEmail');
            }

            // Validar Senha
            const senhaVal = inputSenha.value;
            if (!senhaVal || senhaVal.length < 6) {
                setFieldError(inputSenha, 'errorSenha', 'A senha deve conter no mínimo 6 caracteres.');
                isValid = false;
            } else {
                clearFieldError(inputSenha, 'errorSenha');
            }

            // Validar Data
            const dataVal = inputData.value;
            if (!dataVal) {
                setFieldError(inputData, 'errorData', 'Selecione uma data válida.');
                isValid = false;
            } else {
                clearFieldError(inputData, 'errorData');
            }

            // Validar Peso
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

            // Formatação amigável da data
            const [ano, mes, dia] = dataVal.split('-');
            const dataFormatadaPtBr = `${dia}/${mes}/${ano}`;

            // Preenche o Modal de Sucesso
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
                        <span class="summary-value text-success" style="color: var(--success);">Validado &bull; Pronto para Servlet</span>
                    </div>
                `;
            }

            // Abre o modal
            if (successModal) {
                successModal.classList.add('show');
                successModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }

            showToast('Cadastro realizado e validado com sucesso!', 'success');
        });

        // Reset do formulário
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

    // Fechar modais ao teclar ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeSuccessModal();
        }
    });

    // ==========================================================================
    // 9. SISTEMA DE TOASTS DE NOTIFICAÇÃO
    // ==========================================================================
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
