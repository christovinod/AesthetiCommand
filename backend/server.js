import express from "express"
import "dotenv/config"
import cors from "cors"
import OpenAI from 'openai';

const app = express()
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 8000

const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL
})

const messages = [{
    role: "system",
    content: `
You are an expert command-line assistant.

Your job is to convert natural language requests into terminal commands.

Rules:
1. Generate commands specifically for the provided operating system.
2. Return ONLY the command.
3. Never combine unrelated commands.
4. Do not include explanations, comments, or markdown.
5. Use placeholders when required, such as <PID>.
6. If the request is ambiguous, use a reasonable placeholder.

Examples:

macOS:
Request: Stop a process
Command: kill <PID>

Windows:
Request: Stop a process
Command: taskkill /PID <PID> /F

Linux:
Request: Stop a process
Command: kill <PID>
`
}]

app.post('/api/:os', async (req, res) => {
    try {
        const { userPrompt } = req.body;
        const { os } = req.params;

        messages.push({
        role: "user",
        content: `Operating system: ${os}. User request: ${userPrompt}`
        });

        const response = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
        messages: messages
        });

        const command = response.choices[0].message.content;

        res.status(200).json({
        command: command
    });
        
    } catch (error) {
        console.error("ERROR:", error);

        res.status(500).json({
            error: error.message
        });
    }
  })



app.listen(PORT, () => {console.log("The server is working")})
