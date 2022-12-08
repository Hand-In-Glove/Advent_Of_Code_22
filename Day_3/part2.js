const fs = require("fs");

const readline = require("readline").createInterface({
	input: fs.createReadStream("./input.txt")
});

const alphabetPosition = (text) => {
	var result = "";
	for (var i = 0; i < text.length; i++) {
		var code = text.charCodeAt(i);
		if (code > 96 && code < 123) result += code - 96 + " ";
		if (code > 64 && code < 91) result += code - 38 + " "; // uppercase
	}

	return result.slice(0, result.length - 1);
};

const getCommonItem = (groupOfRucksacks) => {
	let common;
	const firstSack = groupOfRucksacks[0];

	for (let item of firstSack) {
		if (groupOfRucksacks.every((rucksack) => rucksack.includes(item)))
			common = item;
	}
	return common;
};

let total = 0;
let lineCount = 0;
let groupOfRucksacks = [];

readline.on("line", (rucksack) => {
	lineCount += 1;
	groupOfRucksacks.push(rucksack);

	if (lineCount === 3) {
		const commonItem = getCommonItem(groupOfRucksacks);
		const itemPriority = Number(alphabetPosition(commonItem));
		total += itemPriority;
		console.log(`
    Group: ${groupOfRucksacks}
    common item: ${commonItem}
    item priority: ${itemPriority}
    `);

		// reset
		lineCount = 0;
		groupOfRucksacks.splice(0, groupOfRucksacks.length);
	}
});

readline.on("close", () => {
	// console.log(`
	// Group: ${groupOfRucksacks}
	// `);
	console.log({ total });
});
