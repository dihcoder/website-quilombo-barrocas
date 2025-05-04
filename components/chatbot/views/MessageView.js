/**
 * /components/chatbot/views/MessageView.js
 * Handles rendering of individual messages
 */
class MessageView {
    render(message, container) {
        const messageDiv = $('<div></div>');

        // Add appropriate classes and ARIA role
        messageDiv
            .addClass(['message', message.sender])
            .attr('role', 'listitem');

        // Handle text formatting (paragraphs)
        this.appendTextContent(messageDiv, message.text);

        // Add message to chat window
        container.append(messageDiv);

        // Scroll to new message with animation
        this.scrollToLatestMessage(container);

        return messageDiv;
    }

    appendTextContent(messageDiv, text) {
        const paragraphs = text.split('\n\n');

        if (paragraphs.length > 1) {
            paragraphs.forEach(paragraph => {
                const trimmedParagraph = paragraph.trim();
                if (trimmedParagraph) {
                    $(`<p>${trimmedParagraph}</p>`).appendTo(messageDiv);
                }
            });
        } else {
            $(`<p>${text}</p>`).appendTo(messageDiv);
        }
    }

    scrollToLatestMessage(container) {
        const chatWindowElement = container[0];
        const scrollHeight = chatWindowElement.scrollHeight;
        const lastMessageHeight = container.find('div.message').last().height();
        const headerHeight = 100;

        const scrollPosition = scrollHeight - lastMessageHeight - headerHeight;

        container.animate({ scrollTop: scrollPosition }, 300);
    }
}

export default MessageView;