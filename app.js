const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Health endpoint for Kubernetes probes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Node.js CI/CD app');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});


// Just for testing purpose 