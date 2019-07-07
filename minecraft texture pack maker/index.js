const express = require('express');
const app = express();
const fs = require('fs');

// Text to insert into template
const navbar = '';

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

app.use('/source', express.static('source'));
app.use('/minecraft 16x16', express.static('minecraft'));
app.use('/minecraft 32x32', express.static('minecraft32'));

app.get('/', function (req, res) {
	var result = fs.readFileSync(filepathindex).toString();
	result = substituteString(result, '${navbar}', navbar);
	res.send(result);
})

app.listen(8080);

/*
sharp('input.jpg')
  .resize(200, 200)
  .toFile('ouput.jpg', function(err) {
    // output.jpg is a 200 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
});



*/