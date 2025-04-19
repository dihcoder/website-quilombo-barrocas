let fetchedData = null;
// const shrinkChatbotBtn = document.getElementById('shrink-chatbot-btn');
// const botIcon = document.querySelector('.bot-icon');

// shrinkChatbotBtn.addEventListener('click', () => {
//     $('.chatbot-container').removeClass('expanded');
//     $('.chatbot-container').attr('aria-expanded', 'false');
// });

// botIcon.addEventListener('click', () => {
//     $('.chatbot-container').addClass('expanded');
//     $('.chatbot-container').attr('aria-expanded', 'true');
// });

function detectLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('pt') ? 'pt' : 'en';
}

function loadLanguageFile(language) {
    return fetch(`../langs/${language}.json`)
        .then(response => response.json())
        .catch(error => console.error('Error loading language file:', error));
}

async function switchLanguage(language) {
    $('html').attr('lang', language)

    fetchedData = await loadLanguageFile(language);

    localStorage.setItem('preferredLanguage', language);

    for (const [key, value] of Object.entries(fetchedData)) {
        const htmlTag = document.getElementById(key);
        if (htmlTag) htmlTag.textContent = value;
    }
}

function removeLanguagePreference() {
    const modalBeforeChanges = $('#staticBackdrop .modal-content').html();

    localStorage.removeItem('preferredLanguage');

    $('.modal-footer').html("");

    $('.modal-body').html(`<img src="./images/icons/check.gif" class="img-fluid mx-auto d-block" width="100px" alt="">
            <p class="text-center">${fetchedData.removed}</p>`)

    setTimeout(() => $('#staticBackdrop').modal('hide'), 1800)

    setTimeout(() => {
        $('#staticBackdrop .modal-content').html(modalBeforeChanges)
        location.reload()
    }, 2000)
}

function toggleChatbotContainer() {
}

const userPreferredLanguage = localStorage.getItem('preferredLanguage') || detectLanguage();
switchLanguage(userPreferredLanguage);

document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    const openChatbotBtn = document.getElementById('open-chatbot');
    const toggleChatbotBtn = document.getElementById('toggle-chatbot-btn');
    
    // Função para abrir o chatbot
    function openChatbot() {
      chatbotContainer.classList.add('expanded');
      chatbotContainer.setAttribute('aria-expanded', 'true');
      openChatbotBtn.setAttribute('aria-expanded', 'true');
      
      // Foca no input depois que a animação terminar
      setTimeout(() => {
        document.getElementById('chat-input').focus();
      }, 500); // Tempo um pouco maior que a animação
    }
    
    // Função para fechar o chatbot
    function closeChat() {
      chatbotContainer.classList.remove('expanded');
      chatbotContainer.setAttribute('aria-expanded', 'false');
      openChatbotBtn.setAttribute('aria-expanded', 'false');
    }
    
    // Event listeners
    openChatbotBtn.addEventListener('click', openChatbot);
    toggleChatbotBtn.addEventListener('click', closeChat);
    
    // Permitir fechar com Esc
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && chatbotContainer.classList.contains('expanded')) {
        closeChat();
        openChatbotBtn.focus(); // Devolver foco ao botão de abrir
      }
    });
    
    // Tratamento do formulário
    document.getElementById('chat-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const message = input.value.trim();
      
      if (message) {
        // Aqui você adicionaria a lógica para enviar a mensagem
        addMessage('user', message);
        input.value = '';
        
        // Simulando resposta do bot (substitua por sua lógica real)
        setTimeout(() => {
          addMessage('bot', 'Esta é uma resposta simulada do chatbot.');
        }, 1000);
      }
    });
    
    // Função para adicionar mensagens ao chat
    function addMessage(sender, text) {
      const chatWindow = document.getElementById('chat-window');
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', sender);
      messageDiv.setAttribute('role', 'listitem');
      
      const textSpan = document.createElement('span');
      textSpan.textContent = text;
      
      messageDiv.appendChild(textSpan);
      chatWindow.appendChild(messageDiv);
      
      // Role para o fundo
      chatWindow.scrollTop = chatWindow.scrollHeight;
      
      // Anunciar para leitores de tela
      if (sender === 'bot') {
        // Uso do aria-live já configurado no container
      }
    }
    
    // Estilo adicional para mensagens (adicionado dinamicamente)
    const style = document.createElement('style');
    style.textContent = `
      .message {
        margin-bottom: 10px;
        padding: 8px 12px;
        border-radius: 12px;
        max-width: 80%;
        word-wrap: break-word;
        font-size: 1rem;
      }
      
      .user {
        background-color: var(--chatbot-green);
        color: var(--chatbot-white);
        align-self: flex-end;
        margin-left: auto;
        border-bottom-right-radius: 4px;
      }
      
      .bot {
        background-color: var(--chatbot-gray);
        color: #333;
        align-self: flex-start;
        margin-right: auto;
        border-bottom-left-radius: 4px;
      }
      
      .chat-window {
        display: flex;
        flex-direction: column;
      }
    `;
    document.head.appendChild(style);
  });