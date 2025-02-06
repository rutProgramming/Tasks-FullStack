const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 
const API_KEY = process.env.RENDER_API_KEY;

if (!API_KEY) {
  console.error("❌ API Key is missing! Add it to your .env file.");
  process.exit(1);
}

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.render.com/v1/services', {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Unknown error" });
  }
});

// הוספת הקוד להרצת השרת
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
