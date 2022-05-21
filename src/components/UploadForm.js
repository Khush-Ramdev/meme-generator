import { useEffect, useState } from "react";
import ReactModal from "react-modal";

const UploadForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [src, setSrc] = useState("");

  const onFileChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    // console.log(reader);
    reader.onload = () => {
      // console.log(reader.result);
      setSrc(reader.result);
      // console.log(src);
    };
    var url = reader.readAsDataURL(file);
  };

  useEffect(() => {
    imagetocanvas();
  }, [src]);

  const imagetocanvas = () => {
    var c = document.getElementsByClassName("meme-img")[0];
    c.width = c.height = 1600;
    let ctx = c.getContext("2d");
    const make_base = () => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
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
    setModalOpen(false);
    setSrc("");
  };

  return (
    <div className="uploadform">
      <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        upload
      </button>
      <ReactModal
        onRequestClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 1020,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            padding: "0.5rem 1rem",
            inset: 0,
            background: "black",
            width: "60vw",
            height: "10vh",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "calc(100vh - 2rem)",
            overflowY: "auto",
            position: "relative",
            border: "2px solid #ccc",
            borderRadius: "0.3rem",
          },
        }}
      >
        <h2 className="headingupload">Upload Image</h2>
        <input
          type="file"
          accept=".gif,.jpg,.jpeg,.png"
          onChange={onFileChange}
        ></input>
        <button
          className="close"
          onClick={() => {
            setModalOpen(false);
            setSrc("");
          }}
        >
          X
        </button>
      </ReactModal>
    </div>
  );
};

export default UploadForm;
