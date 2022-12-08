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

const getCommonItem = (comp1, comp2) => {
	let common;
	comp1.forEach((item) => {
		if (comp2.includes(item)) common = item;
	});
	return common;
};

let total = 0;

readline.on("line", (line) => {
	const firstCompartment = line.slice(0, line.length / 2).split("");
	const secondCompartment = line.slice(line.length / 2).split("");
	const commonItem = getCommonItem(firstCompartment, secondCompartment);
	const itemPriority = Number(alphabetPosition(commonItem));

	console.log(`
Line: ${line} -- line length : ${line.length}
first compartment: ${firstCompartment} -- line length : ${firstCompartment.length}
second compartment: ${secondCompartment} -- line length : ${secondCompartment.length}
common item: ${commonItem}
item priority: ${itemPriority}
`);
	total += Number(alphabetPosition(commonItem));
});

readline.on("close", () => {
	console.log({ total });
});
