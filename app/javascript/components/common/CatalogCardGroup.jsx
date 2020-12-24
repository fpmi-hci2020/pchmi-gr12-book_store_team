import React from "react";

const catalogCardGroup = ({
  cards,
  withoutIcons,
  buttonText,
  addToFavorites,
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
                          className="catalog_card_image"
                          src={cards[index].image_url}
                          width="100%"
                          height="100%"
                        />
                      </a>
                      <p className="title1">{cards[index].name}</p>
                      <p className="title2">
                        {cards[index].authors[0] &&
                          cards[index].authors[0].name}
                      </p>
                      {!withoutIcons && (
                        <div className="options">
                          <div
                            className="icon icon__star"
                            onClick={addToFavorites}
                          >
                            <i class="fa fa-star" aria-hidden="true"></i>
                          </div>
                          <div className="icon icon__plus">
                            <i
                              class="fa fa-shopping-basket"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div className="icon icon__rent">
                            <p>
                              <b>RENT</b>
                            </p>
                          </div>
                        </div>
                      )}
                      {buttonText && (
                        <button className="return-button">
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
