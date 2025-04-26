import addEventListeners from "./addEventListeners.js";

export default function appendChatbotToWebPage() {

    // Append chatbot CSS to the head
    $(`<link rel="stylesheet" href="components/chatbot/style.css">`)
        .appendTo("head");

    // Append chatbot template to the body
    $.get("components/chatbot/template.html", function (chatbotTemplate) {
        $("body").append(chatbotTemplate);

        addEventListeners();
    });
}