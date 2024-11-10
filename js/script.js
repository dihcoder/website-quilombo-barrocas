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
    if ($('html').attr('lang') === language)
        return false;

    $('html').attr('lang', language)

    const content = await loadLanguageFile(language);

    localStorage.setItem('preferredLanguage', language);

    for (const [key, value] of Object.entries(content)) {
        const htmlTag = document.getElementById(key);
        if (htmlTag) htmlTag.textContent = value;
    }
}

function removeLanguagePreference() {
    const modalBeforeChanges = $('#staticBackdrop .modal-content').html();

    localStorage.removeItem('preferredLanguage');

    $('.modal-footer').html("");

    $('.modal-body').html(`<img src="./images/icons/check.gif" class="img-fluid mx-auto d-block" width="100px" alt="">
            <p class="text-center">Removido!</p>`)

    setTimeout(() => $('#staticBackdrop').modal('hide'), 1800)

    setTimeout(() => $('#staticBackdrop .modal-content').html(modalBeforeChanges), 2000)
}

const userPreferredLanguage = localStorage.getItem('preferredLanguage') || detectLanguage();
switchLanguage(userPreferredLanguage);