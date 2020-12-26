import React from "react";
import img from "images/img.jpg";

const catalogCardGroup = ({
  cards,
  withoutIcons,
  buttonText,
  addToFavorites,
  addToCart,
  rent,
  returnBook,
}) => {
  const n = Math.floor(+(cards.length / 3)) + 1;

  return (
    <>
      {Array(n)
        .fill(1)
        .map((row, indexR) => (
          <div className="catalog_row">
            {Array(3)
              .fill(1)
              .map((card, indexC) => {
                if (indexR * 3 + indexC < cards.length) {
                  const index = indexR * 3 + indexC;
                  return (
                    <div key={cards[index].id} className="catalog_card">
                      <a
                        href={`/books/${cards[index].id}`}
                        className="catalog_card_image_container"
                      >
                        <img
                          alt="Book"
                          src={cards[index].image_url}
                          height="100%"
                        />
                      </a>
                      <p className="title1" style={{ paddingLeft: 3 + "px" }}>
                        {cards[index].name && cards[index].name.length > 60
                          ? `${cards[index].name.slice(0, 60)}...`
                          : cards[index].name}
                      </p>
                      <p className="title2">
                        {cards.authors &&
                          cards[index].authors[0] &&
                          cards[index].authors[0].name}
                      </p>
                      {!withoutIcons && (
                        <div className="options">
                          <div
                            className="icon icon__star"
                            onClick={() =>
                              addToFavorites(cards[index].id, cards[index].name)
                            }
                          >
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </div>
                          <div
                            className="icon icon__plus"
                            onClick={() =>
                              addToCart(cards[index].id, cards[index].name)
                            }
                          >
                            {" "}
                            <i
                              className="fa fa-shopping-basket"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div
                            className="icon icon__rent"
                            onClick={() =>
                              rent(cards[index].id, cards[index].name)
                            }
                          >
                            <p>
                              <b>АРЕНДА</b>
                            </p>
                          </div>
                        </div>
                      )}
                      {buttonText && (
                        <button
                          className="return-button"
                          onClick={
                            returnBook
                              ? () =>
                                  returnBook(cards[index].id, cards[index].name)
                              : () =>
                                  addToCart(cards[index].id, cards[index].name)
                          }
                        >
                          <b>{buttonText}</b>
                        </button>
                      )}
                    </div>
                  );
                } else return null;
              })}
          </div>
        ))}
    </>
  );
};

export default catalogCardGroup;
