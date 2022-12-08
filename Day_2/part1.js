const fs = require("fs");

const readline = require("readline").createInterface({
	input: fs.createReadStream("./input.txt")
});

const scores = {
	A: 1,
	B: 2,
	C: 3,
	X: 1,
	Y: 2,
	Z: 3,
	win: 6,
	draw: 3,
	lose: 0
};

const areEqual = (elf, player) => {
	if (elf === "A" && player === "X") return true;
	if (elf === "B" && player === "Y") return true;
	if (elf === "C" && player === "Z") return true;
	return false;
};

const getRoundScore = (elf, player) => {
	if (areEqual(elf, player)) {
		return scores.draw + scores[player];
	}
	if (elf === "A") {
		// rock
		if (player === "Y") {
			// paper
			return scores.win + scores[player];
		}
		if (player === "Z") {
			//scissors
			return scores.lose + scores[player];
		}
	}
	if (elf === "B") {
		// paper
		if (player === "X") {
			// rock
			return scores.lose + scores[player];
		}
		if (player === "Z") {
			//scissors
			return scores.win + scores[player];
		}
	}
	if (elf === "C") {
		// scissors
		if (player === "X") {
			// rock
			return scores.win + scores[player];
		}
		if (player === "Y") {
			//paper
			return scores.lose + scores[player];
		}
	}
};

let total = 0;

readline.on("line", (line) => {
	const [elf, player] = line.split(" ");
	const score = getRoundScore(elf, player);
	console.log(`
    Line: ${line}   ---   SCORE: ${score}
    `);
	total += score;
});

readline.on("close", () => {
	console.log(total);
});
