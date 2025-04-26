export default function addMessageToChat(sender, text) {
    const chatWindow = $('#chat-window');
    const messageDiv = $('<div></div>');
    
    // Add appropriate classes and ARIA role
    messageDiv
      .addClass(['message', sender])
      .attr('role', 'listitem');
    
    // Handle text formatting (paragraphs)
    appendTextContent(messageDiv, text);
    
    // Add message to chat window
    chatWindow.append(messageDiv);
    
    // Scroll to new message with animation
    scrollToLatestMessage(chatWindow);
    
    // Screen reader announcements are already handled via aria-live in the container
  }
  
  /**
   * Appends text content to a message, handling paragraph formatting
   * @param {jQuery} messageDiv - The message container
   * @param {string} text - The message text
   */
  function appendTextContent(messageDiv, text) {
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
  
  /**
   * Scrolls the chat window to show the latest message
   * @param {jQuery} chatWindow - The chat window element
   */
  function scrollToLatestMessage(chatWindow) {
    const chatWindowElement = chatWindow[0];
    const scrollHeight = chatWindowElement.scrollHeight;
    const lastMessageHeight = chatWindow.find('div.message').last().height();
    const headerHeight = 100;
    
    const scrollPosition = scrollHeight - lastMessageHeight - headerHeight;
    
    chatWindow.animate({ scrollTop: scrollPosition }, 300);
  }