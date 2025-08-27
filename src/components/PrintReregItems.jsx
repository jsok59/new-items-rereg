import Item from "./Item.jsx";
import { useLocation } from "react-router-dom";

export default function PrintReregItems() {
  const location = useLocation();
  const items = location.state?.items || [];
  const orderedItems = items.sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="PrintReregItems">
      <img src="/Reregistrationheader-WEST.jpg" alt="header" />
      <ul>
        {orderedItems.map((item) => (
          <li key={item.id} className="item-container" id={item.id}>
            <Item key={item.id} item={item}></Item>
          </li>
        ))}
      </ul>
    </div>
  );
}
