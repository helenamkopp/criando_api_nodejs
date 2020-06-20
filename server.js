const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Primeiro ubuntoasd22as!")
});

app.listen(3001);