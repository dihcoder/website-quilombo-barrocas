/**
 * /components/chatbot/models/MessageModel.js
 * Represents a single message in the chat
 */
class MessageModel {
	constructor(sender, text) {
		this.sender = sender;
		this.text = text;
		this.timestamp = new Date();
	}
}

export default MessageModel;