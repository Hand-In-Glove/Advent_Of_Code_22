const fs = require("fs");

const readline = require("readline").createInterface({
	input: fs.createReadStream("./input.txt")
});

let elfTummmyBuffer = 0;
let elfCount = 1;

const HungryElfMap = {};

readline.on("line", (line) => {
	const value = line.trim();
	if (value !== "") {
		HungryElfMap[elfCount] = (HungryElfMap[elfCount] || 0) + Number(line);
	}

	if (value === "") {
		// reset buffer
		elfTummmyBuffer = 0;
		elfCount += 1;
	}
});

readline.on("close", () => {
	//last check
	// HungryElfMap[elfCount] = elfTummmyBuffer;
	console.log("MAP: ", HungryElfMap);
	console.log(
		"TOP 3: ",
		Object.values(HungryElfMap)
			.sort((a, b) => -(a - b))
			.slice(0, 3)
	);
	console.log(
		"TOP 3 TOTAL: ",
		Object.values(HungryElfMap)
			.sort((a, b) => -(a - b))
			.slice(0, 3)
			.reduce((a, b) => (a += b))
	);
	console.log("finished");
});
