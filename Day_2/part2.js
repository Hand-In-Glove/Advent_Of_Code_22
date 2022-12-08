const fs = require("fs");

const readline = require("readline").createInterface({
	input: fs.createReadStream("./input.txt")
});

// X - lose
// Y - draw
// Z - win
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

const getLosingChoice = (elf) => {
	if (elf === "A") {
		// rock
		return "Z";
	}
	if (elf === "B") {
		// paper
		return "X";
	}
	if (elf === "C") {
		// scissor
		return "Y";
	}
};
const getWinningChoice = (elf) => {
	if (elf === "A") {
		// rock
		return "Y";
	}
	if (elf === "B") {
		// paper
		return "Z";
	}
	if (elf === "C") {
		// scissor
		return "X";
	}
};

const getRoundScore = (elf, player) => {
	if (player === "Y") {
		// should draw
		return scores.draw + scores[elf];
	}
	if (player === "X") {
		// should lose
		return scores[getLosingChoice(elf)];
	}
	if (player === "Z") {
		// should win
		return scores.win + scores[getWinningChoice(elf)];
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
