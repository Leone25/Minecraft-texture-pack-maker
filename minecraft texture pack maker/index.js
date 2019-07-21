const express = require('express');
const app = express();
const fs = require('fs');
const sharp = require('sharp');

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

function resizeImage(path, width, height) {
	var img = fs.readFileSync(path);
	let img = sharp();
	img = img.resize(width, height);
	return img;
}

app.use('/source', express.static('source'));

app.get('/', function (req, res) {
	var result = fs.readFileSync(filepathindex).toString();
	result = substituteString(result, '${navbar}', navbar);
	res.send(result);
})

app.get('/minecraft/:path', function (req, res) { 
	//res.send(resizeImage());
	console.log(req.params.path);
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