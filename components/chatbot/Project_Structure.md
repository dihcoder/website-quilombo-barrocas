```bash
/components/chatbot/
├── models/              # Data and business logic
│   ├── ChatbotModel.js  # Core data management
│   └── MessageModel.js  # Message representation
├── views/               # UI components
│   ├── ChatbotView.js   # Main UI management
│   └── MessageView.js   # Individual message rendering
├── controllers/         # Application flow
│   └── ChatbotController.js  # Coordinates model and view
├── factories/           # Object creation patterns
│   └── ChatbotFactory.js # Creates chatbot instances
├── index.js             # Main entry point
├── style.css            # Chatbot styles
└── template.html        # HTML template
```