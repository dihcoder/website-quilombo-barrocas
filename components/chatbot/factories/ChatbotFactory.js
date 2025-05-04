// ChatbotFactory.js
import  ChatbotModel from '../models/ChatbotModel.js';
import ChatbotView from '../views/ChatbotView.js';
import ChatbotController from '../controllers/ChatbotController.js';

/**
 * /components/chatbot/factories/ChatbotFactory.js
 * Factory for creating chatbot instances
 */
class ChatbotFactory {
    static createChatbot() {
        const model = new ChatbotModel();
        const view = new ChatbotView();
        return new ChatbotController(model, view);
    }
}

export default ChatbotFactory;