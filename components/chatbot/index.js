/**
 * /components/chatbot/index.js
 * Main entry point for the chatbot component
 */
import ChatbotFactory from './factories/ChatbotFactory.js';

// Export main function to load chatbot
export async function loadChatbot() {
    const chatbot = ChatbotFactory.createChatbot();
    return chatbot.initialize();
}