import { loadCookiesModal } from "../components/modal_cookies/script.js";
import switchLanguage from "./switchLanguage.js";
import detectLanguage from "./detectLanguage.js";

export const translationsObj = {};

const userPreferredLanguage = localStorage.getItem('preferredLanguage') || detectLanguage();
switchLanguage(userPreferredLanguage);
loadCookiesModal();