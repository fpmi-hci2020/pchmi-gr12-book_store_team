import React from "react";
import Card from "./Card";

const descMenuCards = ({ size, cards, links }) => {
  return (
    <>
      {cards.map((card, index) => (
        <Card key={card} size={size} text={card} link={links[index]} />
      ))}
    </>
  );
};

export default descMenuCards;
