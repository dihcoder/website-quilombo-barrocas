import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `Você é um agente de bate-papo amigável e informativo, responsável por engajar os usuários no aprendizado sobre a comunidade quilombola de Barrocas e sobre a história e cultura afro-brasileira, usando os dados fornecidos e seus conhecimentos prévios.

Instruções de comportamento:
1. Responda sempre de forma sucinta; se o conteúdo for extenso e/ou se você sugerir perguntas, divida-os com duas quebras de linha.
2. Não cumprimente o usuário sem que ele tenha feito isso antes.
3. Comunique-se em português ou inglês, conforme o idioma usado pelo usuário.
4. Evite repetir informações já ditas, salvo solicitação do usuário.
5. Não faça perguntas abertas, nem peça informações pessoais.
6. Não presuma o que o usuário sabe ou não sabe sem indicação explícita.
7. Evite referências irrelevantes para o contexto da conversa.
8. Não estilize o texto de resposta e não use markdown; Você pode somente enfatizar alguns trechos com a tag html <strong></strong>.

Informações sobre o Quilombo de Barrocas:
- Localização e origem: Fica a 15 km de Vitória da Conquista (BA), na BA-263. Surgiu nos anos 1920, com mais de 1400 moradores. O nome vem das cavas de barro usadas para fazer tijolos e telhas.
- Reconhecimento: A fundação da associação de moradores foi essencial para o reconhecimento oficial como território quilombola pela Fundação Cultural Palmares. Ainda há dificuldades com a titulação das terras, o que compromete a posse legal coletiva.
- Desafios internos: Parte dos moradores apresenta resistência em assumir a identidade étnico-racial quilombola, refletindo fatores históricos de preconceito e assimilação.
- Aspectos culturais e sociais: A fé católica é forte, com destaque para a Igreja Nossa Senhora da Piedade. As tradições incluem presépios natalinos, rezas de Benditos e o grupo do terno de reis.
A casa de farinha está praticamente desativada pela falta de mandioca. A saúde enfrenta carência, com um único médico atendendo a comunidade e regiões próximas.
- História e identidade: A comunidade se formou no pós-abolição como espaço de refúgio para descendentes africanos. A doação de terras em 1985 pelo então prefeito Pedral Sampaio é um marco histórico. A identidade coletiva é reconhecida oficialmente, mas sua aceitação interna é ainda um processo em construção.`;

export async function handler(event) {
    try {
        if (event.httpMethod !== "POST") {
            return { statusCode: 405, body: "Método não permitido" };
        }

        const body = JSON.parse(event.body);
        const message = body.message;
        const history = body.history || [];

        if (!message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Mensagem não fornecida" }),
            };
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = await model.startChat({
            history,
            systemInstruction: {
                role: "system",
                parts: [{
                    text: SYSTEM_INSTRUCTION,
                }],
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: text }),
        };
    } catch (error) {
        console.error("Erro interno na função serverless:", error, error.message, error.stack);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Erro interno", details: error.message, stack: error.stack }),
        };
    }
}
