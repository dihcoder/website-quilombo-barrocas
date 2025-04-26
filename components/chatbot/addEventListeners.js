import openChatbot from "./openChatbot.js";
import closeChat from "./closeChat.js";
import addMessageToChat from "./addMessageToChat.js";
import processUserMessage from "./processUserMessage.js";

/**
 * Sets up all event listeners for the chatbot interface
 */
export default function addEventListeners() {
  setupVisibilityControls();
  setupMessageHandling();
}

/**
 * Sets up event listeners for opening and closing the chatbot
 */
function setupVisibilityControls() {
  // Open the chatbot when the button is clicked
  $("#open-chatbot").on("click", openChatbot);
  
  // Close the chatbot when the close button is clicked
  $("#toggle-chatbot-btn").on("click", closeChat);
  
  // Close the chatbot when the ESC key is pressed
  $(document).on('keydown', handleEscapeKey);
}

/**
 * Handles the Escape key press to close the chatbot
 * @param {KeyboardEvent} e - The keyboard event
 */
function handleEscapeKey(e) {
  const chatbotIsOpen = $('.chatbot-container').hasClass('expanded');
  
  if (e.key === 'Escape' && chatbotIsOpen) {
    closeChat();
    $('#open-chatbot').focus(); // Return focus to the open button
  }
}

/**
 * Sets up event listeners for handling user messages
 */
function setupMessageHandling() {
  $("#chat-form").on("submit", handleMessageSubmission);
}

/**
 * Processes the submission of a new message
 * @param {Event} event - The form submission event
 */
function handleMessageSubmission(event) {
  event.preventDefault();
  
  const inputElement = $('#chat-input')[0];
  const message = inputElement.value.trim();
  
  if (!message) return;
  
  // Display user message
  addMessageToChat('user', message);
  
  // Clear input field
  inputElement.value = '';
  
  // Process message and get response
  const botResponse = processUserMessage(message);
  
  // Simulate typing delay before showing response
  const TYPING_DELAY_MS = 1000;
  setTimeout(() => {
    addMessageToChat('bot', botResponse);
  }, TYPING_DELAY_MS);
}