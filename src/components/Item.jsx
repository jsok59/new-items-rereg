import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import "../styles/Item.css";

export default function Item({ item, editItem }) {
	function Barcode({ value = "" }) {
		const svgRef = useRef();

		useEffect(() => {
			if (value) {
				JsBarcode(svgRef.current, value, {
					format: "CODE128",
					lineColor: "#000",
					width: 1.2,
					height: 15,
					displayValue: true,
					fontSize: 10,
					margin: 1,
				});
			}
		}, [value]);

		return <svg ref={svgRef}></svg>;
	}
	return (
		<div className="Item" onClick={() => editItem(item.id)}>
			<div className="header">
				<div className="itemnum">{item.id}</div>
				<div className="kor-description">{item.kor_description}</div>
			</div>
			<div className="content">
				<div className="left">
					<div className="container-1">
						<div className="description">
							{item.brand}, {item.description}
						</div>
					</div>
					<div className="container-2">
						<div className="size">{item.size}</div>
						<div className="flex-container">
							<div className="uom">{item.uom}</div>
							<div className="exd">{item.exd}</div>
							<div className="priceCode">{item.priceCode}</div>
						</div>
						<div className="barcodeRetail">{item.barcodeRetail}</div>
					</div>
					<div className="container-3">
						<div className="barcodeNotRetail">{item.barcodeNotRetail}</div>
						<Barcode value={item.barcodeRetail}></Barcode>
					</div>
				</div>
				<div className="right">
					<img src={"/" + item.id + ".jpg"} alt="item" />
					<img className="category" src={`icon-${item.category}.jpg`} alt="category" />
				</div>
			</div>
		</div>
	);
}
