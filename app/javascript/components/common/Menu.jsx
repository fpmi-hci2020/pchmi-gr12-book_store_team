import React from "react";
import CardsGroup from "./CardsGroup";

const menu = ({ links }) => {
  const descMenuCards = [
    "Каталог",
    "Корзина",
    "Аренда",
    "Вопросы",
    "О компании",
  ];

  const linksMenu = ["/catalog", "/basket", "/rent", "/faq", "/about"];

  return (
    <>
      <div className="desc-menu-card">
        <CardsGroup size={"sm"} cards={descMenuCards} links={linksMenu} />
      </div>
      <hr />
    </>
  );
};

export default menu;
