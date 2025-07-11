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
