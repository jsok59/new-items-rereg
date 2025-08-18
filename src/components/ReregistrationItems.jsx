import { useItemManagement } from "../hooks/useItemManagement.js";
import "../styles/Items.css";
import Item from "./Item.jsx";
import { useDataContext } from "./DataProvider.jsx";
import ReregistrationModal from "./ReregistrationModal.jsx";

export default function ReregistrationItems() {
	const { itemData, barcodeData, loading, error } = useDataContext();
	const { items, item, setItem, isOpen, openModal, closeModal, addItem, removeItem, editItem } = useItemManagement();

	// Handle loading and error states
	if (loading) return <div>Loading data...</div>;
	if (error) return <div>Error loading data: {error.message}</div>;

	return (
		<div className="Items">
			<div>
				<h3>Reregistration Items</h3>
				<button onClick={openModal}>Add Item</button>
			</div>
			{isOpen === true && (
				<ReregistrationModal
					item={item}
					setItem={setItem}
					closeModal={closeModal}
					itemData={itemData}
					barcodeData={barcodeData}
					addItem={addItem}
				></ReregistrationModal>
			)}

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
