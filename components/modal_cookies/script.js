import switchLanguage from "../../js/switchLanguage.js";
import { translationsObj } from "../../js/index.js";

/**
 * Constants for DOM selectors and configuration
 */
const SELECTORS = {
    modalContainer: '#staticBackdrop',
    modalContent: '#staticBackdrop .modal-content',
    modalFooter: '.modal-footer',
    modalBody: '.modal-body',
    clearPreferencesBtn: '#btnClearPreferences',
    ptLanguageBtn: '#ptOptionBtn',
    enLanguageBtn: '#enOptionBtn'
};

const CONFIG = {
    languagePreferenceKey: 'preferredLanguage',
    successIconPath: './images/icons/check.gif',
    successIconWidth: '100px',
    componentPath: 'components/modal_cookies',
    modalHideDelay: 1800,
    pageReloadDelay: 2000
};

/**
 * Removes language preference and shows success message
 */
function removeLanguagePreference() {
    // Store modal content before changes
    const modalInitialContent = $(SELECTORS.modalContent).html();

    // Remove language preference from localStorage
    localStorage.removeItem(CONFIG.languagePreferenceKey);

    // Clear footer content
    $(SELECTORS.modalFooter).html('');

    // Show success message with animation
    $(SELECTORS.modalBody).html(`
    <img src="${CONFIG.successIconPath}" 
         class="img-fluid mx-auto d-block" 
         width="${CONFIG.successIconWidth}" 
         alt="Success">
    <p class="text-center">${translationsObj.removed}</p>
  `);

    // Hide modal after delay
    setTimeout(() => {
        $(SELECTORS.modalContainer).modal('hide');
    }, CONFIG.modalHideDelay);

    // Restore modal content and reload page after delay
    setTimeout(() => {
        $(SELECTORS.modalContent).html(modalInitialContent);
        location.reload();
    }, CONFIG.pageReloadDelay);
}

/**
 * Loads the cookies modal component
 * @returns {Promise<void>}
 */
export const loadCookiesModal = async () => {
    try {
        // Load HTML template
        const templatePath = `${CONFIG.componentPath}/template.html`;
        const response = await fetch(templatePath);

        if (!response.ok) {
            throw new Error(`Failed to load template: ${response.status}`);
        }

        const html = await response.text();

        // Create container and append to body
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = html;
        document.body.appendChild(modalContainer);

        // Load CSS
        const stylePath = `${CONFIG.componentPath}/style.css`;
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = stylePath;
        document.head.appendChild(styleLink);

        // Set up event handlers
        attachEventListeners();
    } catch (error) {
        console.error('Error loading cookies modal:', error);
    }
};

/**
 * Attaches event listeners to modal buttons
 */
function attachEventListeners() {
    document.querySelector(SELECTORS.clearPreferencesBtn)
        .addEventListener('click', removeLanguagePreference);

    document.querySelector(SELECTORS.ptLanguageBtn)
        .addEventListener('click', () => switchLanguage('pt'));

    document.querySelector(SELECTORS.enLanguageBtn)
        .addEventListener('click', () => switchLanguage('en'));
}