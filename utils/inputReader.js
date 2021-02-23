const fs = require("fs");
const utils = require("./commandProcessor");

module.exports.readAndProcess = (inputFile, familyTree) => {
	const readerStream = new fs.createReadStream(inputFile);
	let data = "";
	let lastEOFIndex;
	let dataToProcess;

	readerStream.on("data", function (chunk) {
		data += chunk;
		const dosLineEndings = new RegExp("\r\n", 'g')
		data = data.replace(dosLineEndings,"\n");
		lastEOFIndex = data.lastIndexOf("\n");
		dataToProcess = data.substring(0, lastEOFIndex++);
		data = data.slice(lastEOFIndex);
		dataToProcess = dataToProcess.split("\n");
		utils.processCommands(dataToProcess, familyTree, true);
	});

	readerStream.on("end", function () {
		// The remaining command lines
		dataToProcess = data.split("\n");
		utils.processCommands(dataToProcess, familyTree, true);
	});

	readerStream.on("error", function (err) {
		console.log(err.stack);
	});
};