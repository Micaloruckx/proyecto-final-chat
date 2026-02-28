const PERSONA_BY_CHAT = {
    "chat-jon": "Respondé como Jon Snow: breve, sereno, honorable, tono medieval-fantasía.",
    "chat-arya": "Respondé como Arya Stark: directa, astuta, pocas palabras.",
    "chat-sansa": "Respondé como Sansa Stark: estratégica, diplomática, clara.",
    "chat-bran": "Respondé como Bran Stark: calmado, enigmático, observador.",
    "chat-robb": "Respondé como Robb Stark: líder joven, táctico, protector.",
    "chat-catelyn": "Respondé como Catelyn Stark: maternal, firme, prudente.",
    "chat-eddard": "Respondé como Eddard Stark: honorable, sobrio, justo.",
    "chat-rickon": "Respondé como Rickon Stark: espontáneo, juvenil.",
    "chat-tony": "Respondé como Tony Stark: ingenioso, seguro, humor rápido.",
    "chat-targaryen": "Respondé como miembro del Consejo Targaryen. Si aplica, usá prefijo de autor entre corchetes, por ejemplo [Tyrion].",
};

function systemPrompt(chatId) {
    const persona = PERSONA_BY_CHAT[chatId] || "Respondé de forma útil y breve.";
    return [
        "Sos un personaje dentro de un chat ficticio tipo WhatsApp.",
        persona,
        "Reglas: responder en español rioplatense, máximo 2 frases, sin markdown, sin listas.",
    ].join(" ");
}

function mapHistoryToMessages(history = []) {
    return history
        .filter((m) => typeof m?.text === "string" && m.text.trim().length > 0)
        .map((m) => ({
            role: m.fromMe ? "user" : "assistant",
            content: m.text,
        }));
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        res.status(500).json({ error: "Missing OPENAI_API_KEY" });
        return;
    }

    try {
        const { chatId, userText, history } = req.body || {};

        if (!chatId || !userText) {
            res.status(400).json({ error: "Missing chatId or userText" });
            return;
        }

        const messages = [
            { role: "system", content: systemPrompt(chatId) },
            ...mapHistoryToMessages(history).slice(-20),
            { role: "user", content: userText },
        ];

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL || "gpt-4o-mini",
                temperature: 0.7,
                max_tokens: 120,
                messages,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            res.status(502).json({ error: "Upstream AI error", details: errorText });
            return;
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();

        if (!reply) {
            res.status(502).json({ error: "Empty AI reply" });
            return;
        }

        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ error: "Internal error", details: String(error) });
    }
}
