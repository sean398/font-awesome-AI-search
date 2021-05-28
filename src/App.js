import IconGallery from "./components/icon-display/icon-gallery.component";
import { Button } from "antd";
import { ICONMAP } from "./constant/icon-map";
import getCutPosition from "./utils/image.utils";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

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

function App() {
  function createImgs(type) {
    const rawList = [];
    const cutList = [];
    for (let i = fontSize[0]; i <= fontSize[1]; i += fontStep) {
      offscreenCtx.clearRect(0, 0, canvasSize, canvasSize);
      offscreenCtx.fillStyle = "#fff";
      offscreenCtx.fillRect(0, 0, canvasSize, canvasSize);
      offscreenCtx.fillStyle = "#000";
      const value = i + "px FontAwesome";
      offscreenCtx.font = value;
      offscreenCtx.fillText(ICONMAP[type], 10, 15);
      rawList.push(offscreenCanvas.toDataURL("image/jpeg"));

      const {
        x,
        y,
        width: w,
        height: h,
      } = getCutPosition(
        canvasSize,
        canvasSize,
        offscreenCtx.getImageData(0, 0, canvasSize, canvasSize).data,
        "white"
      );
      offscreenCtx2.clearRect(0, 0, cutSize, cutSize);
      offscreenCtx2.fillStyle = "#fff";
      offscreenCtx2.fillRect(0, 0, cutSize, cutSize);
      offscreenCtx2.fillStyle = "#000";
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
      cutList.push(offscreenCanvas2.toDataURL("image/jpeg"));
    }

    return { raw: rawList, cut: cutList };
  }

  const handleClick = () => {
    const ret = Object.keys(ICONMAP).map((type, index) => {
      const { cut: cutList } = createImgs(type);
      return {
        name: type,
        data: cutList.map((base64, i) => {
          return {
            url: base64,
            size: fontSize[0] + i * fontStep,
          };
        }),
      };
    });
    const aLink = document.createElement("a");
    const blob = new Blob([JSON.stringify(ret, null, 2)], {
      type: "application/json",
    });
    aLink.download = "icon.json";
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: "center" }}>AI SEARCH DEMO</h1>
      </header>
      <main>
        <IconGallery />
        <Button type="primary" onClick={handleClick}>
          generate
        </Button>
      </main>
    </div>
  );
}

export default App;
