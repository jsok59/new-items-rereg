import { useEffect, useState } from "react";
import { loadCsvAsJson } from "./data.jsx";

export default function Item({ itemNum, brand, description, kor_description }) {
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
					</div>
					<img src={"../public/" + itemNum + ".jpg"} alt="item" />
				</div>
			</div>
		</div>
	);
}
