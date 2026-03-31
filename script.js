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
                otherContent.style.display = 'none';
            }
        });
    }
    
    // Alternar o card clicado
    content.classList.toggle('show');
    content.style.display = content.classList.contains('show') ? 'block' : 'none';
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
                content.style.display = 'none';
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
            content.style.display = 'none';
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
    
    // Botao clicavel para perfil do instagram
    const instagramLink = document.querySelector('a[aria-label="Instagram"]');
    if (instagramLink) {
        instagramLink.href = 'https://www.instagram.com/guardias.aguas';
    }

    // Botão clicável para canal do YouTube
    const youtubeLink = document.querySelector('a[aria-label="YouTube"]');
    if (youtubeLink) {
        youtubeLink.href = 'https://www.youtube.com/@leatoxufu4347';
    }

    // Trailer clicável
    function embedTrailer(containerId, videoId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Parâmentros padrão(privacy-enhanced)
        const params = new URLSearchParams({
            enablejsapi: 1,
            autoplay: 0,
            rel: 0,
            modelbranding: 1,
            ...options
        });

        // Usa youtube-nocokie.com para privacidade
        const embledUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;

        // Criar o iframe responsivo 
        container.innerHTML = `
            <div class="video-wrapper">
                <iframe
                    src="${embledUrl}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
        `;
    }


    console.log('🌊 Guardiãs das Águas - Site carregado com sucesso!');
});

// Sistema de troca de trailer (estilo Steam)
document.addEventListener('DOMContentLoaded', () => {
    // Configuração dos vídeos da galeria
    const videos = {
        'BDyTQmUd_aw': 'Trailer Oficial - Guardiãs das Águas',
        'assets/thumb-gameplay1.jpg': 'Gameplay: Batalha contra espíritos',
        'assets/thumb-gameplay2.jpg': 'Gameplay: Exploração da floresta',
        'assets/thumb-apresentaçãopersonagens.jpg': 'Apresentação dos personagens'
    };
    
    // Pegar elementos
    const mainIframe = document.getElementById('main-trailer');
    const thumbItems = document.querySelectorAll('.thumb-item');
    
    // Função para trocar o vídeo principal
    function changeTrailer(videoId, title) {
        if (!mainIframe) return;
        
        // Atualizar o src do iframe
        const currentSrc = mainIframe.src;
        const baseUrl = 'https://www.youtube.com/embed/';
        const params = '?enablejsapi=1&rel=0&modestbranding=1';
        
        mainIframe.src = `${baseUrl}${videoId}${params}`;
        
        // Atualizar título do vídeo (opcional)
        const trailerTitle = document.querySelector('.galeria-trailer h3');
        if (trailerTitle && title) {
            // Você pode criar um elemento separado para mostrar o título do vídeo atual
            console.log(`🎬 Reproduzindo: ${title}`);
        }
        
        // Scroll suave até o vídeo (opcional)
        const videoContainer = document.querySelector('.trailer-principal');
        if (videoContainer && window.innerWidth <= 768) {
            videoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Adicionar evento de clique em cada thumbnail
    thumbItems.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            const videoId = thumb.getAttribute('data-video');
            const videoTitle = videos[videoId] || 'Vídeo do jogo';
            
            if (videoId) {
                changeTrailer(videoId, videoTitle);
                
                // Remover classe active de todas as thumbs
                thumbItems.forEach(t => t.classList.remove('active-thumb'));
                // Adicionar classe active na thumb clicada
                thumb.classList.add('active-thumb');
            }
        });
    });
    
    // Adicionar efeito de hover com tooltip
    thumbItems.forEach(thumb => {
        const overlay = thumb.querySelector('.thumb-overlay span');
        if (overlay) {
            thumb.setAttribute('title', overlay.textContent);
        }
    });
});

// Se quiser que o vídeo seja responsivo ao redimensionar a janela
window.addEventListener('resize', () => {
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        const width = videoContainer.clientWidth;
        const height = width * 0.5625; // 16:9 ratio
        // O iframe já se ajusta automaticamente via CSS
    }
});