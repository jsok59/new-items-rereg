import { useState, useEffect } from "react";
import "../styles/NewItemModal.css";
import Item from "./Item.jsx";

export default function NewItemModal({ closeModal, isOpen, itemData, barcodeData, addItem, currItem, editItem }) {
	const [item, setItem] = useState({
		id: "",
		description: "",
		brand: "",
		kor_description: "",
		uom: "",
		size: "",
		exd: "",
		unitPrice: 0,
		salesToRetail: 0,
		priceCode: 0,
		barcodeRetail: "0",
		barcodeNotRetail: "0",
		category: "",
	});

	useEffect(() => {
		if (currItem && Object.keys(currItem).length > 0) {
			setItem(currItem);
		}
	}, [currItem]);

	function calcPriceCode(unitPrice, salesToRetail) {
		let eachPrice = Math.round((unitPrice / salesToRetail) * 100) / 100;
		let [first, second] = eachPrice.toFixed(2).split(".");

		first = first.split("");
		second = second.split("");
		while (first.length < 3) {
			first.unshift("0");
		}

		let [firstMid, secondMid] = Number(unitPrice).toFixed(2).split(".");
		firstMid = firstMid.split("");
		secondMid = secondMid.split("");
		while (firstMid.length < 3) {
			firstMid.unshift("0");
		}
		return [...first, ...firstMid, ...secondMid, ...second].join("");
	}

	useEffect(() => {
		const itemJSON = itemData.find((element) => element["No."] === item.id);

		if (itemJSON) {
			setItem((prev) => ({
				...prev,
				description: itemJSON["Description"],
				brand: itemJSON["Brand"],
				kor_description: itemJSON["Description 2"],
				uom: itemJSON["Base Unit of Measure"],
				size: itemJSON["Size Description"],
				unitPrice: itemJSON["Unit Price"],
				salesToRetail: itemJSON["Sales to Retail Conv. Factor"],
				category: itemJSON["Storage Type"].toUpperCase(),
			}));
		}
	}, [item.id, itemData]);

	useEffect(() => {
		const itemWithRetail = barcodeData.find((element) => element["Item No."] === item.id && element["Description"].includes("RETAIL"));

		const itemWithoutRetail = barcodeData.find((element) => element["Item No."] === item.id && !element["Description"].includes("RETAIL"));

		if (itemWithRetail) {
			setItem((prev) => ({ ...prev, barcodeRetail: itemWithRetail["Reference No."] }));
		}

		if (itemWithoutRetail) {
			setItem((prev) => ({ ...prev, barcodeNotRetail: itemWithoutRetail["Reference No."] }));
		}
	}, [item.id, barcodeData]);

	useEffect(() => {
		if (item.unitPrice && item.salesToRetail) {
			setItem((prev) => ({ ...prev, priceCode: calcPriceCode(item.unitPrice, item.salesToRetail) }));
		}
	}, [item.unitPrice, item.salesToRetail]);

	return (
		<div className={isOpen ? "NewItemModal" : "NewItemModal hidden"}>
			<form action="">
				<div>
					<label htmlFor="itemNum">Item Number:</label>
					<input
						type="text"
						id="itemNum"
						name="itemNum"
						value={item.id}
						onChange={(e) => setItem((prev) => ({ ...prev, id: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="brand">Brand:</label>
					<input
						type="text"
						id="brand"
						name="brand"
						value={item.brand}
						onChange={(e) => setItem((prev) => ({ ...prev, brand: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="kor-description">Korean Description:</label>
					<input
						type="text"
						id="kor-description"
						name="kor-description"
						value={item.kor_description}
						onChange={(e) => setItem((prev) => ({ ...prev, kor_description: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="description">Description:</label>
					<input
						type="text"
						id="description"
						name="description"
						value={item.description}
						onChange={(e) => setItem((prev) => ({ ...prev, description: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="size">Size:</label>
					<input
						type="text"
						id="size"
						name="size"
						value={item.size}
						onChange={(e) => setItem((prev) => ({ ...prev, size: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="uom">Base Uom:</label>
					<input type="text" id="uom" name="uom" value={item.uom} onChange={(e) => setItem((prev) => ({ ...prev, uom: e.target.value }))} />
				</div>
				<div>
					<label htmlFor="exd">ExD:</label>
					<input type="text" id="exd" name="exd" value={item.exd} onChange={(e) => setItem((prev) => ({ ...prev, exd: e.target.value }))} />
				</div>
				<div>
					<label htmlFor="unitPrice">Unit Price:</label>
					<input
						type="text"
						id="unitPrice"
						name="unitPrice"
						value={item.unitPrice}
						onChange={(e) => setItem((prev) => ({ ...prev, unitPrice: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="salesToRetail">Sales to Retail Qty:</label>
					<input
						type="text"
						id="salesToRetail"
						name="salesToRetail"
						value={item.salesToRetail}
						onChange={(e) => setItem((prev) => ({ ...prev, salesToRetail: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="priceCode">Price Code:</label>
					<input
						type="text"
						id="priceCode"
						name="priceCode"
						value={item.priceCode}
						onChange={(e) => setItem((prev) => ({ ...prev, priceCode: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="barcodeRetail">Retail Barcode:</label>
					<input
						type="text"
						id="barcodeRetail"
						name="barcodeRetail"
						value={item.barcodeRetail}
						onChange={(e) => setItem((prev) => ({ ...prev, barcodeRetail: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="barcodeNotRetail">Not Retail Barcode:</label>
					<input
						type="text"
						id="barcodeNotRetail"
						name="barcodeNotRetail"
						value={item.barcodeNotRetail}
						onChange={(e) => setItem((prev) => ({ ...prev, barcodeNotRetail: e.target.value }))}
					/>
				</div>
				<div>
					<label htmlFor="category">Category:</label>
					<select
						type="text"
						id="category"
						name="category"
						value={item.category}
						onChange={(e) => setItem((prev) => ({ ...prev, category: e.target.value }))}
					>
						<option value="DRY">DRY</option>
						<option value="REF">REF</option>
						<option value="FRZ">FRZ</option>
					</select>
				</div>
				<button type="button" onClick={() => addItem(item)}>
					Add
				</button>
				<button type="button" onClick={closeModal}>
					Cancel
				</button>
			</form>
			<div className="preview-container">
				<Item item={item} editItem={editItem}></Item>
			</div>
		</div>
	);
}
