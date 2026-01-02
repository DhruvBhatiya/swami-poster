import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

function App() {
  const posterRef = useRef(null);
  const [userImg, setUserImg] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImg(URL.createObjectURL(file));
    }
  };

  const downloadImage = async () => {
    if (!posterRef.current) return;

    const canvas = await html2canvas(posterRef.current, {
      useCORS: true,
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = "poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={styles.page}>
      <input type="file" accept="image/*" onChange={handleUpload} />

      <div ref={posterRef} style={styles.posterWrapper}>
        <img src="/Swami.png" alt="Poster" style={styles.poster} />

        <div style={styles.photoPlaceholder}>
          {userImg && (
            <img src={userImg} alt="User" style={styles.userImg} />
          )}
        </div>
      </div>

      <button onClick={downloadImage} style={styles.button}>
        Download Image
      </button>
    </div>
  );
}

const styles = {
  page: {
    padding: 20,
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  posterWrapper: {
    position: "relative",
    width: 420,
    margin: "20px auto",
  },
  poster: {
    width: "100%",
    borderRadius: 24,
    display: "block",
  },
  photoPlaceholder: {
    position: "absolute",
    bottom: 168,
    right: 31,
    width: 117,
    height: 140,
    background: "#000",
    borderRadius: 14,
    overflow: "hidden",
  },

  userImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  button: {
    marginTop: 15,
    padding: "10px 20px",
    background: "#c04b12",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default App;
