const express = require('express');
const app = express();
const fs = require('fs');
const sharp = require('sharp');
const tree = require('./stuff.json');

// Text to insert into template
const navbar = '';

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

app.use('/default', express.static('default'));

app.get('/', function (req, res) {
	var result = fs.readFileSync(filepathindex).toString();
	result = substituteString(result, '${navbar}', navbar);
	var blocksDiv = '';
	tree.forEach(block => {
		if (block.textureType == 0) {
			blocksDiv += `
			<div class="block">
			<img src="default/${block.textureTop}" class="top"></img>
			<img src="default/${block.textureTop}" class="left"></img>
			<img src="default/${block.textureTop}" class="right"></img>
			<div class="block-name">${block.name}</div>
			</div>`;
		} else if (block.textureType == 1) {
			blocksDiv += `
			<div class="block">
			<img src="default/${block.textureTop}" class="top"></img>
			<img src="default/${block.textureSide}" class="left"></img>
			<img src="default/${block.textureSide}" class="right"></img>
			<div class="block-name">${block.name}</div>
			</div>`;
		}
	});
	
	result = substituteString(result, '${blocks}', blocksDiv);
	
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