function detectClientLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('pt') ? 'pt' : 'en';
}

export default function getUserPreferredLanguage() {
    return localStorage.getItem('preferredLanguage') || detectClientLanguage();
}