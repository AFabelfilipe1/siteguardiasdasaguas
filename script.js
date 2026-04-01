// Navegação entre páginas
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Atualizar estado dos botões de navegação
    const buttons = document.querySelectorAll('nav .nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active-nav');
        btn.removeAttribute('aria-current');
        
        const btnPage = btn.getAttribute('data-page');
        if (btnPage === pageId) {
            btn.classList.add('active-nav');
            btn.setAttribute('aria-current', 'page');
        }
    });
    
    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sistema de abas para mecânicas
function showTab(tabId) {
    // Esconder todos os conteúdos
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar a aba selecionada
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Atualizar botões
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Encontrar e ativar o botão clicado
    const clickedButton = Array.from(buttons).find(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        return onclickAttr && onclickAttr.includes(tabId);
    });
    
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Cards de atualização expansíveis
function toggleCard(cardElement) {
    const content = cardElement.querySelector('.card-content');
    if (!content) return;
    
    const isCurrentlyOpen = content.classList.contains('show');
    
    // Fechar todos os outros cards primeiro
    if (!isCurrentlyOpen) {
        document.querySelectorAll('.update-card').forEach(card => {
            card.classList.remove('active');
            const otherContent = card.querySelector('.card-content');
            if (otherContent) {
                otherContent.classList.remove('show');
            }
        });
    }
    
    // Alternar o card clicado
    content.classList.toggle('show');
    cardElement.classList.toggle('active');
}

// Mensagem de download
function mostrarMensagem() {
    const btn = document.querySelector('.download-btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '📥 Iniciando download...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('📦 Download iniciado!\n\nEm breve você poderá baixar a demo completa do jogo "Mythos".');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 500);
}

// Fechar todos os cards com ESC
function handleKeyEvents(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.update-card').forEach(card => {
            card.classList.remove('active');
            const content = card.querySelector('.card-content');
            if (content) {
                content.classList.remove('show');
            }
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Logo clicável
    const logo = document.querySelector('.logo-image');
    if (logo) {
        logo.addEventListener('click', () => showPage('home'));
        logo.setAttribute('title', 'Clique para voltar à página inicial');
    }
    
    // Garantir que todos os cards de update comecem fechados
    document.querySelectorAll('.update-card').forEach(card => {
        card.classList.remove('active');
        const content = card.querySelector('.card-content');
        if (content) {
            content.classList.remove('show');
        }
    });
    
    // Teclado
    document.addEventListener('keydown', handleKeyEvents);
    
    // Botão inicial ativo por padrão
    const homeBtn = document.querySelector('nav .nav-btn[data-page="home"]');
    if (homeBtn) {
        homeBtn.classList.add('active-nav');
        homeBtn.setAttribute('aria-current', 'page');
    }
    
    // Links das redes sociais
    const instagramLink = document.querySelector('a[aria-label="Instagram"]');
    if (instagramLink) {
        instagramLink.href = 'https://www.instagram.com/guardias.aguas';
    }

    const youtubeLink = document.querySelector('a[aria-label="YouTube"]');
    if (youtubeLink) {
        youtubeLink.href = 'https://www.youtube.com/@leatoxufu4347';
    }
    
    // Configuração da galeria de miniaturas
    setupGallery();
    
    console.log('🌊 Guardiãs das Águas - Site carregado com sucesso!');
});

// Sistema de troca de trailer (estilo Steam)
function setupGallery() {
    let mainIframe = document.getElementById('main-trailer');
    const thumbItems = document.querySelectorAll('.thumb-item');
    
    if (!mainIframe) return;
    
    // Função para trocar o vídeo principal
    function changeTrailer(videoId, isImage, imgSrc) {
        const videoContainer = document.querySelector('.video-container');
        
        if (isImage && imgSrc) {
            // Para imagens estáticas (quando não for vídeo)
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = 'Conteúdo do jogo';
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            imgElement.style.borderRadius = '12px';
            imgElement.style.position = 'absolute';
            imgElement.style.top = '0';
            imgElement.style.left = '0';
            
            // Salvar o iframe original para restauração
            const originalIframe = mainIframe.cloneNode(true);
            
            // Limpar container e adicionar imagem
            videoContainer.innerHTML = '';
            videoContainer.appendChild(imgElement);
            
            // Adicionar evento para voltar ao trailer (duplo clique)
            imgElement.style.cursor = 'pointer';
            imgElement.title = 'Clique duas vezes para voltar ao trailer';
            imgElement.addEventListener('dblclick', () => {
                videoContainer.innerHTML = '';
                videoContainer.appendChild(originalIframe);
                mainIframe = document.getElementById('main-trailer');
            });
        } else if (videoId) {
            // Para vídeos do YouTube
            const baseUrl = 'https://www.youtube.com/embed/';
            const params = '?enablejsapi=1&rel=0';
            
            // Verificar se já é um vídeo
            if (videoContainer.querySelector('iframe')) {
                mainIframe.src = `${baseUrl}${videoId}${params}`;
            } else {
                // Restaurar iframe
                const newIframe = document.createElement('iframe');
                newIframe.id = 'main-trailer';
                newIframe.width = '100%';
                newIframe.height = '100%';
                newIframe.src = `${baseUrl}${videoId}${params}`;
                newIframe.title = 'Trailer do Jogo Guardiãs das Águas';
                newIframe.frameBorder = '0';
                newIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                newIframe.allowFullscreen = true;
                
                videoContainer.innerHTML = '';
                videoContainer.appendChild(newIframe);
                
                // Atualizar referência local do iframe restaurado
                mainIframe = document.getElementById('main-trailer');
            }
        }
    }
    
    // Adicionar evento de clique em cada thumbnail
    thumbItems.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const videoId = thumb.getAttribute('data-video');
            const imgSrc = thumb.getAttribute('data-img');
            
            if (videoId) {
                changeTrailer(videoId, false, null);
                // Remover classe active de todas as thumbs
                thumbItems.forEach(t => t.classList.remove('active-thumb'));
                thumb.classList.add('active-thumb');
            } else if (imgSrc) {
                changeTrailer(null, true, imgSrc);
                // Remover classe active de todas as thumbs
                thumbItems.forEach(t => t.classList.remove('active-thumb'));
                thumb.classList.add('active-thumb');
            }
        });
    });
    
    // Adicionar tooltips
    thumbItems.forEach(thumb => {
        const overlay = thumb.querySelector('.thumb-overlay span');
        if (overlay) {
            thumb.setAttribute('title', overlay.textContent);
        }
    });

    setupTrailerCarousel();
}

function setupTrailerCarousel() {
    const wrapper = document.querySelector('.carousel-wrapper');
    const viewport = document.querySelector('.thumbs-viewport');
    const track = document.querySelector('.thumbs-container');
    const slides = Array.from(document.querySelectorAll('.thumb-item'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelector('.carousel-indicators');

    if (!wrapper || !viewport || !track || slides.length === 0 || !prevBtn || !nextBtn || !indicators) {
        return;
    }

    let currentIndex = 0;
    let visibleSlides = 3;
    let autoplayTimer = null;
    const autoplayDelay = 3500;

    function getVisibleSlides() {
        const viewportWidth = viewport.clientWidth;
        const slideWidth = slides[0].getBoundingClientRect().width;
        if (!slideWidth) return 1;
        return Math.max(1, Math.round(viewportWidth / slideWidth));
    }

    function getMaxIndex() {
        return Math.max(0, slides.length - visibleSlides);
    }

    function renderDots() {
        indicators.innerHTML = '';
        const dotCount = getMaxIndex() + 1;

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `carousel-dot${i === currentIndex ? ' active' : ''}`;
            dot.setAttribute('aria-label', `Ir para grupo ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            indicators.appendChild(dot);
        }
    }

    function updateButtons() {
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
    }

    function updateTrackPosition() {
        const firstSlideWidth = slides[0].getBoundingClientRect().width;
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.gap) || 0;
        const offset = currentIndex * (firstSlideWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
    }

    function updateActiveDot() {
        const dots = indicators.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateCarousel() {
        const maxIndex = getMaxIndex();
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        updateTrackPosition();
        updateButtons();
        updateActiveDot();
    }

    function refreshCarouselLayout() {
        visibleSlides = getVisibleSlides();
        renderDots();
        updateCarousel();
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function startAutoplay() {
        stopAutoplay();
        if (slides.length <= visibleSlides) {
            return;
        }

        autoplayTimer = setInterval(() => {
            const maxIndex = getMaxIndex();
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex += 1;
            }
            updateCarousel();
        }, autoplayDelay);
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < getMaxIndex()) {
            currentIndex += 1;
            updateCarousel();
        }
    });

    window.addEventListener('resize', refreshCarouselLayout);
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
    refreshCarouselLayout();
    startAutoplay();
}

// Exportar funções para uso global
window.showPage = showPage;
window.showTab = showTab;
window.toggleCard = toggleCard;
window.mostrarMensagem = mostrarMensagem;
