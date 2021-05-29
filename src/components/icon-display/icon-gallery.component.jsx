import React, { useState } from "react";
import { ICONMAP } from "../../constant/icon-map";
import { Input } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./icon-gallery.style.scss";

const { Dragger } = Upload;

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

  const onReaderLoad = (readerEvt) => {
    // setImgUrl(readerEvt.target.result);
    const img = new Image();
    // img.onload = onImgLoad;
    img.setAttribute("crossOrigin", "anonymous");
    img.src = readerEvt.target.result;
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsDataURL(file);
  };

  const handleUpdateImg = () => {};

  return (
    <>
      <div className="icon-gallery-seach">
        <CameraOutlined onClick={handleUpdateImg} />
        <Dragger>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
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
