const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const flowerpotRoutes = require('./routes/flowerpots');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/flowerpots', flowerpotRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});