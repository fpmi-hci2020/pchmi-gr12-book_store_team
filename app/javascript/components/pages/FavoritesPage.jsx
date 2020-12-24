import React, { Component } from "react";

import Header from "../common/Header";
import Menu from "../common/Menu";
import Input from "../common/Input";
import Button from "../common/Button";
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

  render() {
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
