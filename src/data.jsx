export async function loadCsvAsJson() {
	const response = await fetch("/Items.csv");
	const text = await response.text();
	return csvToJson(text);
}

function csvToJson(csvText) {
	const lines = csvText.split("\n");
	const headers = lines[0].split(",");

	return lines
		.slice(1)
		.filter(Boolean)
		.map((line) => {
			const values = line.split(",");
			return headers.reduce((obj, header, i) => {
				obj[header.trim()] = values[i]?.trim();
				return obj;
			}, {});
		});
}
