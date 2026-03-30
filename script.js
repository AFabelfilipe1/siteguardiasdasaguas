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
    
    console.log('🌊 Guardiãs das Águas - Site carregado com sucesso!');
});