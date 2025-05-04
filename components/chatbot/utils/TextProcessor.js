/**
 * /components/chatbot/utils/TextProcessor.js
 * Handles text processing and analysis functions
 */
class TextProcessor {
    normalizeAndTokenizeMessage(message) {
        // Normalize the message (remove accents, convert to lowercase)
        const normalizedMessage = message.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        // Split into words and remove punctuation
        return normalizedMessage.split(/\s+/)
            .map(word => word.replace(/[.,!?;:()]/g, ''))
            .filter(word => word.length > 0);
    }

    countMatchingWords(words, keywords) {
        return words.filter(word =>
            keywords.some(keyword => {
                const normalizedKeyword = keyword.toLowerCase();
                return normalizedKeyword === word ||
                    word.includes(normalizedKeyword) ||
                    normalizedKeyword.includes(word);
            })
        ).length;
    }
}

export default TextProcessor;