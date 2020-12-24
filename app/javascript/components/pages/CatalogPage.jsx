import React, { Component } from "react";

import Header from "../common/Header";
import Menu from "../common/Menu";
import Input from "../common/Input";
import Button from "../common/Button";
import CatalogCardGroup from "../common/CatalogCardGroup";

class CatalogPage extends Component {
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

  async componentDidMount() {
    const response = await fetch("/api/v1/books");
    if (response.status == 200) {
      const data = await response.json();
      this.setState({ cardsData: data });
      console.log("Books: ", data);
    } else {
      console.log("Data loading error");
    }
  }

  // addToFavorites = async () => {
  //     const response = await fetch('/api/v1/favorites', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //             favorite: {
  //                 user_id: 0,
  //                 book_id: this.state.cardsData.id
  //             }
  //         })
  //     });
  //     if (response.status == 201) {
  //         const data = await response.json();
  //         console.log('OK', data)
  //     } else {
  //         console.log('Can not add book to favorite')
  //     }
  // }

  titleChangeHandler = (e) => {
    this.setState({ titleValue: e.target.value });
  };

  authorChangeHandler = (e) => {
    this.setState({ authorValue: e.target.value });
  };

  genreChangeHandler = (e) => {
    this.setState({ genreValue: e.target.value });
  };

  render() {
    console.log(this.state.cardsData);
    return (
      <>
        <Header />
        <div className="catalog_content">
          <Menu />
          <div className="content">
            <div className="left_container">
              {this.state.cardsData && (
                <div className="catalog">
                  <CatalogCardGroup
                    cards={this.state.cardsData}
                    addToFavorites={this.addToFavorites}
                  />
                </div>
              )}
            </div>
            <div className="right_container">
              <form className="filter">
                <Input
                  label="Название"
                  type="filter"
                  placeholder={"Название"}
                  value={this.state.titleValue}
                  onChange={(e) => this.titleChangeHandler(e)}
                />
                <Input
                  label="Автор"
                  type="filter"
                  placeholder={"Автор"}
                  value={this.state.authorValue}
                  onChange={(e) => this.authorChangeHandler(e)}
                />
                <Input
                  label="Жанр"
                  type="filter"
                  placeholder={"Жанр"}
                  value={this.state.genreValue}
                  onChange={(e) => this.genreChangeHandler(e)}
                />
                <Button
                  text={"Применить"}
                  classes={"order_list"}
                  type={"submit"}
                />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CatalogPage;
