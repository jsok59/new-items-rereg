export async function loadCsvAsJson() {
	const itemResponse = await fetch("/Items.csv");
	const barcodeResponse = await fetch("/ItemReferences.csv");
	const itemText = await itemResponse.text();
	const barcodeText = await barcodeResponse.text();
	return [csvToJson(itemText), csvToJson(barcodeText)];
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
