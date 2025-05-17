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

            // Setup event listeners
            this.setupEventListeners();
            this.isInitialized = true;

            return true;

        } catch (error) {
            console.error('Failed to initialize chatbot:', error);
            this.handleErrorMessage();
            return false;
        }
    }

    async setupEventListeners() {
        // Chatbot visibility controls
        this.view.elements.openButton.on('click', () => this.view.openChatbot());
        this.view.elements.closeButton.on('click', () => this.view.closeChatbot());

        // Form submission
        this.view.elements.chatForm.on('submit', (e) => this.handleMessageSubmission(e));

        // Escape key handler
        $(document).on('keydown', (e) => this.handleEscapeKey(e));


        await this.view.renderChatIntroPanel();

        Object.entries(this.view.elements.suggestedQuestions).forEach(([key, el]) => {
            el.addEventListener('click', () => {
                const question = el.innerText;
                this.sendSuggestedMessage(question);
            });
        });

    }

    async sendSuggestedMessage(messageText) {
        const userMessage = this.model.addMessage('user', messageText);
        this.view.renderMessage(userMessage);

        const botResponseText = await this.model.generateResponse(messageText);
        const botMessage = await this.model.addMessage('model', botResponseText);
        this.view.renderMessage(botMessage);
    }

    async displayWelcomeMessage(language) {
        const welcomeMessage = await this.model.getWelcomeMessage(language);

        if (welcomeMessage) {
            setTimeout(() => {
                const msg = { sender: 'model', text: welcomeMessage };
                this.view.renderMessage(msg);
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

    async handleMessageSubmission(event) {
        event.preventDefault();

        const userMessageText = this.view.getUserMessage();
        if (!userMessageText) return;

        // Add user message to model and render it
        const userMessage = this.model.addMessage('user', userMessageText);
        this.view.renderMessage(userMessage);

        // Clear input field
        this.view.clearInput();

        // Process message and get response
        const botResponseText = await this.model.generateResponse(userMessageText);

        const botMessage = await this.model.addMessage('model', botResponseText);
        this.view.renderMessage(botMessage);

    }

    handleErrorMessage() {
        const errorMessage = this.model.getDefaultErrorMessage();
        const message = this.model.addMessage('model', errorMessage);
        this.view.renderMessage(message);
    }
}

export default ChatbotController;