import { useState, useEffect } from "react";
import "./NewItems.css";
import Item from "./Item.jsx";
import { loadCsvAsJson } from "./data.jsx";

export default function NewItems() {
	const [items, setItems] = useState([]);
	const [isOpen, toggleModal] = useState(false);
	const [itemData, setItemData] = useState([]);
	const [barcodeData, setBarcodeData] = useState([]);

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
	const addItem = (obj, e) => {
		e.preventDefault();
		const hasDuplicate = items.some((item) => item.id === obj.id);
		if (hasDuplicate) {
			alert("The item already exists. Please check your list");
		} else {
			setItems([...items, obj]);
		}

		toggleModal(false);
	};

	const removeItem = (id) => {
		const index = items.findIndex((element) => element.id === id);

		if (index !== -1) {
			items.splice(index, 1);
			console.log(items);
			setItems([...items]);
		}
	};

	return (
		<div className="NewItems">
			<div>
				<h3>New Items</h3>
				<button onClick={openModal}>Add Item</button>
			</div>
			<NewItemModal closeModal={closeModal} isOpen={isOpen} itemData={itemData} barcodeData={barcodeData} addItem={addItem}></NewItemModal>

			<ul>
				{items.map((item) => (
					<li key={item.id} className="item-container" id={item.id}>
						<Item
							key={item.id}
							itemNum={item.id}
							brand={item.brand}
							description={item.description}
							kor_description={item.kor_description}
							uom={item.uom}
							size={item.size}
							exd={item.exd}
							unitPrice={item.unitPrice}
							priceCode={item.priceCode}
							barcodeRetail={item.barcodeRetail}
							barcodeNotRetail={item.barcodeNotRetail}
							category={item.category}
						></Item>
						<button onClick={(e) => removeItem(e.target.parentElement.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

function NewItemModal({ closeModal, isOpen, itemData, barcodeData, addItem }) {
	const [itemNum, setItemNum] = useState("");
	const [description, setDescription] = useState("");
	const [brand, setBrand] = useState("");
	const [kor_description, setKorDescription] = useState("");
	const [uom, setUom] = useState("");
	const [size, setSize] = useState("");
	const [exd, setExd] = useState("");
	const [unitPrice, setUnitPrice] = useState(0);
	const [salesToRetail, setSalesToRetail] = useState(0);
	const [priceCode, setPriceCode] = useState(0);
	const [barcodeRetail, setBarcodeRetail] = useState("0");
	const [barcodeNotRetail, setBarcodeNotRetail] = useState("");
	const [category, setCategory] = useState("");

	function handleItemNum(e) {
		setItemNum(e.target.value);
	}

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
		const item = itemData.find((obj) => obj["No."] === itemNum);

		if (item) {
			setDescription(item["Description"]);
			setBrand(item["Brand"]);
			setKorDescription(item["Description 2"]);
			setUom(item["Base Unit of Measure"]);
			setSize(item["Size Description"]);
			setUnitPrice(item["Unit Price"]);
			setSalesToRetail(item["Sales to Retail Conv. Factor"]);
			setCategory(item["Storage Type"].toUpperCase());
		} else {
			setDescription("");
			setBrand("");
			setKorDescription("");
			setUom("");
			setSize("");
			setUnitPrice("");
			setSalesToRetail("");
			setCategory("");
		}
	}, [itemNum, itemData]);

	useEffect(() => {
		const itemWithRetail = barcodeData.find((obj) => obj["Item No."] === itemNum && obj["Description"].includes("RETAIL"));

		const itemWithoutRetail = barcodeData.find((obj) => obj["Item No."] === itemNum && !obj["Description"].includes("RETAIL"));

		if (itemWithRetail) {
			setBarcodeRetail(itemWithRetail["Reference No."]);
		} else {
			setBarcodeRetail("0");
		}

		if (itemWithoutRetail) {
			setBarcodeNotRetail(itemWithoutRetail["Reference No."]);
		} else {
			setBarcodeNotRetail("");
		}
	}, [itemNum, barcodeData]);

	useEffect(() => {
		if (unitPrice && salesToRetail) {
			setPriceCode(calcPriceCode(unitPrice, salesToRetail));
		} else {
			setPriceCode("");
		}
	}, [unitPrice, salesToRetail]);

	return (
		<div className={isOpen ? "NewItemModal" : "NewItemModal hidden"}>
			<form action="">
				<div>
					<label for="itemNum">Item Number:</label>
					<input type="text" id="itemNum" name="itemNum" onChange={handleItemNum} />
				</div>
				<div>
					<label for="brand">Brand:</label>
					<input type="text" id="brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
				</div>
				<div>
					<label for="kor-description">Korean Description:</label>
					<input type="text" id="kor-description" name="kor-description" value={kor_description} onChange={(e) => setKorDescription(e.target.value)} />
				</div>
				<div>
					<label for="description">Description:</label>
					<input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
				</div>
				<div>
					<label for="size">Size:</label>
					<input type="text" id="size" name="size" value={size} onChange={(e) => setSize(e.target.value)} />
				</div>
				<div>
					<label for="uom">Base Uom:</label>
					<input type="text" id="uom" name="uom" value={uom} onChange={(e) => setUom(e.target.value)} />
				</div>
				<div>
					<label for="exd">ExD:</label>
					<input type="text" id="exd" name="exd" value={exd} onChange={(e) => setExd(e.target.value)} />
				</div>
				<div>
					<label for="unitPrice">Unit Price:</label>
					<input type="text" id="unitPrice" name="unitPrice" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
				</div>
				<div>
					<label for="salesToRetail">Sales to Retail Qty:</label>
					<input type="text" id="salesToRetail" name="salesToRetail" value={salesToRetail} onChange={(e) => setSalesToRetail(e.target.value)} />
				</div>
				<div>
					<label for="priceCode">Price Code:</label>
					<input type="text" id="priceCode" name="priceCode" value={priceCode} onChange={(e) => setPriceCode(e.target.value)} />
				</div>
				<div>
					<label for="barcodeRetail">Retail Barcode:</label>
					<input type="text" id="barcodeRetail" name="barcodeRetail" value={barcodeRetail} onChange={(e) => setBarcodeRetail(e.target.value)} />
				</div>
				<div>
					<label for="barcodeNotRetail">Not Retail Barcode:</label>
					<input type="text" id="barcodeNotRetail" name="barcodeNotRetail" value={barcodeNotRetail} onChange={(e) => setBarcodeNotRetail(e.target.value)} />
				</div>
				<div>
					<label for="category">Category:</label>
					<select type="text" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
						<option value="DRY">DRY</option>
						<option value="REF">REF</option>
						<option value="FRZ">FRZ</option>
					</select>
				</div>
				<button onClick={addItem.bind(null, { id: itemNum, brand, description, kor_description, uom, size, exd, priceCode, barcodeRetail, barcodeNotRetail, category })}>Add</button>
				<button onClick={closeModal}>Cancel</button>
			</form>
			<div className="preview-container">
				<Item
					itemNum={itemNum}
					brand={brand}
					description={description}
					kor_description={kor_description}
					uom={uom}
					size={size}
					exd={exd}
					unitPrice={unitPrice}
					priceCode={priceCode}
					barcodeRetail={barcodeRetail}
					barcodeNotRetail={barcodeNotRetail}
					category={category}
				></Item>
			</div>
		</div>
	);
}
