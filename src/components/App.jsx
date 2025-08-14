import Header from "./Header.jsx";
import NewItems from "./NewItems.jsx";
import { DataProvider } from "./DataProvider.jsx";
import "../styles/reset.css";
import "../styles/App.css";

export function App() {
  return (
    <DataProvider>
      <div className="App">
        <Header />
        <NewItems />
        {/* <Registration/> */}
      </div>
    </DataProvider>
  );
}
