export const Card = ({ card, onClick }) => {
  return (
    <div
      onClick={(e) => {
        // Pass the click position relative to the viewport
        const clickX = e.pageX;
        const clickY = e.pageY;
        onClick(card, { clickX, clickY });
      }}
      className="card"
    >
      <img src={card.img} alt="card" />

      {/* Sparkle for correct click */}
      {card.correct && card.clickX && card.clickY && (
        <span
          className="sparkle"
          style={{ left: card.clickX + 'px', top: card.clickY + 'px' }}
        />
      )}

      {/* Shake indicator for wrong click */}
      {card.wrong && card.clickX && card.clickY && (
        <span
          className="shake-indicator"
          style={{ left: card.clickX + 'px', top: card.clickY + 'px' }}
        />
      )}
    </div>
  );
};
