import loadLanguageFile from "./loadLanguageFile.js";
import { translationsObj } from "./index.js";

/**
 * Switches the application language and updates all translated elements
 * @param {string} language - The language code to switch to (e.g., 'en', 'pt-br')
 * @returns {Promise<void>}
 */
export default async function switchLanguage(language) {
  try {
    await updateLanguageSettings(language);
    updateDomElements();
  } catch (error) {
    console.error(`Failed to switch language to ${language}:`, error);
  }
}

/**
 * Updates language settings and loads translation data
 * @param {string} language - The language code
 * @returns {Promise<void>}
 */
async function updateLanguageSettings(language) {
  // Update HTML lang attribute
  setHtmlLangAttribute(language);
  
  // Load and store translations
  const translations = await loadLanguageFile(language);
  Object.assign(translationsObj, translations);
  
  // Save user preference
  saveLanguagePreference(language);
}

/**
 * Sets the HTML lang attribute
 * @param {string} language - The language code
 */
function setHtmlLangAttribute(language) {
  $('html').attr('lang', language);
}

/**
 * Saves the user's language preference to localStorage
 * @param {string} language - The language code
 */
function saveLanguagePreference(language) {
  localStorage.setItem('preferredLanguage', language);
}

/**
 * Updates all DOM elements with their translated text
 */
function updateDomElements() {
  for (const [elementId, translatedText] of Object.entries(translationsObj)) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = translatedText;
    }
  }
}