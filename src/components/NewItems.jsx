import { useState, useEffect } from "react";
import "../styles/NewItems.css";
import Item from "./Item.jsx";
import { loadCsvAsJson } from "./data.jsx";
import NewItemModal from "./NewItemModal.jsx";

export default function NewItems() {
	const [items, setItems] = useState([]);
	const [isOpen, toggleModal] = useState(false);
	const [itemData, setItemData] = useState([]);
	const [barcodeData, setBarcodeData] = useState([]);
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
		loadCsvAsJson().then(([items, barcodes]) => {
			setItemData(items);
			setBarcodeData(barcodes);
		});
	}, []);

	const openModal = () => {
		toggleModal(true);
		setItem({
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
	};
	const closeModal = (e) => {
		e.preventDefault();
		toggleModal(false);
	};
	const addItem = (input) => {
		toggleModal(false);
		setItems((prevItems) => {
			const index = prevItems.find((iter) => iter.id === input.id);
			if (index === -1) {
				return [...prevItems.slice(0, index), input, ...prevItems.slice(index + 1)];
			} else {
				return [...prevItems, input];
			}
		});
	};

	const removeItem = (id) => {
		setItems(items.filter((iter) => iter.id !== id));
	};

	const editItem = (item) => {
		setItem(item);
		toggleModal(true);
	};

	return (
		<div className="NewItems">
			<div>
				<h3>New Items</h3>
				<button onClick={openModal}>Add Item</button>
			</div>
			<NewItemModal
				item={item}
				setItem={setItem}
				closeModal={closeModal}
				isOpen={isOpen}
				itemData={itemData}
				barcodeData={barcodeData}
				addItem={addItem}
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
