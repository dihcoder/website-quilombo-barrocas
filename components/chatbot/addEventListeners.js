import openChatbot from "./openChatbot.js";
import closeChat from "./closeChat.js";
import addMessageToChat from "./addMessageToChat.js";
import processUserMessage from "./processUserMessage.js";

export default function addEventListeners() {
    // Open the chatbot when the button is clicked
    $("#open-chatbot").on("click", openChatbot);

    // Close the chatbot when the button is clicked
    $("#toggle-chatbot-btn").on("click", closeChat);

    // Close the chatbot with the 'ESC' key
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $('.chatbot-container').hasClass('expanded')) {
            closeChat();
            $('#open-chatbot').focus(); // Devolver foco ao botão de abrir
        }
    });

    // Process user input
    $("#chat-form").on("submit", function (event) {
        event.preventDefault();

        const input = $('#chat-input')[0];
        const message = input.value.trim();

        if (message) {
            addMessageToChat('user', message);
            input.value = '';

            // Processar a mensagem e obter resposta
            const botResponse = processUserMessage(message);

            // Simular um pequeno atraso antes da resposta (efeito de digitação)
            setTimeout(() => {
                addMessageToChat('bot', botResponse);
            }, 1000);
        }
    });
}