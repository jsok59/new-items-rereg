import { useItemManagement } from "../hooks/useItemManagement.js";
import "../styles/Items.css";
import Item from "./Item.jsx";
import { useDataContext } from "./DataProvider.jsx";
import NewItemModal from "./NewItemModal.jsx";
import { Link } from "react-router-dom";

export default function NewItems() {
  const { itemData, barcodeData, loading, error } = useDataContext();
  const {
    items,
    item,
    setItem,
    isOpen,
    openModal,
    closeModal,
    addItem,
    removeItem,
    editItem,
  } = useItemManagement();

  // Handle loading and error states
  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="Items">
      <div>
        <h3>New Items</h3>
        <button onClick={openModal}>Add Item</button>
        <button>
          <Link to="PrintNewItems">Print</Link>
        </button>
      </div>
      {isOpen === true && (
        <NewItemModal
          item={item}
          setItem={setItem}
          closeModal={closeModal}
          itemData={itemData}
          barcodeData={barcodeData}
          addItem={addItem}
        ></NewItemModal>
      )}

      <ul>
        {items.map((item) => (
          <li key={item.id} className="item-container" id={item.id}>
            <Item key={item.id} item={item} editItem={editItem}></Item>
            <button onClick={(e) => removeItem(e.target.parentElement.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
