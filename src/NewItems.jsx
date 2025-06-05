import { useState, useEffect } from "react";
import "./NewItems.css";
import Item from "./Item.jsx";
import { loadCsvAsJson } from "./data.jsx";

export default function NewItems() {
  const [items, setItems] = useState([
    { id: "00020D", barcode: "Rice" },
    { id: "00030D", barcode: "Rice2" },
  ]);

  const [isOpen, toggleModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadCsvAsJson().then((json) => setData(json));
  }, []);

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
      <NewItemModal
        closeModal={closeModal}
        isOpen={isOpen}
        data={data}
      ></NewItemModal>

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

function NewItemModal({ closeModal, isOpen, data }) {
  const [itemNum, setItemNum] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [kor_description, setKorDescription] = useState("");
  const [uom, setUom] = useState("");
  const [size, setSize] = useState("");
  const [exd, setExd] = useState("");

  function handleItemNum(e) {
    setItemNum(e.target.value);
  }

  useEffect(() => {
    const item = data.find((obj) => obj["No."] === itemNum);
    console.log(item);
    if (item) {
      setDescription(item["Description"]);
      setBrand(item["Brand"]);
      setKorDescription(item["Description 2"]);
      setUom(item["Base Unit of Measure"]);
      setSize(item["Size Description"]);
    }
  }, [itemNum, data]);
  return (
    <div className={isOpen ? "NewItemModal" : "NewItemModal hidden"}>
      <form action="">
        <div>
          <label for="itemNum">Item Number:</label>
          <input
            type="text"
            id="itemNum"
            name="itemNum"
            onChange={handleItemNum}
          />
        </div>
        <div>
          <label for="itemNum">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div>
          <label for="itemNum">Korean Description:</label>
          <input
            type="text"
            id="kor-description"
            name="kor-description"
            value={kor_description}
            onChange={(e) => setKorDescription(e.target.value)}
          />
        </div>
        <div>
          <label for="itemNum">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label for="itemNum">Size:</label>
          <input
            type="text"
            id="size"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div>
          <label for="itemNum">Base Uom:</label>
          <input
            type="text"
            id="uom"
            name="uom"
            value={uom}
            onChange={(e) => setUom(e.target.value)}
          />
        </div>
        <div>
          <label for="itemNum">ExD:</label>
          <input
            type="text"
            id="exd"
            name="exd"
            value={exd}
            onChange={(e) => setExd(e.target.value)}
          />
        </div>
        <button onClick={closeModal}>Done</button>
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
        ></Item>
      </div>
    </div>
  );
}
