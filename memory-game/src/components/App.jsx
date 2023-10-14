import { useState, useEffect } from "react";
import "../styles/App.css";

let itemsPressed = [];

function App() {
  const [imageURLs, setImageURLs] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const alert = document.getElementById("alert");

  useEffect(() => {
    const fetchImage = async () => {
      const urls = [
        "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
        "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
        "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
        "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
        "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
        "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
      ];

      try {
        const requests = urls.map((url) =>
          fetch(url, { mode: "cors" }).then((response) => response.json())
        );
        const images = await Promise.all(requests);
        const imageLinks = images.map((imageData) => imageData.cards[0].image);
        setImageURLs(imageLinks);
      } catch (error) {
        console.error("There is an Error!!:", error);
      }
    };
    fetchImage();
  }, []);

  const handleImageClick = async (event) => {
    const att = event.target.getAttribute("src");

    if (itemsPressed.includes(att)) {
      setScore(0);
      if (itemsPressed.length > highScore) {
        setHighScore(itemsPressed.length);
      } else {
        setHighScore(highScore);
      }
      itemsPressed = [];
      alert.style.display = "block";
      setTimeout(() => {
        alert.style.display = "none";
      }, 3000);
    } else {
      setScore(score + 1);
      itemsPressed.unshift(att);
    }

    const newImageURLs = [];

    setTimeout(async () => {
      try {
        const urls = [
          "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
          "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
          "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
          "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
          "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
          "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1",
        ];

        const requests = urls.map((url) =>
          fetch(url, { mode: "cors" }).then((response) => response.json())
        );
        const images = await Promise.all(requests);
        const imageLinks = images.map((imageData) => imageData.cards[0].image);
        newImageURLs.unshift(...imageLinks);
        setImageURLs(newImageURLs);
      } catch (error) {
        console.error("Error fetching new images:", error);
      }
      event.target.classList.remove("card-flip-animation", "card-flipped");
    }, 1000);
  };

  return (
    <div className="game-container">
      <div className="score-screen">
        Current Score: {score} <br />
        Highest Score: {highScore}
      </div>
      <div id="alert">You Lost, Come On Start Over!</div>
      <div className="cards">
        {imageURLs.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="card"
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
