import MessageView from '../views/MessageView.js'

/**
 * /components/chatbot/views/ChatbotView.js
 * Manages the chatbot UI and user interactions
 */
class ChatbotView {
    constructor() {
        this.elements = {};
        this.messageView = new MessageView();
    }

    async initialize() {
        // Add stylesheet to head
        $(`<link rel="stylesheet" href="components/chatbot/style.css">`)
            .appendTo("head");

        // Load HTML template
        return new Promise((resolve) => {
            $.get("components/chatbot/template.html", (chatbotTemplate) => {
                $("body").append(chatbotTemplate);
                this.cacheElements();
                resolve();
            });
        });
    }

    cacheElements() {
        this.elements = {
            container: $('.chatbot-container'),
            openButton: $('#open-chatbot'),
            closeButton: $('#toggle-chatbot-btn'),
            chatWindow: $('#chat-window'),
            chatForm: $('#chat-form'),
            chatInput: $('#chat-input')
        };
    }

    renderMessage(message) {
        return this.messageView.render(message, this.elements.chatWindow);
    }

    scrollToLatestMessage() {
        const chatWindowElement = this.elements.chatWindow[0];
        const scrollHeight = chatWindowElement.scrollHeight;
        const lastMessageHeight = this.elements.chatWindow.find('div.message').last().height();
        const headerHeight = 100;

        const scrollPosition = scrollHeight - lastMessageHeight - headerHeight;

        this.elements.chatWindow.animate({ scrollTop: scrollPosition }, 300);
    }

    openChatbot() {
        this.elements.container.addClass('expanded');
        this.elements.container.attr('aria-expanded', 'true');
        this.elements.openButton.attr('aria-expanded', 'true');

        setTimeout(() => {
            this.elements.chatInput.focus();
        }, 500);
    }

    closeChatbot() {
        this.elements.container.removeClass('expanded');
        this.elements.container.attr('aria-expanded', 'false');
        this.elements.openButton.attr('aria-expanded', 'false');
    }

    getUserMessage() {
        return this.elements.chatInput.val().trim();
    }

    clearInput() {
        this.elements.chatInput.val('');
    }

    focusOpenButton() {
        this.elements.openButton.focus();
    }
}

export default ChatbotView;