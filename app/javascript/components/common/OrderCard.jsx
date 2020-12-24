import React, { useState } from "react";
import img from 'images/img.jpg'

const OrderCard = ({
  price,
  isActive,
  onClick,
  description = "В качестве значения выступает число из диапазона [0.0; 1.0]. Значение 0 соответствует полной прозрачности элемента, а 1, наоборот — его непрозрачности. Дробные числа вида 0.6 устанавливают полупрозрачность. Допускается писать числа без нуля впереди, вида opacity: .6.",
}) => {
  return (
    <>
      <div className="order-card">
        <img
          className="order-card__image"
          src={img}
          width="100%"
          height="100%"
        />
        <div className="order-card__information">
          <p className="order-card__text order-card__text__title">Название</p>
          <p className="order-card__text order-card__text__author">Автор</p>
          <p className="order-card__text order-card__text__description">
            {description.length > 130
              ? `${description.slice(0, 130)}...`
              : description}
          </p>
        </div>
        <div className="order-card__options">
          <button className="order-card__delete-btn">
            <p className="order-card__delete-btn__times">&#215;</p>
          </button>
          <p className="order-card__text order-card__text__price">{`Цена: ${5}$`}</p>
          {isActive ? (
            <button className="order-card__checkbox" onClick={onClick}>
              &#10004;
            </button>
          ) : (
            <button className="order-card__checkbox" onClick={onClick}></button>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderCard;
