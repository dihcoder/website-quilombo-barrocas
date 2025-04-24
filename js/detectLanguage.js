export default function detectLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('pt') ? 'pt' : 'en';
}