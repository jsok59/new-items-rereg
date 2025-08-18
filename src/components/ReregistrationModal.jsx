import { useEffect } from "react";
import "../styles/ItemModal.css";
import Item from "./Item.jsx";

export default function ReregistrationModal({ item, setItem, closeModal, itemData, barcodeData, addItem, editItem }) {
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
		if (item.unitPrice && item.salesToRetail) {
			const newPriceCode = calcPriceCode(item.unitPrice, item.salesToRetail);
			// Prevent unnecessary updates if the value didn't change
			if (item.priceCode !== newPriceCode) {
				setItem((prev) => ({
					...prev,
					priceCode: newPriceCode,
				}));
			}
		}
	}, [item.unitPrice, item.salesToRetail, item.priceCode, setItem]);

	function handleChange(e) {
		setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	function handleFindItem(e) {
		e.preventDefault();
		const itemInput = itemData.find((iter) => iter["No."] === item.id);

		if (!itemInput) {
			alert("Item not found in BC data. Load the most recent data");
			return;
		}
		const itemWithRetail = barcodeData.find(
			(element) => element["Item No."] === item.id && element["Reference Type"] === "Bar Code" && element["Description"].includes("RETAIL")
		);
		const itemWithoutRetail = barcodeData.find(
			(element) => element["Item No."] === item.id && element["Reference Type"] === "Bar Code" && !element["Description"].includes("RETAIL")
		);
		console.log(barcodeData);
		const itemBarcode = barcodeData.find((iter) => iter["Item No."] === item.id);
		console.log(itemBarcode);
		if (itemInput) {
			setItem((prev) => ({
				...prev,
				id: itemInput["No."] || "",
				description: itemInput["Description"] || "",
				brand: itemInput["Brand"] || "",
				kor_description: itemInput["Description 2"] || "",
				uom: itemInput["Base Unit of Measure"] || "",
				size: itemInput["Size Description"] || "",
				unitPrice: itemInput["Unit Price"] || 0,
				salesToRetail: itemInput["Sales to Retail Conv. Factor"] || 1,
				barcodeRetail: itemWithRetail?.["Reference No."] || "",
				barcodeNotRetail: itemWithoutRetail?.["Reference No."] || "",
				category: itemInput["Storage Type"].toUpperCase(),
			}));
		}
	}

	return (
		<div className="ItemModal">
			<h1>Registration Items</h1>
			<div className="bot-container">
				<form action="">
					<div>
						<label htmlFor="id">Item Number:</label>
						<input type="text" id="id" name="id" value={item.id} onChange={handleChange} />
					</div>
					<button type="button" onClick={handleFindItem}>
						Fill Item from BC data
					</button>
					<div>
						<label htmlFor="brand">Brand:</label>
						<input type="text" id="brand" name="brand" value={item.brand} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="kor_description">Korean Description:</label>
						<input type="text" id="kor_description" name="kor_description" value={item.kor_description} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="description">Description:</label>
						<input type="text" id="description" name="description" value={item.description} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="size">Size:</label>
						<input type="text" id="size" name="size" value={item.size} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="uom">Base Uom:</label>
						<input type="text" id="uom" name="uom" value={item.uom} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="exd">ExD:</label>
						<input type="text" id="exd" name="exd" value={item.exd} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="unitPrice">Unit Price:</label>
						<input type="number" id="unitPrice" name="unitPrice" value={item.unitPrice} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="salesToRetail">Sales to Retail Qty:</label>
						<input type="number" id="salesToRetail" name="salesToRetail" value={item.salesToRetail} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="priceCode">Price Code:</label>
						<input type="text" id="priceCode" name="priceCode" value={item.priceCode} readOnly />
					</div>
					<div>
						<label htmlFor="barcodeRetail">Retail Barcode:</label>
						<input type="text" id="barcodeRetail" name="barcodeRetail" value={item.barcodeRetail} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="barcodeNotRetail">Not Retail Barcode:</label>
						<input type="text" id="barcodeNotRetail" name="barcodeNotRetail" value={item.barcodeNotRetail} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="category">Category:</label>
						<select type="text" id="category" name="category" value={item.category} onChange={handleChange}>
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
		</div>
	);
}
