import "../styles/Header.css";

export const Header = ({ score, bestScore }) => {
  return (
    <div className="Header">
      <img src="src/assets/logo.svg" alt="LOGO IMAGE"/>
      <div>CasuallyDreamin's take on The Memory Card Game</div>
      <div>Score: {score}</div>
      <div>Best record: {bestScore}</div>
    </div>
  )
}
