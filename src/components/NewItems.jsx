import { useState } from "react";
import "../styles/NewItems.css";
import Item from "./Item.jsx";
import { useDataContext } from "./DataProvider.jsx";
import NewItemModal from "./NewItemModal.jsx";

export default function NewItems() {
  const { itemData, barcodeData, loading, error } = useDataContext();
  const [items, setItems] = useState([]);
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
    e.preventDefault();
    setIsOpen(true);
  };
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const addItem = (input) => {
    setIsOpen(false);
    setItems((prevItems) => {
      const index = prevItems.findIndex((iter) => iter.id === input.id);
      if (index !== -1) {
        return [
          ...prevItems.slice(0, index),
          input,
          ...prevItems.slice(index + 1),
        ];
      } else {
        return [...prevItems, input];
      }
    });
  };

  const removeItem = (id) => {
    setItems(items.filter((iter) => iter.id !== id));
  };

  const editItem = (itemID) => {
    const item = items.find((iter) => iter.id === itemID);
    setItem(item);
    setIsOpen(true);
  };

  // Handle loading and error states
  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="NewItems">
      <div>
        <h3>New Items</h3>
        <button onClick={openModal}>Add Item</button>
      </div>
      {isOpen === true && (
        <NewItemModal
          item={item}
          setItem={setItem}
          closeModal={closeModal}
          itemData={itemData}
          barcodeData={barcodeData}
          addItem={addItem}
          //   editItem={editItem}
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
