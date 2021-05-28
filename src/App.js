import IconGallery from "./components/icon-display/icon-gallery.component";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

const fontStep = 1;
const fontSize = [20, 96];
const canvasSize = 96;
const cutSize = 96;

const offscreenCanvas = document.createElement("canvas");
offscreenCanvas.width = canvasSize;
offscreenCanvas.height = canvasSize;
const offscreenCtx = offscreenCanvas.getContext("2d");
// offscreenCtx.textBaseline = "top";

const offscreenCanvas2 = document.createElement("canvas");
offscreenCanvas2.width = cutSize;
offscreenCanvas2.height = cutSize;
const offscreenCtx2 = offscreenCanvas2.getContext("2d");

function App() {
  function createImgs(type, offsetX = 0, offsetY = 0) {
    // const ct = document.getElementById("canvas");
    // const offscreenCtx = ct.getContext("2d");
    const rawList = [];
    const cutList = [];
    // for (let i = fontSize[0]; i <= fontSize[1]; i += fontStep) {
    offscreenCtx.clearRect(0, 0, offscreenCtx.width, offscreenCtx.height);
    offscreenCtx.fillStyle = "#fff";
    offscreenCtx.fillRect(0, 0, canvasSize, canvasSize);
    offscreenCtx.fillStyle = "#000";
    offscreenCtx.font = "14px FontAwesome";
    offscreenCtx.fillText("\uf087", 5, 15);
    // rawList.push(offscreenCanvas.toDataURL("image/png"));
    console.log(
      "🚀 ~ file: App.js ~ line 35 ~ createImgs ~ offscreenCanvas.toDataURL('image/jpeg')",
      offscreenCanvas.toDataURL("image/jpeg")
    );

    // const { x, y, width: w, height: h } = getCutPosition(canvasSize, canvasSize, offscreenCtx.getImageData(0, 0, canvasSize, canvasSize).data, 'white');
    // offscreenCtx2.clearRect(0, 0, cutSize, cutSize);
    // offscreenCtx2.fillStyle = '#fff';
    // offscreenCtx2.fillRect(0, 0, cutSize, cutSize);
    // offscreenCtx2.fillStyle = '#000';
    // offscreenCtx2.drawImage(offscreenCanvas, x, y, w, h, 0, 0, cutSize, cutSize);
    // console.log("🚀 ~ file: App.js ~ line 43 ~ createImgs ~ offscreenCanvas2.toDataURL('image/jpeg')", offscreenCanvas2.toDataURL('image/jpeg'))
    // cutList.push(offscreenCanvas2.toDataURL('image/jpeg'));
    // }

    return { raw: rawList, cut: cutList };
  }

  const handleClick = () => {
    // const ct = document.getElementById("canvas");
    // const ctx = ct.getContext("2d");
    // ctx.clearRect(0, 0, ctx.width, ctx.height);
    // offscreenCtx.fillStyle = "#CCC";
    // ctx.font = `14px 900 FontAwesome`;
    // ctx.fillText("\f083", 0, 0);
    createImgs();
  };

  return (
    <div className="App">
      <header className="App-header">
        <canvas id="canvas" width={canvasSize} height={canvasSize}></canvas>
        <button onClick={handleClick}>generate</button>
        <IconGallery />
      </header>
    </div>
  );
}

export default App;
