const express = require('express');
const app = express();
const fs = require('fs');

// Text to insert into template
const sampleText = 'hello world!!!';
const navbar = 'lol';

// Template to accept sampleText
const filepathindex = 'index.html';

function substituteString(input, stringToChange, substitute) {
	var n = 0;
	while (true) {
		n = input.indexOf(stringToChange, n);
		if (n == -1) { break; } else {
			input = input.replace(stringToChange, substitute);
		}
	}
	return input;
}

app.get('/', function (req, res) {
	var result = fs.readFileSync(filepathindex).toString();
	result = substituteString(result, '${navbar}', navbar);
	res.send(result);
})

app.listen(8080);