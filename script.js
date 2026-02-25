// Função para mostrar/esconder páginas
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    
    // Atualizar botões ativos na navegação
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(button => {
        button.classList.remove('active-nav');
        button.removeAttribute('aria-current');
        
        const buttonText = button.textContent.toLowerCase();
        if ((pageId === 'home' && buttonText.includes('inicial')) ||
            (pageId === 'specs' && buttonText.includes('especificações')) ||
            (pageId === 'updates' && buttonText.includes('atualizações'))) {
            button.classList.add('active-nav');
            button.setAttribute('aria-current', 'page');
        }
    });
}

// Função para expandir/colapsar os cards de update
function toggleCard(element) {
    // Encontra o conteúdo dentro do card clicado
    const content = element.querySelector('.card-content');
    
    if (content) {
        // Verifica se o card atual já está aberto
        const isCurrentlyOpen = content.classList.contains('show');
        
        // Se NÃO estiver aberto, vamos fechar todos os outros primeiro
        if (!isCurrentlyOpen) {
            // Fecha todos os outros cards
            document.querySelectorAll('.update-card').forEach(card => {
                card.classList.remove('active');
                const otherContent = card.querySelector('.card-content');
                if (otherContent) {
                    otherContent.classList.remove('show');
                    otherContent.style.display = 'none';
                }
            });
        }
        
        // Alterna a classe 'show' no conteúdo do card clicado
        content.classList.toggle('show');
        
        // Força a exibição correta
        if (content.classList.contains('show')) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
        
        // Alterna a classe 'active' no card para estilização
        element.classList.toggle('active');
    }
}

// Função para mensagem de download
function mostrarMensagem() {
    alert('Download iniciado! Em breve você poderá baixar a demo do jogo.');
    
    // Criar um efeito visual no botão
    const downloadBtn = document.querySelector('.download');
    downloadBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        downloadBtn.style.transform = 'scale(1)';
    }, 200);
}

// Função para lidar com teclado (acessibilidade)
function handleKeyboardEvents(e) {
    if (e.key === 'Escape') {
        // Fecha todos os cards de update se pressionar ESC
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

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona funcionalidade ao logo para voltar à home
    const logo = document.querySelector('.logo-image');
    if (logo) {
        logo.addEventListener('click', () => {
            showPage('home');
        });
        
        // Adicionar dica visual
        logo.setAttribute('title', 'Clique para voltar à página inicial');
    }
    
    // Garante que todos os cards de update comecem fechados
    document.querySelectorAll('.update-card').forEach(card => {
        card.classList.remove('active');
        const content = card.querySelector('.card-content');
        if (content) {
            content.classList.remove('show');
            content.style.display = 'none';
        }
    });
    
    // Adicionar listener para teclado
    document.addEventListener('keydown', handleKeyboardEvents);
    
    // Marcar o botão inicial como ativo
    const homeButton = document.querySelector('nav button[onclick="showPage(\'home\')"]');
    if (homeButton) {
        homeButton.classList.add('active-nav');
        homeButton.setAttribute('aria-current', 'page');
    }
    
    console.log('Site Guardiãs das Águas carregado com sucesso!');
});