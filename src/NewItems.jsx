import { useState } from "react";
import "./NewItems.css";

export default function NewItems() {
  const [items, setItems] = useState([
    { id: "00020D", name: "Rice" },
    { id: "00030D", name: "Rice2" },
  ]);
  const [isOpen, toggleModal] = useState(false);

  const openModal = () => toggleModal(true);
  const closeModal = () => toggleModal(false);

  if (items.length > 5) {
    setItems(null);
  }

  return (
    <div className="NewItems">
      <div>
        <h3>New Items</h3>
        <button onClick={openModal}>Add Item</button>
      </div>
      <NewItemModal closeModal={closeModal} isOpen={isOpen}></NewItemModal>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>{item.id}</p>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewItemModal({ closeModal, isOpen }) {
  return (
    <div className={isOpen ? "NewItemModal" : "NewItemModal hidden"}>
      <form action="">
        <label for="itemNum">Item Number:</label>
        <input type="text" id="itemNum" name="itemNum" />
        <label for="itemNum">Barcode1:</label>
        <input type="text" id="itemNum" name="itemNum" />
        <label for="itemNum">Description:</label>
        <input type="text" id="itemNum" name="itemNum" />
        <button onClick={closeModal}>Done</button>
      </form>
    </div>
  );
}
