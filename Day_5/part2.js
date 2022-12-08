const fs = require("fs");

const readline = require("readline").createInterface({
	input: fs.createReadStream("./input.txt")
});

const stacks = [...new Array(9)].map(() => []);

let isParsingStacks = true;

let crateSliceIdx = 0;
let stackCount = 0;
const STACK_BASE = " 1   2   3   4   5   6   7   8   9 ";

const moveCrates = (quantity, sourceStack, targetStack) => {
	// move from source to buffer
	const crateBuffer = stacks[sourceStack - 1].splice(-quantity);
	// buffer to target
	stacks[targetStack - 1].push(...crateBuffer);
	// clear the buffer
	crateBuffer.splice(0, crateBuffer.length);
};

readline.on("line", (line) => {
	console.log("HANDLING LINE: ", line);
	if (line.trim() === "") return; // ignore the blank line
	if (line === STACK_BASE) {
		// check for end of stack
		isParsingStacks = false;
		// remove empty spaces from stack tops
		stacks.forEach((stack) => {
			stack.reduceRight((_, crate) => {
				if (!crate.trim()) stack.pop();
			}, null);
		});
	}
	if (isParsingStacks) {
		// iterate over line and add crates to stacks
		while (crateSliceIdx < line.length) {
			// get next crate from line
			const crate = line.slice(crateSliceIdx, crateSliceIdx + 3);
			// add crate to bottom of stack
			stacks[stackCount].unshift(crate);
			// increment
			stackCount += 1;
			crateSliceIdx += 4;
		}
		// reset counters
		crateSliceIdx = 0;
		stackCount = 0;
	}
	if (line.includes("move")) {
		// operate crane-o-matic-3000
		const [_, quantity, __, sourceStack, ___, targetStack] = line.split(" ");
		moveCrates(Number(quantity), Number(sourceStack), Number(targetStack));
	}
});

readline.on("close", () => {
	console.log(stacks);
	const topCrates = stacks.reduce((crateList, stack) => {
		const top = stack.pop();
		crateList += top;
		return crateList;
	}, "");
	console.log(
		"TOP CRATES: ",
		topCrates.replaceAll("[", "").replaceAll("]", "")
	);
});
