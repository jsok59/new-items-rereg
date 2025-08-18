import Header from "./Header.jsx";
import NewItems from "./NewItems.jsx";
import ReregistrationItems from "./ReregistrationItems.jsx";
import { DataProvider } from "./DataProvider.jsx";
import "../styles/reset.css";
import "../styles/App.css";

export function App() {
	return (
		<DataProvider>
			<div className="App">
				<Header />
				<NewItems />
				<ReregistrationItems></ReregistrationItems>
			</div>
		</DataProvider>
	);
}
