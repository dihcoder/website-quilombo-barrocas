/**
 * /components/chatbot/controllers/ChatbotController.js
 * Coordinates between model and view components
 */
class ChatbotController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.isInitialized = false;
    }

    async initialize() {
        try {
            // Initialize view first to have DOM elements ready
            await this.view.initialize();

            // Load model data
            await this.model.loadData();

            // Setup event listeners
            this.setupEventListeners();

            // Display welcome message
            this.displayWelcomeMessage();

            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize chatbot:', error);
            this.handleErrorMessage();
            return false;
        }
    }

    setupEventListeners() {
        // Chatbot visibility controls
        this.view.elements.openButton.on('click', () => this.view.openChatbot());
        this.view.elements.closeButton.on('click', () => this.view.closeChatbot());

        // Form submission
        this.view.elements.chatForm.on('submit', (e) => this.handleMessageSubmission(e));

        // Escape key handler
        $(document).on('keydown', (e) => this.handleEscapeKey(e));
    }

    displayWelcomeMessage() {
        const welcomeMessage = this.model.getWelcomeMessage();

        if (welcomeMessage) {
            setTimeout(() => {
                const message = this.model.addMessage('bot', welcomeMessage);
                this.view.renderMessage(message);
            }, 500);
        }
    }

    handleEscapeKey(e) {
        const chatbotIsOpen = this.view.elements.container.hasClass('expanded');

        if (e.key === 'Escape' && chatbotIsOpen) {
            this.view.closeChatbot();
            this.view.focusOpenButton();
        }
    }

    handleMessageSubmission(event) {
        event.preventDefault();

        const userMessageText = this.view.getUserMessage();
        if (!userMessageText) return;

        // Add user message to model and render it
        const userMessage = this.model.addMessage('user', userMessageText);
        this.view.renderMessage(userMessage);

        // Clear input field
        this.view.clearInput();

        // Process message and get response
        const botResponseText = this.model.generateResponse(userMessageText);

        // Simulate typing delay before showing response
        const TYPING_DELAY_MS = 1000;
        setTimeout(() => {
            const botMessage = this.model.addMessage('bot', botResponseText);
            this.view.renderMessage(botMessage);
        }, TYPING_DELAY_MS);
    }

    handleErrorMessage() {
        const errorMessage = this.model.getDefaultErrorMessage();
        const message = this.model.addMessage('bot', errorMessage);
        this.view.renderMessage(message);
    }
}

export default ChatbotController;