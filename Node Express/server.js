import axios from 'axios';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.RENDER_API_KEY;

// יצירת סוכן מותאם אישית שמתעלם מבעיות אישור (פחות מסוכן מביטול מוחלט)
const agent = new https.Agent({  
  rejectUnauthorized: false 
});

axios.get('https://api.render.com/v1/services', {
  headers: { Authorization: `Bearer ${API_KEY}` },
  httpsAgent: agent  
})
.then(response => console.log(response.data))
.catch(error => console.error(error));

console.log(" Render assigned PORT:", process.env.PORT);
