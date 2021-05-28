import React, { useState } from "react";
import { ICONMAP } from "../../constant/icon-map";
import { Input } from "antd";
import "./icon-gallery.style.scss";

const IconGallery = () => {
  const [iconList, setIconList] = useState(Object.keys(ICONMAP));
  const handleSearch = (value) => {
    if (!value) setIconList(Object.keys(ICONMAP));
    const filteredLIst = Object.keys(ICONMAP).filter((name) => {
      return name.includes(value.toLocaleLowerCase());
    });
    setIconList(filteredLIst);
  };
  const HandleInputChange = (e) => {
    const value = e.target.value;
    if (!value) setIconList(Object.keys(ICONMAP));
    const filteredLIst = Object.keys(ICONMAP).filter((name) => {
      return name.includes(value.toLocaleLowerCase());
    });
    setIconList(filteredLIst);
  };
  return (
    <>
      <div className="icon-gallery-seach">
        <Input.Search
          placeholder="input search value"
          onSearch={handleSearch}
          onChange={HandleInputChange}
        />
      </div>
      <ul className="icon-gallery-wrapper">
        {iconList.map((name) => {
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
    </>
  );
};

export default IconGallery;
