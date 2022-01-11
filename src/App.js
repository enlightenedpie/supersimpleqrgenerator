import React from "react";
import QRCode from "react-qr-code";
import "./App.css";

const App = () => {
  const [qrVal, setQRval] = React.useState("https://google.com");
  const inputRef = React.useRef(null);

  const updateCode = (event) => {
    event.preventDefault();
    setQRval(inputRef.current.value || qrVal);
  };

  const saveSVGasPNG = () => {
    const svg = document.getElementById("qrcode");
    if (svg == null) return false;
    let { width, height } = svg.getBoundingClientRect();
    let clonedSVG = svg.cloneNode(true);
    let outerHTML = clonedSVG.outerHTML,
      blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });

    let URL = window.URL || window.webkitURL || window;
    let blobURL = URL.createObjectURL(blob);

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    let image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0, width, height);
      let png = canvas.toDataURL();

      let a = document.createElement("a");
      a.download = encodeURI(qrVal);
      a.href = png;
      a.click();
    };
    image.src = blobURL;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dave's Super Simple QR Code Generator</h1>
        <QRCode
          id="qrcode"
          title="QR code"
          value={qrVal}
          size={512}
          level="H"
        />
        <p>Enter your text to create a new QR code.</p>
        <div className="generator">
          <input
            type="text"
            id="codedata"
            ref={inputRef}
            className="textField"
            placeholder={qrVal}
          />
        </div>
        <div className="generator">
          <div className="generator">
            <label htmlFor="generateButton">First: </label>
            <input
              id="generateButton"
              type="button"
              value="Generate it!"
              className="generateButton"
              onClick={updateCode}
            />
          </div>
          <div className="generator">
            <label htmlFor="downloadButton">Then: </label>
            <input
              id="downloadButton"
              type="button"
              value="Download it!"
              onClick={saveSVGasPNG}
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
