import React from "react";
import { generalStyle } from "../styles";

export default function Box(props) {
  return (
    <div className={generalStyle.box}>
      <p>{props.conv}</p>
      <div>
        <select name="" id="">
          <option value="1">AVI</option>
          <option value="2">MP4</option>
          <option value="3">OGV</option>
          <option value="4">MPEG</option>
          <option value="5">MOV</option>
        </select>
        <button className={generalStyle.button}>Delete</button>
      </div>
    </div>
  );
}
