import { useEffect, useState, useRef } from "react";
import { loadCsvAsJson } from "./data.jsx";
import JsBarcode from "jsbarcode";
import "./Item.css";

export default function Item({
  itemNum,
  brand,
  description,
  kor_description,
  uom,
  size,
  exd,
  priceCode,
  barcodeRetail,
  barcodeNotRetail,
  category,
}) {
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
    <div className="Item">
      <div className="header">
        <div className="itemnum">{itemNum}</div>
        <div className="kor-description">{kor_description}</div>
      </div>
      <div className="content">
        <div className="left">
          <div className="container-1">
            <div className="description">
              {brand}, {description}
            </div>
          </div>
          <div className="container-2">
            <div className="size">{size}</div>
            <div className="flex-container">
              <div className="uom">{uom}</div>
              <div className="exd">{exd}</div>
              <div className="priceCode">{priceCode}</div>
            </div>
            <div className="barcodeRetail">{barcodeRetail}</div>
          </div>
          <div className="container-3">
            <div className="barcodeNotRetail">{barcodeNotRetail}</div>
            <Barcode value={barcodeRetail}></Barcode>
          </div>
        </div>
        <div className="right">
          <img src={"/" + itemNum + ".jpg"} alt="item" />
          <img
            className="category"
            src={`icon-${category}.jpg`}
            alt="category"
          />
        </div>
      </div>
    </div>
  );
}
