export default function addMessageToChat(sender, text) {
    const chatWindow = $('#chat-window');
    const messageDiv = $("<div></div>");

    messageDiv.addClass(['message', sender]);
    messageDiv.attr('role', 'listitem');

    const paragraphs = text.split('\n\n');

    if (paragraphs.length > 1) {
        paragraphs.forEach(paragraph => {
            if (paragraph.trim())
                $(`<p>${paragraph.trim()}</p>`)
                    .appendTo(messageDiv);

        });
    } else
        $(`<span>${text}</span>`).appendTo(messageDiv);


    chatWindow.append(messageDiv);

    let $chatWindow = $('#chat-window');
    let SCROLL_HEIGHT = $chatWindow[0].scrollHeight;
    let MSG_HEIGHT = $chatWindow.find('div.message').last().height()
    let CHAT_HEADER_HEIGHT = 100;
    const SCROLL_POSITION = SCROLL_HEIGHT - MSG_HEIGHT - CHAT_HEADER_HEIGHT;
    $chatWindow.animate({ scrollTop: SCROLL_POSITION}, 300);

    // Anunciar para leitores de tela
    if (sender === 'bot') {
        // Uso do aria-live já configurado no container
    }
}