import { chatbotData } from "./index.js"; 

// Process user message and determine appropriate response
export default function processUserMessage(message) {

    if (jQuery.isEmptyObject(chatbotData)) {
        return "Desculpe, estou tendo problemas para carregar minhas informações. Por favor, tente novamente mais tarde.";
    }

    // Normalize the message (remove accents, convert to lowercase)
    const normalizedMessage = message.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // Split the message into individual words and remove punctuation
    const words = normalizedMessage.split(/\s+/)
        .map(word => word.replace(/[.,!?;:()]/g, ''))
        .filter(word => word.length > 0);

    // Calculate score for each trigger
    const scores = chatbotData.gatilhos.map(gatilho => {
        const matchingWords = words.filter(word =>
            gatilho.palavras.some(keyword =>
                keyword.toLowerCase() === word ||
                word.includes(keyword.toLowerCase()) ||
                keyword.toLowerCase().includes(word)
            )
        );

        // Calculate score: number of matching words / total words in message
        const score = matchingWords.length > 0 ? matchingWords.length / words.length : 0;

        return {
            id: gatilho.id,
            score: score,
            resposta: gatilho.resposta
        };
    });

    // Sort triggers by score (highest to lowest)
    const sortedScores = scores.sort((a, b) => b.score - a.score);

    // Select triggers above the confidence threshold
    const relevantTriggers = sortedScores.filter(
        score => score.score >= chatbotData.config.limiar_confianca
    );

    // If there are no relevant triggers, use the default response "don't_know"
    if (relevantTriggers.length === 0) {
        const naoSeiGatilho = chatbotData.gatilhos.find(g => g.id === "nao_sei");
        return naoSeiGatilho ? naoSeiGatilho.resposta : chatbotData.config.mensagem_nao_entendi;
    }

    // If multiple responses are enabled, match up to the configured maximum
    if (chatbotData.config.respostas_multiplas && relevantTriggers.length > 1) {
        const topResponses = relevantTriggers.slice(0, chatbotData.config.max_respostas);
        return topResponses.map(trigger => trigger.resposta).join("\n\n");
    }

    // Otherwise, return only the most relevant response
    return relevantTriggers[0].resposta;
}