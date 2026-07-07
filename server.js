const express = require('express');
const app = express();

// Terima body mentah
app.use(express.raw({ type: '*/*', limit: '1mb' }));

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post('/collect', async (req, res) => {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: 'Node ON, payload received.'
      })
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(502).end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Running on port', PORT));
