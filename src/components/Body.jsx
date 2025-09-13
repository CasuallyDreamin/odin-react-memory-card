import { useEffect, useState } from 'react';
import { Card } from './Card';
import { makeCard } from '../helpers/CardClass';
import '../styles/Body.css';

export const Body = ({ score, setScore, bestScore, setBestScore }) => {
  const [cards, setCards] = useState([]);
  const [numCards, setNumCards] = useState(12);
  const [gameWon, setGameWon] = useState(false);
  const [shakeGrid, setShakeGrid] = useState(false); // New state

  const loadCards = async (count) => {
    try {
      const res = await fetch(`https://nekos.best/api/v2/neko?amount=${count}`);
      const data = await res.json();
      if (!data.results || data.results.length < count) throw new Error("Failed to load cards");

      const cardObjs = data.results.map((img, idx) => makeCard(idx, img.url));
      setCards(cardObjs);
    } catch (err) {
      console.error("Error loading cards:", err);
    }
  };

  useEffect(() => {
    loadCards(numCards);
  }, [numCards]);

  const shuffleCards = () => setCards(prev => [...prev].sort(() => Math.random() - 0.5));

  const handleCardClick = (clickedCard) => {
    let alreadyClicked = false;

    const updatedCards = cards.map(card => {
      if (card.id === clickedCard.id) {
        if (card.clicked) alreadyClicked = true;
        return { ...card, clicked: true };
      }
      return card;
    });

    if (alreadyClicked) {
      setScore(0);
      setCards(prev => prev.map(c => ({ ...c, clicked: false })));

      // Trigger grid shake
      setShakeGrid(true);
      setTimeout(() => setShakeGrid(false), 300);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);

      // Check if all clicked
      const allClicked = updatedCards.every(c => c.clicked);
      if (allClicked) {
        if (numCards >= 24) setGameWon(true);
        else {
          setNumCards(prev => Math.min(prev + 4, 24));
          setCards(updatedCards.map(c => ({ ...c, clicked: false })));
        }
      } else {
        setCards(updatedCards);
      }
    }

    shuffleCards();
  };

  const newGame = () => {
    setScore(0);
    setNumCards(12);
    setCards([]);
    setGameWon(false);
  };

  return (
    <section className={`card-grid ${shakeGrid ? 'shake' : ''}`}>
      {gameWon && (
        <div className="congratulations">
          🎉 Congratulations! You beat all 24 cards! 🎉
          <button onClick={newGame}>Play Again</button>
        </div>
      )}

      {!gameWon && cards.map(card => (
        <Card key={card.id} card={card} onClick={handleCardClick} />
      ))}
    </section>
  );
};
