export default function closeChat() {
    $('.chatbot-container').removeClass('expanded');
    $('.chatbot-container').attr('aria-expanded', 'false');
    $('#open-chatbot').attr('aria-expanded', 'false');
}