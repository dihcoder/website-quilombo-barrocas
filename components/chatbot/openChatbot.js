export default function openChatbot() {
    $('.chatbot-container').addClass('expanded');
    $('.chatbot-container').attr('aria-expanded', 'true');
    $('#open-chatbot').attr('aria-expanded', 'true');

    setTimeout(() => {
        $('#chat-input').focus();
    }, 500);
}