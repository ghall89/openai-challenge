const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/script.js', function (req, res) {
	res.sendFile(path.join(__dirname, '/script.js'));
});

app.get('/callapi', function (req, res) {
	// res.send('It works!');
	const query = req.headers.query;
	const data = {
		prompt: query,
		temperature: 0.5,
		max_tokens: 64,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0
	};

	fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.API_KEY}`
		},
		body: JSON.stringify(data)
	})
		.then(rsp => rsp.json())
		.then(data => {
			const result = data.choices[0].text;
			res.send(result);
		})
		.catch(error => {
			throw error;
		});
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
