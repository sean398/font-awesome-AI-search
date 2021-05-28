import React from "react";
import { ICONMAP } from "../../constant/icon-map";
import "./icon-gallery.style.scss";

const IconGallery = () => {
  return (
    <ul className="icon-gallery-wrapper">
      {Object.keys(ICONMAP).map((name) => {
        return (
          <li key={name}>
            <div className="icon-wrapper">
              <i className={`fa ${name}`}></i>{" "}
            </div>
            <div className="desc">{name}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default IconGallery;
