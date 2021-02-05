const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello express');
});

app.listen(port, (error) => {
    console.log(`Listening on port ${port}`);
});