import {chatbotData} from "./index.js";
import openChatbot from "./openChatbot.js";
import addMessageToChat from "./addMessageToChat.js";

export const loadChatbotData = async ()=> {
    try {
        const response = await fetch('components/chatbot/data/chatbot-data.json');
        if (!response.ok) {
            throw new Error('Não foi possível carregar os dados do chatbot');
        }
        Object.assign(chatbotData, await response.json());

        $("#open-chatbot").on("click", openChatbot);
        // Exibir mensagem de boas-vindas quando os dados forem carregados
        if (chatbotData.config && chatbotData.config.mensagem_boas_vindas) {
            setTimeout(() => {
                addMessageToChat('bot', chatbotData.config.mensagem_boas_vindas);
            }, 500);
        }
    } catch (error) {
        console.error('Erro ao carregar dados do chatbot:', error);
        addMessageToChat('bot', 'Desculpe, estou tendo problemas para carregar minhas informações. Por favor, tente novamente mais tarde.');
    }
}