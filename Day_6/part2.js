const fs = require("fs");

const readline = require("readline").createInterface({
	input: fs.createReadStream("./input.txt")
});

const testRepetition = (str) => {
	return /(.).*\1/.test(str);
};

let startOfMessage;
const MESSAGE_MARKER_LEN = 14;

let i = MESSAGE_MARKER_LEN - 1;

readline.on("line", (stream) => {
	while (i < stream.length) {
		const startOfMessageSlice = stream.slice(
			i - (MESSAGE_MARKER_LEN - 1),
			i + 1
		);
		if (!testRepetition(startOfMessageSlice)) {
			startOfMessage = i + 1;
			return;
		}
		i += 1;
	}
});

readline.on("close", () => {
	console.log({ startOfMessage });
});
