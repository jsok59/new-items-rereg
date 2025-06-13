import { useState, useEffect } from "react";
import "./NewItems.css";
import Item from "./Item.jsx";
import { loadCsvAsJson } from "./data.jsx";

export default function NewItems() {
	const [items, setItems] = useState([]);
	const [isOpen, toggleModal] = useState(false);
	const [itemData, setItemData] = useState([]);
	const [barcodeData, setBarcodeData] = useState([]);
	const [currItem, setCurrItem] = useState({});

	useEffect(() => {
		loadCsvAsJson().then(([items, barcodes]) => {
			setItemData(items);
			setBarcodeData(barcodes);
		});
	}, []);

	const openModal = () => toggleModal(true);
	const closeModal = (e) => {
		e.preventDefault();
		toggleModal(false);
	};
	const addItem = (obj) => {
		toggleModal(false);
		const hasDuplicate = items.some((item) => item.id === obj.id);
		if (hasDuplicate) {
			const index = items.findIndex((element) => element.id === obj.id);
			if (index !== -1) {
				items.splice(index, 1, obj);
				setItems([...items]);
			}
		} else {
			setItems([...items, obj]);
		}
	};

	const removeItem = (id) => {
		const index = items.findIndex((element) => element.id === id);

		if (index !== -1) {
			items.splice(index, 1);
			setItems([...items]);
		}
	};

	const editItem = (item) => {
		setCurrItem(item);
		toggleModal(true);
	};

	return (
		<div className="NewItems">
			<div>
				<h3>New Items</h3>
				<button onClick={openModal}>Add Item</button>
			</div>
			<NewItemModal
				closeModal={closeModal}
				isOpen={isOpen}
				itemData={itemData}
				barcodeData={barcodeData}
				addItem={addItem}
				currItem={currItem}
				editItem={editItem}
			></NewItemModal>

			<ul>
				{items.map((item) => (
					<li key={item.id} className="item-container" id={item.id}>
						<Item key={item.id} item={item} editItem={editItem}></Item>
						<button onClick={(e) => removeItem(e.target.parentElement.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

function NewItemModal({ closeModal, isOpen, itemData, barcodeData, addItem, currItem, editItem }) {
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
					<label for="itemNum">Item Number:</label>
					<input
						type="text"
						id="itemNum"
						name="itemNum"
						value={item.id}
						onChange={(e) => setItem((prev) => ({ ...prev, id: e.target.value }))}
					/>
				</div>
				<div>
					<label for="brand">Brand:</label>
					<input
						type="text"
						id="brand"
						name="brand"
						value={item.brand}
						onChange={(e) => setItem((prev) => ({ ...prev, brand: e.target.value }))}
					/>
				</div>
				<div>
					<label for="kor-description">Korean Description:</label>
					<input
						type="text"
						id="kor-description"
						name="kor-description"
						value={item.kor_description}
						onChange={(e) => setItem((prev) => ({ ...prev, kor_description: e.target.value }))}
					/>
				</div>
				<div>
					<label for="description">Description:</label>
					<input
						type="text"
						id="description"
						name="description"
						value={item.description}
						onChange={(e) => setItem((prev) => ({ ...prev, description: e.target.value }))}
					/>
				</div>
				<div>
					<label for="size">Size:</label>
					<input
						type="text"
						id="size"
						name="size"
						value={item.size}
						onChange={(e) => setItem((prev) => ({ ...prev, size: e.target.value }))}
					/>
				</div>
				<div>
					<label for="uom">Base Uom:</label>
					<input type="text" id="uom" name="uom" value={item.uom} onChange={(e) => setItem((prev) => ({ ...prev, uom: e.target.value }))} />
				</div>
				<div>
					<label for="exd">ExD:</label>
					<input type="text" id="exd" name="exd" value={item.exd} onChange={(e) => setItem((prev) => ({ ...prev, exd: e.target.value }))} />
				</div>
				<div>
					<label for="unitPrice">Unit Price:</label>
					<input
						type="text"
						id="unitPrice"
						name="unitPrice"
						value={item.unitPrice}
						onChange={(e) => setItem((prev) => ({ ...prev, unitPrice: e.target.value }))}
					/>
				</div>
				<div>
					<label for="salesToRetail">Sales to Retail Qty:</label>
					<input
						type="text"
						id="salesToRetail"
						name="salesToRetail"
						value={item.salesToRetail}
						onChange={(e) => setItem((prev) => ({ ...prev, salesToRetail: e.target.value }))}
					/>
				</div>
				<div>
					<label for="priceCode">Price Code:</label>
					<input
						type="text"
						id="priceCode"
						name="priceCode"
						value={item.priceCode}
						onChange={(e) => setItem((prev) => ({ ...prev, priceCode: e.target.value }))}
					/>
				</div>
				<div>
					<label for="barcodeRetail">Retail Barcode:</label>
					<input
						type="text"
						id="barcodeRetail"
						name="barcodeRetail"
						value={item.barcodeRetail}
						onChange={(e) => setItem((prev) => ({ ...prev, barcodeRetail: e.target.value }))}
					/>
				</div>
				<div>
					<label for="barcodeNotRetail">Not Retail Barcode:</label>
					<input
						type="text"
						id="barcodeNotRetail"
						name="barcodeNotRetail"
						value={item.barcodeNotRetail}
						onChange={(e) => setItem((prev) => ({ ...prev, barcodeNotRetail: e.target.value }))}
					/>
				</div>
				<div>
					<label for="category">Category:</label>
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
