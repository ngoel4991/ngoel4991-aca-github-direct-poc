const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PRIVATE_APP_URL = process.env.PRIVATE_APP_URL || 'http://private-app.default:8080';

app.get('/health', (_, res) => res.json({ app: 'public', status: 'ok' }));

app.post('/send', async (req, res) => {
  try {
    const response = await axios.post(`${PRIVATE_APP_URL}/ingest`, req.body);
    res.json({ message: 'Forwarded to private app', result: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Public app running on port ${PORT}`));
