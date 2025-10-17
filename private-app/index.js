const express = require('express');
const app = express();
app.use(express.json());

const records = [];

app.get('/health', (_, res) => res.json({ app: 'private', status: 'ok' }));

app.post('/ingest', (req, res) => {
  records.push({ data: req.body, timestamp: new Date().toISOString() });
  res.json({ success: true, totalRecords: records.length });
});

app.get('/records', (_, res) => res.json(records));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Private app running on port ${PORT}`));
