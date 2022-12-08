const fs = require("fs");

const readline = require("readline").createInterface({
	input: fs.createReadStream("./input.txt")
});

const testRepetition = (str) => {
	return /(.).*\1/.test(str);
};

let startOfPacket;

readline.on("line", (stream) => {
	for (let i = 3; i < stream.length; i++) {
		const preceedingSlice = stream.slice(i - 3, i + 1);

		if (!testRepetition(preceedingSlice)) {
			startOfPacket = i + 1;
			return;
		}
	}
});

readline.on("close", () => {
	console.log({ startOfPacket });
});
