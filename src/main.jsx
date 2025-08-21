import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import "./styles/reset.css";
import { App } from "./components/App.jsx";
import PrintNewItems from "./components/PrintNewItems.jsx";
import PrintReregItems from "./components/PrintReregItems.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "printNewItems",
		element: <PrintNewItems />,
	},
	{
		path: "printReregItems",
		element: <PrintReregItems />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</StrictMode>
);
