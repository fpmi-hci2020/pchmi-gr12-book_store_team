import React, { Component } from "react";

import Header from "../common/Header";
import Menu from "../common/Menu";
import CatalogCardGroup from "../common/CatalogCardGroup";

class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: "",
      titleValue: "",
      authorValue: "",
      genreValue: "",
      purchaseCheckbox: false,
      rentCheckbox: false,
      cards: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
      cardsData: [],
    };
  }

  async fetchBooks(element) {
    fetch(`/api/v1/books/${element.book_id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ cardsData: [...this.state.cardsData, data] });
        return data;
      });
  }

  async componentDidMount() {
    var uid = this.props.currentUserId;
    fetch("/api/v1/favorites")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var result = data.filter((res) => res.user_id === uid);
        result.forEach((element) => this.fetchBooks(element));
      });
  }

  addToCart = async (bookId, bookName) => {
    const response = await fetch("/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          amount: 1,
          user_id: this.props.currentUserId,
          book_id: bookId,
          status: 4,
        },
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      alert(`Книга "${bookName}" добавлена в Корзину.`);
    } else {
      console.log("Can not add book to favorite");
    }
  };

  render() {
    console.log(this.state.cardsData);
    return (
      <>
        <Header />
        <div className="catalog_content">
          <Menu />
          <div className="content">
            {this.state.cardsData && (
              <div className="catalog">
                <CatalogCardGroup
                  cards={this.state.cardsData}
                  addToCart={this.addToCart}
                  withoutIcons
                  buttonText={"ДОБАВИТЬ В КОРЗИНУ"}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default FavoritesPage;
