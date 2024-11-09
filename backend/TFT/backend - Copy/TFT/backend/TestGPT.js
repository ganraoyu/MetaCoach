const express = require('express');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json()); 

// Set up OpenAI client with the API key
const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});


app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        });

        const botMessage = response.choices[0].message.content;
        res.json({ response: botMessage });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        res.status(500).json({ error: 'Failed to get response from OpenAI' });
    }
});


const PORT = process.env.PORT || 30
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
