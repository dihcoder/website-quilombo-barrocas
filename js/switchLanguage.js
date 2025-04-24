import loadLanguageFile from "./loadLanguageFile.js";
import { translationsObj } from "./index.js";

export default async function switchLanguage(language) {
    $('html').attr('lang', language)

    const response = await loadLanguageFile(language);
    Object.assign(translationsObj, response);

    localStorage.setItem('preferredLanguage', language);

    for (const [key, value] of Object.entries(translationsObj)) {
        const htmlTag = document.getElementById(key);
        if (htmlTag) htmlTag.textContent = value;
    }
}