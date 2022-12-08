// Every section has a unique ID number,
// each Elf is assigned a range of section IDs.
// some sections overlap
// In how many assignment pairs does one range fully contain the other?

const fs = require("fs");

const readline = require("readline").createInterface({
	input: fs.createReadStream("./input.txt")
});

const getMinMax = (rangeString) =>
	rangeString.split("-").map((str) => Number(str));

let containsFullRangeCount = 0;

readline.on("line", (line) => {
	const [elfARange, elfBRange] = line.split(",");
	const [elfAMin, elfAMax] = getMinMax(elfARange);
	const [elfBMin, elfBMax] = getMinMax(elfBRange);
	console.log(`
    Elf A Min: ${elfAMin} -- Elf A Max: ${elfAMax}
    Elf B Min: ${elfBMin} -- Elf B Max: ${elfBMax}
    `);
	if (
		(elfAMin <= elfBMin && elfAMax >= elfBMax) ||
		(elfBMin <= elfAMin && elfBMax >= elfAMax)
	) {
		containsFullRangeCount += 1;
		console.log("This contains the other full range! 👆");
		return;
	}
	// console.log(`
	// This does not contain the other range
	// Elf A Range: ${elfARange}
	// Elf B Range: ${elfBRange}
	// `);
});

readline.on("close", () => {
	console.log({ containsFullRangeCount });
});
