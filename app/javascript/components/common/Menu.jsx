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
  //ссылки для перехода на страницы
  const linksMenu = ["/catalog", "/basket", "/rent", "/", "/"]; //каталог, корзина, аренда, вопросы, о компании

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
