const path = require("path");
const fs = require("fs");
const original = require("./data/icon.json");

const targetPath = path.resolve(__dirname, "./data/imgs");

//clear data
fs.rmdirSync(targetPath, {
  recursive: true,
});

fs.mkdirSync(path.resolve(__dirname, "./data/imgs"));

fs.mkdirSync(path.resolve(__dirname, "./data/imgs/train"));
fs.mkdirSync(path.resolve(__dirname, "./data/imgs/validation"));
fs.mkdirSync(path.resolve(__dirname, "./data/imgs/test"));

// define ratio of data
const trainPercent = 0.7;
const validationPercent = 0.2;
const testPercent = 0.1;

const dataLen = original[0].data.length;
const testLen = Math.round(dataLen * testPercent);
const validationLen = Math.round(dataLen * validationPercent);
const trainLen = dataLen - testLen - validationLen;

const trainData = [];
const validationData = [];
const testData = [];
original.forEach((icon) => {
  const { name, data } = icon;

  const validationD = [];
  const testD = [];
  for (let i = 0; i < testLen; i++) {
    const index = Math.round((data.length - 1) * Math.random());
    testD.push(data.splice(index, 1)[0]);
  }
  for (let i = 0; i < validationLen; i++) {
    const index = Math.round((data.length - 1) * Math.random());
    validationD.push(data.splice(index, 1)[0]);
  }

  validationData.push({
    name,
    data: validationD,
  });
  testData.push({
    name,
    data: testD,
  });
  trainData.push({
    name,
    data,
  });
});

writeImg(path.join(targetPath, "train"), trainData);
console.log("taining data loaded");
writeImg(path.join(targetPath, "validation"), validationData);
console.log("validation data loaded");
writeImg(path.join(targetPath, "test"), testData);
console.log("test data loaded");

function writeImg(target, data) {
  data.forEach((icon) => {
    const { name, data } = icon;
    fs.mkdirSync(path.join(target, `./${name}`));
    data.forEach((item) => {
      const { url, size } = item;
      const base64Data = url.replace(/^data:image\/\w+;base64,/, "");
      const dataBuffer = Buffer.from(base64Data, "base64");
      // generate picture
      fs.writeFileSync(
        path.join(target, name, `${name}_${size}.jpeg`),
        dataBuffer
      );
    });
  });
}
