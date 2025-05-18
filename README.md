# Quilombo Barrocas Website

![Quilombo](https://github.com/user-attachments/assets/4f82f479-dd4e-4197-97bb-afb03edba8f3)

<br/>

## Table of Contents / índice

- [Quilombo Barrocas Website](#quilombo-barrocas-website)
  - [Table of Contents / índice](#table-of-contents--índice)
    - [English](#english)
    - [Português](#portugues)
  - [About the Project](#about-the-project)
  - [Evolution of the Chatbot: From Basic to Google Generative AI](#evolution-of-the-chatbot-from-basic-to-google-generative-ai)
  - [Project Structure](#project-structure)
  - [Features](#features)
  - [How to Use](#how-to-use)
    - [Local Development](#local-development)
    - [Deployment](#deployment)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Evolução do Chatbot: Do Básico à Inteligência Artificial Generativa do Google](#evolução-do-chatbot-do-básico-à-inteligência-artificial-generativa-do-google)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Funcionalidades](#funcionalidades)
  - [Como Usar](#como-usar)
    - [Desenvolvimento Local](#desenvolvimento-local)
    - [Deploy](#deploy)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Contribuições](#contribuições)
  - [Licença](#licença)

<br/>
<br/>
<br/>

---

### English
## About the Project

This repository contains the source code for the Quilombo Barrocas website, developed as part of a Software Engineering college project. The website aims to promote the culture, history, and information about the Quilombo Barrocas community.

Quilombos are Brazilian settlements founded by people of African origin, including escaped enslaved people. These communities represent important cultural heritage and resistance in Brazilian history. This project helps to digitally preserve and share the rich cultural traditions of the Quilombo Barrocas community.

The website is currently deployed and accessible at [quilombo-barrocas.netlify.app](https://quilombo-barrocas.netlify.app/).

## Evolution of the Chatbot: From Basic to Google Generative AI

Initially, the website featured a basic chatbot with a simple logic that loaded pre-written responses from an array. This served as a starting point for user interaction.

However, to significantly enhance the user experience and provide more dynamic and informative conversations, the chatbot has been upgraded to utilize the power of Google Generative AI. This integration allows the chatbot to understand and respond to a wider range of user queries about the Quilombo Barrocas community, providing more natural and helpful interactions.

## Project Structure

The project follows a modular structure to organize code and resources:

- **index.html**: Main entry point of the website.
- **components/**: Contains reusable UI components.
  - **chatbot/**: Implements an AI-powered chatbot using Google Gemini.
    - **controllers/**: Manages application flow and user interactions.
    - **models/**: Handles data and business logic.
    - **views/**: Manages UI rendering.
    - **factories/**: Creates component instances.
  - **modal_cookies/**: Implements cookie consent functionality.
- **css/**: Contains style files for the website's appearance.
- **images/**: Stores visual resources that illustrate Quilombo culture.
- **js/**: Contains JavaScript files for website functionality.
  - **getUserPreferredLanguage.js**: Detects user's browser language.
  - **loadLanguageFile.js**: Loads appropriate language file.
  - **switchLanguage.js**: Handles language switching functionality.
  - **index.js**: Main JavaScript entry point.
- **langs/**: Contains translation files for multilingual support.
  - **en.json**: English translations.
  - **pt.json**: Portuguese translations.
- **netlify/functions/**: Serverless functions for backend operations.
  - **gemini-chat.mjs**: Handles integration with Google Gemini AI.
- **netlify.toml**: Configuration for Netlify deployment.

## Features

The website offers several key features:

- **Responsive Design**: Mobile-friendly and visually appealing interface that adapts to different screen sizes.
- **Multilingual Support**: Complete content translation between Portuguese and English, with automatic language detection based on browser settings.
- **Cultural Information**: Comprehensive information about Quilombo Barrocas, including history, traditions, and cultural aspects.
- **Image Gallery**: Visual representation of the community and its cultural elements.
- **Advanced AI-Powered Chatbot**: Interactive chatbot in both Portuguese and English powered by Google Gemini generative AI, capable of understanding and responding to diverse questions about the Quilombo community in a more intelligent and conversational manner than the previous version.
- **Cookie Consent**: User privacy protection with cookie consent functionality.
- **Serverless Backend**: Utilizes Netlify Functions for backend operations without requiring a dedicated server.

## How to Use

### Local Development

To run the website locally:

1. Clone this repository:

  ```bash
    git clone https://github.com/dihcoder/website-quilombo-barrocas.git
  ```

2. Navigate to the project directory:
  ```bash
    cd website-quilombo-barrocas
  ```

3. To run the project in a simple way without the chatbot functionality, open `index.html` in your browser.

4. To use the advanced chatbot functionality locally, you'll need to:
  - Generate a Google Gemini API key at [Google AI Studio](https://aistudio.google.com/) and copy the value.
  - Create a `.env` file in the root directory and add it like:
    ```env
     GEMINI_API_KEY=your-api-key-here
    ```
  - Install the project dependencies:
     ```bash
     # to initialize the project (if you haven't already)
     npm init -y

     # to install the Google Generative AI SDK
     npm install @google/generative-ai
     ```
  - Install Netlify CLI (if not installed):
    ```bash
    npm install -g netlify-cli
    ```
  - Run the development server using Netlify
    ```bash
    netlify dev
    ```

### Deployment

The project is configured for easy deployment on Netlify:

1. Fork this repository to your GitHub account.
2. Connect your GitHub repository to Netlify.
3. Configure the following build settings:
  - Build command: (none required)
  - Publish directory: .
  - Functions directory: netlify/functions
4. Set up environment variables in Netlify for the Google Gemini API key to enable the chatbot.

## Technologies Used

The website is built using the following technologies:

- **HTML5**: Provides the basic structure of the website.
- **CSS3 & Bootstrap**: Handles styling and responsive design.
- **JavaScript**: Implements interactive functionality.
- **jQuery**: Facilitates DOM manipulation and language switching.
- **JSON**: Stores translated text content.
- **Google Gemini AI**: Powers the advanced, intelligent chatbot functionality.
- **Netlify Functions**: Provides serverless backend capabilities for the chatbot API integration.
- **MVC Architecture**: Used in the chatbot component for better code organization.

## Contributing

Contributions to improve the website are welcome. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes.
4. Submit a pull request with a clear description of the changes.

Please ensure your code follows the existing style and includes appropriate documentation.

## License

This project is licensed under the ISC License. See the package.json file for details.

<br/>
<br/>
<br/>

---

### Português

## Sobre o Projeto

Este repositório contém o código-fonte do website do Quilombo Barrocas, desenvolvido como parte de um projeto da faculdade de Engenharia de Software. O website visa promover a cultura, história e informações sobre a comunidade do Quilombo Barrocas.

Quilombos são assentamentos brasileiros fundados por pessoas de origem africana, incluindo escravizados fugitivos. Essas comunidades representam um importante patrimônio cultural e de resistência na história brasileira. Este projeto ajuda a preservar digitalmente e compartilhar as ricas tradições culturais da comunidade do Quilombo Barrocas.

O website está atualmente implantado e acessível em [quilombo-barrocas.netlify.app](https://quilombo-barrocas.netlify.app/).

## Evolução do Chatbot: Do Básico à Inteligência Artificial Generativa do Google

Inicialmente, o website apresentava um chatbot básico com uma lógica simples que carregava respostas prontas de um array. Isso serviu como um ponto de partida para a interação do usuário.

No entanto, para melhorar significativamente a experiência do usuário e fornecer conversas mais dinâmicas e informativas, o chatbot foi atualizado para utilizar o poder da Google Generative AI. Essa integração permite que o chatbot entenda e responda a uma gama mais ampla de perguntas dos usuários sobre a comunidade do Quilombo Barrocas, proporcionando interações mais naturais e úteis.

## Estrutura do Projeto

O projeto segue uma estrutura modular para organizar código e recursos:

- **index.html**: Ponto de entrada principal do website.
- **components/**: Contém componentes de UI reutilizáveis.
  - **chatbot/**: Implementa um chatbot com IA usando Google Gemini.
    - **controllers/**: Gerencia o fluxo da aplicação e interações do usuário.
    - **models/**: Lida com dados e lógica de negócios.
    - **views/**: Gerencia a renderização da UI.
    - **factories/**: Cria instâncias de componentes.
  - **modal_cookies/**: Implementa funcionalidade de consentimento de cookies.
- **css/**: Contém arquivos de estilo para a aparência do website.
- **images/**: Armazena recursos visuais que ilustram a cultura do Quilombo.
- **js/**: Contém arquivos JavaScript para funcionalidade do website.
  - **getUserPreferredLanguage.js**: Detecta o idioma do navegador do usuário.
  - **loadLanguageFile.js**: Carrega o arquivo de idioma apropriado.
  - **switchLanguage.js**: Gerencia a funcionalidade de troca de idioma.
  - **index.js**: Ponto de entrada principal do JavaScript.
- **langs/**: Contém arquivos de tradução para suporte multilíngue.
  - **en.json**: Traduções em inglês.
  - **pt.json**: Traduções em português.
- **netlify/functions/**: Funções serverless para operações de backend.
  - **gemini-chat.mjs**: Gerencia integração com a IA Google Gemini.
- **netlify.toml**: Configuração para implantação na Netlify.

## Funcionalidades

O website oferece várias funcionalidades principais:

- **Design Responsivo**: Interface amigável para dispositivos móveis e visualmente atraente que se adapta a diferentes tamanhos de tela.
- **Suporte Multilíngue**: Tradução completa de conteúdo entre português e inglês, com detecção automática de idioma baseada nas configurações do navegador.
- **Informações Culturais**: Informações abrangentes sobre o Quilombo Barrocas, incluindo história, tradições e aspectos culturais.
- **Galeria de Imagens**: Representação visual da comunidade e seus elementos culturais.
- **Chatbot Avançado com IA**: Chatbot interativo em português e inglês usando IA generativa Google Gemini, capaz de entender e responder a diversas perguntas sobre a comunidade Quilombola de maneira mais inteligente e conversacional do que a versão anterior.
- **Consentimento de Cookies**: Proteção de privacidade do usuário com funcionalidade de consentimento de cookies.
- **Backend Serverless**: Utiliza Netlify Functions para operações de backend sem necessidade de um servidor dedicado.

## Como Usar

### Desenvolvimento Local

Para executar o website localmente:

1. Clone este repositório:
  ```bash
    git clone https://github.com/dihcoder/website-quilombo-barrocas.git
  ```

2. Navegue até o diretório do projeto:
  ```bash
    cd website-quilombo-barrocas
  ```

3. Para executar o projeto de forma simples, sem a funcionalidade do chatbot, abra o arquivo `index.html` no seu navegador.

4. Para usar a funcionalidade avançada do chatbot localmente, você precisará:
  - Gerar uma chave de API do Google Gemini em [Google AI Studio](https://aistudio.google.com/) e copiar o valor.
  - Criar um arquivo `.env` na raiz do projeto e adicioná-lo assim:
    ```env
     GEMINI_API_KEY=sua-chave-aqui
    ```
  - Instalar as dependências do projeto:
     ```bash
     # para inicializar o projeto (se ainda não tiver feito)
     npm init -y

     # para instalar o SDK da Google Generative AI
     npm install @google/generative-ai
     ```
  - Instalar o Netlify CLI (se ainda não estiver instalado):
    ```bash
    npm install -g netlify-cli
    ```
  - Executar o servidor de desenvolvimento com o Netlify:
    ```bash
    netlify dev
    ```

### Deploy

O projeto está configurado para facilitar o deploy no Netlify:

1. Faça um fork deste repositório para sua conta do GitHub.
2. Conecte seu repositório do GitHub ao Netlify.
3. Configure as seguintes opções de build:
  - Comando de build: (nenhum necessário)
  - Diretório de publicação: `.`
  - Diretório de funções: `netlify/functions`
4. Configure a variável de ambiente no painel da Netlify com a chave da API do Google Gemini para ativar o chatbot.

## Tecnologias Utilizadas

O website é construído usando as seguintes tecnologias:

- **HTML5**: Fornece a estrutura básica do site.
- **CSS3 & Bootstrap**: Gerencia estilização e design responsivo.
- **JavaScript**: Implementa funcionalidade interativa.
- **jQuery**: Facilita manipulação do DOM e troca de idioma.
- **JSON**: Armazena conteúdo de texto traduzido.
- **Google Gemini AI**: Alimenta a funcionalidade de chatbot avançado e inteligente.
- **Netlify Functions**: Fornece capacidades de backend serverless para a integração da API do chatbot.
- **Arquitetura MVC**: Usada no componente de chatbot para melhor organização do código.

## Contribuições

Contribuições para melhorar o website são bem-vindas. Para contribuir:

1. Faça um fork do repositório.
2. Crie um novo branch para sua funcionalidade ou correção.
3. Faça suas alterações.
4. Envie um pull request com uma descrição clara das alterações.

Por favor, certifique-se de que seu código segue o estilo existente e inclui documentação apropriada.

## Licença

Este projeto está licenciado sob a Licença ISC. Veja o arquivo package.json para detalhes
