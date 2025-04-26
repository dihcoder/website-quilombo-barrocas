import { chatbotData } from "./index.js";
import openChatbot from "./openChatbot.js";
import addMessageToChat from "./addMessageToChat.js";

/**
 * Loads chatbot configuration data from JSON file and initializes welcome message
 * @returns {Promise<void>}
 */
export const loadChatbotData = async () => {
  try {
    const data = await fetchChatbotData();
    initializeChatbot(data);
  } catch (error) {
    handleLoadError(error);
  }
};

/**
 * Fetches chatbot data from the JSON file
 * @returns {Promise<Object>} The chatbot configuration data
 */
async function fetchChatbotData() {
  const response = await fetch('components/chatbot/data/chatbot-data.json');
  
  if (!response.ok) {
    throw new Error('Não foi possível carregar os dados do chatbot');
  }
  
  return await response.json();
}

/**
 * Initializes the chatbot with the loaded data
 * @param {Object} data - The chatbot configuration data
 */
function initializeChatbot(data) {
  // Update global chatbot data
  Object.assign(chatbotData, data);
  
  // Set up click event for opening the chatbot
  $("#open-chatbot").on("click", openChatbot);
  
  // Display welcome message if configured
  displayWelcomeMessage();
}

/**
 * Displays the welcome message with a small delay
 */
function displayWelcomeMessage() {
  const WELCOME_DELAY_MS = 500;
  const welcomeMessage = chatbotData.config?.mensagem_boas_vindas;
  
  if (welcomeMessage) {
    setTimeout(() => {
      addMessageToChat('bot', welcomeMessage);
    }, WELCOME_DELAY_MS);
  }
}

/**
 * Handles errors that occur during data loading
 * @param {Error} error - The error that occurred
 */
function handleLoadError(error) {
  console.error('Erro ao carregar dados do chatbot:', error);
  
  const errorMessage = 'Desculpe, estou tendo problemas para carregar minhas informações. Por favor, tente novamente mais tarde.';
  addMessageToChat('bot', errorMessage);
}