const $dropupBtn = document.getElementById('btnLanguageSwitcher');
const $langChoiceBtns = document.querySelectorAll('.dropdown-item.language-choice');

function detectLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('pt') ? 'pt' : 'en';
}

function loadLanguageFile(language) {
    return fetch(`../langs/${language}.json`)
        .then(response => response.json())
        .catch(error => console.error('Error loading language file:', error));
}

async function switchLanguage(language) {
    const content = await loadLanguageFile(language);
    for (const [key, value] of Object.entries(content)) {
        const htmlTag = document.getElementById(key);
        if (htmlTag) htmlTag.textContent = value;
    }
}

$langChoiceBtns.forEach(btn => btn.addEventListener('click', function (e) {
    e.preventDefault

    $dropupBtn.textContent = btn.textContent;
    const language = btn.dataset.lang;
    switchLanguage(language);
    localStorage.setItem('preferredLanguage', language);
}))

const userPreferredLanguage = localStorage.getItem('preferredLanguage') || detectLanguage();
switchLanguage(userPreferredLanguage);