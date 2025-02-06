const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; 
console.log(` Render assigned PORT: ${PORT}`);

app.get('/', (req, res) => {
    res.send('Welcome to our API!');
});

// ודאי שהשרת מאזין לפורט שהוקצה
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
