import MessageModel from './MessageModel.js';
import TextProcessor from '../utils/TextProcessor.js';

/**
 * /components/chatbot/models/ChatbotModel.js
 * Handles all data and business logic for the chatbot
 */
class ChatbotModel {
	constructor() {
		this.data = {};
		this.messages = [];
	}

	async loadData() {
		try {
			const response = await fetch('components/chatbot/data/chatbot-data.json');

			if (!response.ok) {
				throw new Error('Não foi possível carregar os dados do chatbot');
			}

			this.data = await response.json();
			return this.data;
		} catch (error) {
			console.error('Erro ao carregar dados do chatbot:', error);
			throw error;
		}
	}

	getWelcomeMessage() {
		return this.data.config?.mensagem_boas_vindas || '';
	}

	getDefaultErrorMessage() {
		return 'Desculpe, estou tendo problemas para carregar minhas informações. Por favor, tente novamente mais tarde.';
	}

	getNaoEntendi() {
		return this.data.config?.mensagem_nao_entendi || 'Desculpe, não entendi sua pergunta.';
	}

	addMessage(sender, text) {
		const message = new MessageModel(sender, text);
		this.messages.push(message);
		return message;
	}

	generateResponse(userMessage) {
		if (jQuery.isEmptyObject(this.data)) {
			return this.getDefaultErrorMessage();
		}

		const textProcessor = new TextProcessor();
		const words = textProcessor.normalizeAndTokenizeMessage(userMessage);
		const triggersWithScores = this.calculateTriggerScores(words);
		const relevantTriggers = this.filterRelevantTriggers(triggersWithScores);

		// If there are no relevant triggers, use the default response
		if (relevantTriggers.length === 0) {
			const naoSeiGatilho = this.data.gatilhos.find(g => g.id === "nao_sei");
			return naoSeiGatilho ? naoSeiGatilho.resposta : this.getNaoEntendi();
		}

		// If multiple responses are enabled and we have more than one match
		if (this.data.config.respostas_multiplas && relevantTriggers.length > 1) {
			const maxResponses = this.data.config.max_respostas;
			const topResponses = relevantTriggers.slice(0, maxResponses);
			return topResponses.map(trigger => trigger.resposta).join("\n\n");
		}

		// Otherwise, return only the most relevant response
		return relevantTriggers[0].resposta;
	}

	calculateTriggerScores(words) {
		const textProcessor = new TextProcessor();
		const scores = this.data.gatilhos.map(gatilho => {
			const matchingWords = textProcessor.countMatchingWords(words, gatilho.palavras);

			// Calculate score: number of matching words / total words in message
			const score = matchingWords > 0 ? matchingWords / words.length : 0;

			return {
				id: gatilho.id,
				score: score,
				resposta: gatilho.resposta
			};
		});

		// Sort triggers by score (highest to lowest)
		return scores.sort((a, b) => b.score - a.score);
	}

	filterRelevantTriggers(triggersWithScores) {
		const confidenceThreshold = this.data.config.limiar_confianca;
		return triggersWithScores.filter(trigger => trigger.score >= confidenceThreshold);
	}
}

export default ChatbotModel;