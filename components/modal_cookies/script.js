import switchLanguage from "../../js/switchLanguage.js";
import { translationsObj } from "../../js/index.js";

function removeLanguagePreference() {
    const modalBeforeChanges = $('#staticBackdrop .modal-content').html();

    localStorage.removeItem('preferredLanguage');

    $('.modal-footer').html("");

    $('.modal-body').html(`<img src="./images/icons/check.gif" class="img-fluid mx-auto d-block" width="100px" alt="">
            <p class="text-center">${translationsObj.removed}</p>`)

    setTimeout(() => $('#staticBackdrop').modal('hide'), 1800)

    setTimeout(() => {
        $('#staticBackdrop .modal-content').html(modalBeforeChanges)
        location.reload()
    }, 2000)
}

export const loadCookiesModal = async () => {
    const response = await fetch('components/modal_cookies/template.html');
    const html = await response.text();
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'components/modal_cookies/style.css';
    document.head.appendChild(link);
    document.getElementById('btnClearPreferences').onclick = removeLanguagePreference;
    document.getElementById('ptOptionBtn').onclick = switchLanguage.bind(null, 'pt');
    document.getElementById('enOptionBtn').onclick = switchLanguage.bind(null, 'en');
}