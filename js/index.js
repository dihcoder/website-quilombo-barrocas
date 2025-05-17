import { loadCookiesModal } from "../components/modal_cookies/script.js";
import switchLanguage from "./switchLanguage.js";
import getUserPreferredLanguage from "./getUserPreferredLanguage.js";
import { loadChatbot } from "../components/chatbot/index.js";

export const translationsObj = {};

const userPreferredLanguage = getUserPreferredLanguage();
switchLanguage(userPreferredLanguage);
loadCookiesModal();
loadChatbot();