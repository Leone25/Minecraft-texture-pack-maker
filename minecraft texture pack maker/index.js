const config = require('./config.json');

const express = require('express');
const app = express();
const fs = require('fs');
const objList = require(config.objList);

// Text to insert into template
const navbar = '';

app.use('/source', express.static('source'));

app.use('/default', express.static('default'));

app.get('/', function (req, res) {
	var result = fs.readFileSync(config.template).toString();
	result = substituteString(result, '${navbar}', navbar);
	var blocksDiv = '<div class="blocks-container">';
	objList.forEach(block => {
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
	
	blocksDiv += '</div>';
	
	result = substituteString(result, '${content}', blocksDiv);
	
	res.send(result);
})

app.use((req, res) => {
	fs.createReadStream(config["404Page"]).pipe(res);
});


app.listen(config.port, () => console.log(`Running on port ${config.port}`));

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