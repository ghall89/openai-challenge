const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/script.js', function (req, res) {
	res.sendFile(path.join(__dirname, '/script.js'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
