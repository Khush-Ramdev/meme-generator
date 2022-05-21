import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import UploadForm from "./UploadForm";

const Memegenerator = () => {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [thirdText, setThirdText] = useState("");
  const [fourthText, setFourthText] = useState("");
  const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg");
  const [allMemeImgs, setAllMemeImgs] = useState([]);
  const [boxCount, setBoxCount] = useState(1);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((response) =>
      response.json().then((response) => {
        const { memes } = response.data;
        setAllMemeImgs(memes);
      })
    );
  }, []);

  useEffect(() => {
    imagetocanvas();
  }, [randomImg]);

  const imagetocanvas = () => {
    var c = document.getElementsByClassName("meme-img")[0];
    c.width = c.height = 1600;
    let ctx = c.getContext("2d");
    const make_base = () => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = randomImg;
      image.onload = () => {
        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          c.width,
          c.height
        );
      };
    };
    make_base();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "text0") {
      setFirstText(value);
    } else if (name === "text1") {
      setSecondText(value);
    } else if (name === "text2") {
      setThirdText(value);
    } else {
      setFourthText(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirstText("");
    setSecondText("");
    setThirdText("");
    setFourthText("");
    const randNum = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImg = allMemeImgs[randNum].url;
    const boxCount = allMemeImgs[randNum].box_count;
    if (boxCount > 4) {
      boxCount = 4;
    }
    setBoxCount(boxCount);
    setRandomImg(randMemeImg);
  };
  const nodeRef = React.useRef(null);

  const handleDownload = () => {
    const div = document.getElementsByClassName("meme")[0];
    html2canvas(div).then(function (canvas) {
      let img = canvas.toDataURL(); // by default png
      var link = document.createElement("a");
      link.download = "filename.png";
      link.href = img;
      link.click();
    });
  };

  return (
    <div className="meme-body">
      <form className="meme-form" onSubmit={handleSubmit}>
        {[...Array(boxCount).keys()].map((count) => {
          return (
            <input
              key={count}
              name={"text" + count}
              className="input-form"
              placeholder={
                count === 3
                  ? "4th box"
                  : count === 2
                  ? "3rd box"
                  : count === 1
                  ? "2nd box"
                  : "1st Box"
              }
              onChange={handleChange}
              value={
                count === 3
                  ? fourthText
                  : count === 2
                  ? thirdText
                  : count === 1
                  ? secondText
                  : firstText
              }
              autoComplete="off"
            />
          );
        })}
        <button className="submit">Change</button>
      </form>
      <div className="meme">
        <canvas className="meme-img"> </canvas>
        <Draggable axis="both" nodeRef={nodeRef}>
          <h2 ref={nodeRef} className="text0 handle">
            {firstText}
          </h2>
        </Draggable>
        <Draggable axis="both" nodeRef={nodeRef}>
          <h2 ref={nodeRef} className="text1 handle">
            {secondText}
          </h2>
        </Draggable>
        <Draggable axis="both" nodeRef={nodeRef}>
          <h2 ref={nodeRef} className="text2 handle">
            {thirdText}
          </h2>
        </Draggable>
        <Draggable axis="both" nodeRef={nodeRef}>
          <h2 ref={nodeRef} className="text3 handle">
            {fourthText}
          </h2>
        </Draggable>
      </div>
      <button className="download" onClick={handleDownload}>
        Download
      </button>
      <UploadForm></UploadForm>
    </div>
  );
};

export default Memegenerator;
