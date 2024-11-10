let fetchedData = null;

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
    $('html').attr('lang', language)

    fetchedData = await loadLanguageFile(language);

    localStorage.setItem('preferredLanguage', language);

    for (const [key, value] of Object.entries(fetchedData)) {
        const htmlTag = document.getElementById(key);
        if (htmlTag) htmlTag.textContent = value;
    }
}

function removeLanguagePreference() {
    const modalBeforeChanges = $('#staticBackdrop .modal-content').html();

    localStorage.removeItem('preferredLanguage');

    $('.modal-footer').html("");

    $('.modal-body').html(`<img src="./images/icons/check.gif" class="img-fluid mx-auto d-block" width="100px" alt="">
            <p class="text-center">${fetchedData.removed}</p>`)

    setTimeout(() => $('#staticBackdrop').modal('hide'), 1800)

    setTimeout(() => {
        $('#staticBackdrop .modal-content').html(modalBeforeChanges)
        location.reload()
    }, 2000)
}

const userPreferredLanguage = localStorage.getItem('preferredLanguage') || detectLanguage();
switchLanguage(userPreferredLanguage);