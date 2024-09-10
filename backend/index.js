const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Parser } = require('json2csv'); // Import json2csv for JSON to CSV conversion
const { parseString } = require('xml2js'); // Import xml2js for XML to JSON conversion
const csvtojson = require('csvtojson'); // Import csvtojson for CSV to JSON conversion
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Use environment variable for PORT with fallback to 3000
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON input, CSV, and XML
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/csv' })); // Handle CSV input as plain text
app.use(bodyParser.raw({ type: 'application/xml' })); // Handle XML input as raw buffer

// Allow CORS for the specific origin from the environment variable, fallback to '*'
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
};
app.use(cors(corsOptions));

// POST route to prettify JSON
app.post('/prettify', (req, res) => {
  try {
    const jsonData = req.body;

    if (!jsonData || typeof jsonData !== 'object') {
      return res.status(400).json({ error: 'Invalid JSON input' });
    }

    const prettifiedJSON = JSON.stringify(jsonData, null, 4);
    res.status(200).json({ message: 'Successfully prettified JSON', prettifiedJSON });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing JSON' });
  }
});

// POST route to minify JSON
app.post('/minify', (req, res) => {
  try {
    const jsonData = req.body;

    if (!jsonData || typeof jsonData !== 'object') {
      return res.status(400).json({ error: 'Invalid JSON input' });
    }

    const minifiedJSON = JSON.stringify(jsonData);
    res.status(200).json({ message: 'Successfully minified JSON', minifiedJSON });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing JSON' });
  }
});

// POST route to validate JSON
app.post('/validate', (req, res) => {
  try {
    const jsonData = req.body;

    if (!jsonData || typeof jsonData !== 'object') {
      return res.status(400).json({ error: 'Invalid JSON input' });
    }

    res.status(200).json({ message: 'Valid JSON' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while validating JSON' });
  }
});

// POST route to convert JSON to CSV
app.post('/json-to-csv', (req, res) => {
  try {
    const jsonData = req.body;

    if (!Array.isArray(jsonData) && typeof jsonData !== 'object') {
      return res.status(400).json({ error: 'Invalid JSON input' });
    }

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(jsonData);

    res.status(200).json({ message: 'Successfully converted JSON to CSV', csv });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while converting JSON to CSV' });
  }
});

// POST route to convert CSV to JSON
app.post('/csv-to-json', async (req, res) => {
  try {
    const csvData = req.body;

    if (!csvData || typeof csvData !== 'string') {
      return res.status(400).json({ error: 'Invalid CSV input' });
    }

    // Convert CSV to JSON
    const jsonArray = await csvtojson().fromString(csvData);

    res.status(200).json({ message: 'Successfully converted CSV to JSON', json: jsonArray });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while converting CSV to JSON' });
  }
});

// POST route to convert XML to JSON
app.post('/xml-to-json', (req, res) => {
  const xmlData = req.body.toString(); // Convert buffer to string
  console.log(xmlData);
  if (!xmlData || typeof xmlData !== 'string') {
    return res.status(400).json({ error: 'Invalid XML input' });
  }

  parseString(xmlData, { explicitArray: false }, (err, result) => {
    if (err) {
      console.error("XML Parsing Error:", err);
      return res.status(500).json({ error: 'Failed to convert XML to JSON', details: err.message });
    }
    res.status(200).json({
      message: 'Successfully converted XML to JSON',
      json: result,
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
