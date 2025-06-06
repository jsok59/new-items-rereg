import { useEffect, useState } from "react";
import { loadCsvAsJson } from "./data.jsx";

export default function Item({ itemNum, brand, description, kor_description, uom, size, exd, priceCode }) {
	return (
		<div className="Item">
			<div className="header">
				<div className="itemnum">{itemNum}</div>
				<div className="kor-description">{kor_description}</div>
			</div>
			<div className="content">
				<div className="top">
					<div className="left">
						<div className="description">
							{brand}, {description}
						</div>
						<div className="size">{size}</div>
						<div className="flex-container">
							<div className="uom">{uom}</div>
							<div className="exd">{exd}</div>
							<div className="priceCode">{priceCode}</div>
						</div>
					</div>
					<img src={"../public/" + itemNum + ".jpg"} alt="item" />
				</div>
			</div>
		</div>
	);
}
