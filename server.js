const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello amorzinhos!!!")
});

app.listen(3001);