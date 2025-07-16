import { useEffect, useState } from "react";
import "./app.css";

const EMOJIS = ["😂", "😎", "🥳", "🤖", "🐱", "🍕", "🚀", "🎉"];

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]); 
  const [lock, setLock] = useState(false);    

  useEffect(() => {
    const shuffled = shuffle([...EMOJIS, ...EMOJIS]).map((emoji, index) => ({
      id: index,
      emoji,
    }));
    setCards(shuffled);
  }, []);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleClick = (index) => {
    if (lock || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setLock(true);
        setTimeout(() => {
          setFlipped([]);
          setLock(false);
        }, 800);
      }
    }
  };

  const resetGame = () => {
    const shuffled = shuffle([...EMOJIS, ...EMOJIS]).map((emoji, index) => ({
      id: index,
      emoji,
    }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setLock(false);
  };

  return (
    <div className="app">
      <h1>Memory Match Game</h1>
      <div className="grid">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={card.id}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleClick(index)}
            >
              {isFlipped ? card.emoji : "❓"}
            </div>
          );
        })}
      </div>
      <p>Score: {matched.length / 2}</p>
      {matched.length === cards.length && (
        <button className="restart-btn" onClick={resetGame}>
          Play Again 🔁
        </button>
      )}
    </div>
  );
}
