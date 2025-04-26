import { loadChatbotData } from "./loadChatbotData.js";
import appendChatbotToWebPage from "./appendChatbotToWebPage.js";

export const chatbotData = {};

export function loadChatbot() {
    appendChatbotToWebPage();
    loadChatbotData();
}