import React from "react";
import backOfCard from "./back.png";
import useFlip from "./hooks/useFlip";
import "./PlayingCard.css"

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {

  const [isFacingUp, flipCard] = useFlip();

  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={flipCard}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
