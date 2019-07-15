import React from "react";
import "./style.css";

const ClickItem = props => (
  <div className="clickItem" onClick={() => props.clickCount(props.id)}>
    <div className="img-container">
      <img  src={props.image} />
    </div>
  </div>
);

export default ClickItem;