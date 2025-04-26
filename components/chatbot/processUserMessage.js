import { chatbotData } from "./index.js"; 

/**
 * Processes a user message and determines the appropriate response
 * @param {string} message - The user's message
 * @returns {string} The chatbot's response
 */
export default function processUserMessage(message) {
  if (jQuery.isEmptyObject(chatbotData)) {
    return "Desculpe, estou tendo problemas para carregar minhas informações. Por favor, tente novamente mais tarde.";
  }

  const words = normalizeAndTokenizeMessage(message);
  const triggersWithScores = calculateTriggerScores(words);
  const relevantTriggers = filterRelevantTriggers(triggersWithScores);
  
  return generateResponse(relevantTriggers);
}

/**
 * Normalizes and tokenizes a message into words
 * @param {string} message - The message to process
 * @returns {string[]} Array of normalized words
 */
function normalizeAndTokenizeMessage(message) {
  // Normalize the message (remove accents, convert to lowercase)
  const normalizedMessage = message.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Split into words and remove punctuation
  return normalizedMessage.split(/\s+/)
    .map(word => word.replace(/[.,!?;:()]/g, ''))
    .filter(word => word.length > 0);
}

/**
 * Calculates matching scores for each trigger based on word matches
 * @param {string[]} words - The processed words from the message
 * @returns {Array<{id: string, score: number, resposta: string}>} Triggers with their scores
 */
function calculateTriggerScores(words) {
  const scores = chatbotData.gatilhos.map(gatilho => {
    const matchingWords = countMatchingWords(words, gatilho.palavras);
    
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

/**
 * Counts how many words match the trigger keywords
 * @param {string[]} words - The processed words from the message
 * @param {string[]} keywords - The trigger keywords
 * @returns {number} The number of matching words
 */
function countMatchingWords(words, keywords) {
  return words.filter(word =>
    keywords.some(keyword => {
      const normalizedKeyword = keyword.toLowerCase();
      return normalizedKeyword === word || 
             word.includes(normalizedKeyword) || 
             normalizedKeyword.includes(word);
    })
  ).length;
}

/**
 * Filters triggers that meet the confidence threshold
 * @param {Array<{id: string, score: number, resposta: string}>} triggersWithScores - Scored triggers
 * @returns {Array<{id: string, score: number, resposta: string}>} Relevant triggers
 */
function filterRelevantTriggers(triggersWithScores) {
  const confidenceThreshold = chatbotData.config.limiar_confianca;
  return triggersWithScores.filter(trigger => trigger.score >= confidenceThreshold);
}

/**
 * Generates a response based on relevant triggers
 * @param {Array<{id: string, score: number, resposta: string}>} relevantTriggers - Triggers meeting the threshold
 * @returns {string} The response to the user
 */
function generateResponse(relevantTriggers) {
  // If there are no relevant triggers, use the default response
  if (relevantTriggers.length === 0) {
    const naoSeiGatilho = chatbotData.gatilhos.find(g => g.id === "nao_sei");
    return naoSeiGatilho ? naoSeiGatilho.resposta : chatbotData.config.mensagem_nao_entendi;
  }

  // If multiple responses are enabled and we have more than one match
  if (chatbotData.config.respostas_multiplas && relevantTriggers.length > 1) {
    const maxResponses = chatbotData.config.max_respostas;
    const topResponses = relevantTriggers.slice(0, maxResponses);
    return topResponses.map(trigger => trigger.resposta).join("\n\n");
  }

  // Otherwise, return only the most relevant response
  return relevantTriggers[0].resposta;
}