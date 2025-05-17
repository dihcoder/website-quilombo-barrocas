import MessageModel from './MessageModel.js';

class ChatbotModel {
	
	constructor() {
		this.messages = [];
	}

	async getWelcomeMessage(language) {
		return await this.generateResponse(language === 'pt' ? 'Olá!' : 'Hello!');
	}

	getDefaultErrorMessage() {
		return 'Desculpe, estou tendo problemas para carregar minhas informações. Por favor, tente novamente mais tarde.';
	}

	addMessage(sender, text) {
		const message = new MessageModel(sender, text);
		this.messages.push(message);
		return message;
	}

	getChatHistory() {
		return this.messages.map(message => ({
			role: message.sender,
			parts: [{ text: message.text }],
		}));
	}

	async generateResponse(userMessage) {
		try {
			const response = await fetch("/.netlify/functions/gemini-chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					history: this.getChatHistory(),
					message: userMessage,
				}),
			});

			const data = await response.json();

			const botReply = data.reply || "[Erro: resposta vazia]";

			return botReply;
		} catch (err) {
			console.error(err);
			return "Erro ao se comunicar com o servidor.";
		}
	}
}

export default ChatbotModel;