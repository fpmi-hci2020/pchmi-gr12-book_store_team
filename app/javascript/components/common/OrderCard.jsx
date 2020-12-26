import img from "images/img.jpg";
import React, { useState } from "react";

const OrderCard = ({ order, orderId, addToBill, removeFromBill }) => {
  const [book, setBook] = useState(order);
  const [isActive, setIsActive] = useState(false);

  const removeFromCart = async (bookName) => {
    const response = await fetch(`/api/v1/orders/${orderId}`, {
      method: "DELETE",
    });
    if (response.status == 204) {
      alert(`Книга "${bookName}" удалена.`);
      window.location.href = "/basket";
    } else {
      console.log("Data loading error");
    }
  };

  const onAddRemoveToBill = () => {
    isActive
      ? removeFromBill(book.price, book.id)
      : addToBill(book.price, book.id);
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="order-card">
        <div
          className="order-card__image"
          onClick={() => (window.location.href = `/catalog/${book.id}`)}
        >
          <img
            alt="Book"
            src={book.image_url && book.image_url}
            height="100%"
          />
        </div>

        <div className="order-card__information">
          <p className="order-card__text order-card__text__title">
            {book.name && book.name}
          </p>
          <p className="order-card__text order-card__text__author">
            {book.authors &&
              book.authors.map((author) => `${book.author.name} `)}
          </p>
          <p className="order-card__text order-card__text__description">
            {book.description && book.description.length > 130
              ? `${book.description.slice(0, 130)}...`
              : book.description}
          </p>
        </div>
        <div className="order-card__options">
          <button
            className="order-card__delete-btn"
            onClick={() => removeFromCart(book.name)}
          >
            <p className="order-card__delete-btn__times">&#215;</p>
          </button>
          <p className="order-card__text order-card__text__price">{`Цена: ${ book.price && book.price } руб.`}</p>
          {isActive ? (
            <button
              className="order-card__checkbox"
              onClick={onAddRemoveToBill}
            >
              &#10004;
            </button>
          ) : (
            <button
              className="order-card__checkbox"
              onClick={onAddRemoveToBill}
            ></button>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderCard;
