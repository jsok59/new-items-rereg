import { useState } from "react";

function useItemManagement(initialItems = []) {
	const [items, setItems] = useState(initialItems);
	const [isOpen, setIsOpen] = useState(false);
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
		category: "DRY",
	});

	const openModal = (e) => {
		e?.preventDefault();
		setIsOpen(true);
		// Reset item to default values
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
			category: "DRY",
		});
	};

	const closeModal = (e) => {
		e?.preventDefault();
		setIsOpen(false);
	};

	const addItem = (input) => {
		setIsOpen(false);
		setItems((prevItems) => {
			const index = prevItems.findIndex((iter) => iter.id === input.id);
			if (index !== -1) {
				// Replace existing item
				return [...prevItems.slice(0, index), input, ...prevItems.slice(index + 1)];
			} else {
				// Add new item
				return [...prevItems, input];
			}
		});
	};

	const removeItem = (id) => {
		setItems(items.filter((iter) => iter.id !== id));
	};

	const editItem = (itemID) => {
		const foundItem = items.find((iter) => iter.id === itemID);
		setItem(foundItem);
		setIsOpen(true);
	};

	return {
		items,
		setItems,
		item,
		setItem,
		isOpen,
		openModal,
		closeModal,
		addItem,
		removeItem,
		editItem,
	};
}

export { useItemManagement };
