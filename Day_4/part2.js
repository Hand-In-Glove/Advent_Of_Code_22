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

let overlapsCount = 0;

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
		(elfBMin <= elfAMin && elfBMax >= elfAMax) ||
		(elfAMin >= elfBMin && elfAMin <= elfBMax) ||
		(elfBMin >= elfAMin && elfBMin <= elfAMax) ||
		(elfAMax <= elfBMax && elfAMax >= elfBMin) ||
		(elfBMax <= elfAMax && elfBMax >= elfAMin)
	) {
		overlapsCount += 1;
		console.log("This contains the other full range! 👆");
		return;
	}
});

readline.on("close", () => {
	console.log({ overlapsCount });
});
