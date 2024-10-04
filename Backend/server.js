
const express = require('express');

// Initialization of app file
const app = express();

// Starting and basic route
app.get('/', (req, res) => {
    res.send('Backend is running smoothly');
});


const PORT = 3000;

// Listening or Starting a server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
