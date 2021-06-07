import React, { useEffect, useState, useRef } from "react";
import { ICONMAP } from "../../constant/icon-map";
import { Input, Upload, Modal } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";
import * as tf from "@tensorflow/tfjs";
import { labelArray } from "../../constant/icon-map";
import getCutPosition from "../../utils/image.utils";
import "./icon-gallery.style.scss";

const { Dragger } = Upload;

const IconGallery = () => {
  const [iconList, setIconList] = useState(Object.keys(ICONMAP));
  const predictModal = useRef();

  const fontStep = 1;
  const fontSize = [14, 38];
  const canvasSize = 96;
  const cutSize = 96;

  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = canvasSize;
  offscreenCanvas.height = canvasSize;
  const offscreenCtx = offscreenCanvas.getContext("2d");
  offscreenCtx.textBaseline = "top";

  const offscreenCanvas2 = document.createElement("canvas");
  offscreenCanvas2.width = cutSize;
  offscreenCanvas2.height = cutSize;
  const offscreenCtx2 = offscreenCanvas2.getContext("2d");

  useEffect(() => {
    (async () => {
      const model = await tf.loadLayersModel("/model.json");
      console.log("模型加载完成");
      predictModal.current = model;
      // window.iconClassifierModel = model;
      // document.body.addEventListener('paste', onPaste);
    })();
    return () => {
      // document.body.removeEventListener('paste', onPaste);s
    };
  }, []);

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

  const handleUpdateImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsDataURL(file);
  };

  const onReaderLoad = (readerEvt) => {
    // setImgUrl(readerEvt.target.result);
    const img = new Image();
    img.onload = onImgLoad;
    img.setAttribute("crossOrigin", "anonymous");
    img.src = readerEvt.target.result;
  };

  const onImgLoad = async (e) => {
    const { naturalWidth: imgW, naturalHeight: imgH } = e.target;
    offscreenCanvas.width = imgW;
    offscreenCanvas.height = imgH;
    offscreenCtx.clearRect(0, 0, imgW, imgH);
    offscreenCtx.fillStyle = "#fff";
    offscreenCtx.fillRect(0, 0, imgW, imgH);
    offscreenCtx.drawImage(e.target, 0, 0);
    const {
      x,
      y,
      width: w,
      height: h,
    } = getCutPosition(
      imgW,
      imgH,
      offscreenCtx.getImageData(0, 0, imgW, imgH).data,
      "white"
    );
    console.log(x, y, w, h);

    offscreenCtx2.clearRect(0, 0, cutSize, cutSize);
    offscreenCtx2.fillStyle = "#fff";
    offscreenCtx2.fillRect(0, 0, cutSize, cutSize);
    offscreenCtx2.drawImage(
      offscreenCanvas,
      x,
      y,
      w,
      h,
      0,
      0,
      cutSize,
      cutSize
    );

    // setImgUrl(offscreenCanvas2.toDataURL());

    if (predictModal.current) {
      const imgTensor = tf.image
        .resizeBilinear(tf.browser.fromPixels(offscreenCanvas2), [224, 224])
        .reshape([1, 224, 224, 3]);
      const pred = predictModal.current.predict(imgTensor).arraySync()[0];
      console.log("🚀 ~ file: index.jsx ~ line 50 ~ onImgLoad ~ pred", pred);

      const result = pred
        .map((score, i) => ({ score, label: labelArray[i] }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      // const result = await predictModal.current  .predict(offscreenCanvas2);
      // setIcons(result);
      console.log(result);
    }
  };

  return (
    <>
      <div className="icon-gallery-seach">
        <CameraOutlined />
        <input
          title=""
          type="file"
          accept="image/*"
          onChange={handleUpdateImg}
        />
        {/* <Dragger onChange={handleUpdateImg}>
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
        </Dragger> */}
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
