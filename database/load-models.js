const fs = require('fs');
const path = require('path');

function loadModels() {
	const modelsDir = path.join(__dirname, 'models');

	fs.readdirSync(modelsDir)
		.filter(file => file.endsWith('.js'))
		.forEach(file => {
			const modelPath = path.join(modelsDir, file);
			require(modelPath);
		});
}

module.exports = { loadModels };