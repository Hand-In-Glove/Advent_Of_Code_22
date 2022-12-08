const fs = require("fs");

const readline = require("readline").createInterface({
	input: fs.createReadStream("./input.txt")
});

let elfTummmyBuffer = 0;

let hungriestElf = 0;

readline.on("line", (line) => {
	const value = line.trim();
	if (value !== "") {
		elfTummmyBuffer += Number(line);
	}

	if (value === "") {
		// compare buffer total with current total
		if (elfTummmyBuffer > hungriestElf) hungriestElf = elfTummmyBuffer;
		// reset buffer
		elfTummmyBuffer = 0;
	}
});

readline.on("close", () => {
	//last check
	if (elfTummmyBuffer > hungriestElf) hungriestElf = elfTummmyBuffer;
	console.log("RESULT: ", hungriestElf);
	console.log("finished");
});
