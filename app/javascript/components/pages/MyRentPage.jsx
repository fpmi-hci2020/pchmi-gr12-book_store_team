import React, { Component } from "react";

import Header from "../common/Header";
import Menu from "../common/Menu";
import Input from "../common/Input";
import Button from "../common/Button";
import CatalogCardGroup from "../common/CatalogCardGroup";

class MyRentPage extends Component {
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
                  withoutIcons
                  buttonText={"ВЕРНУТЬ КНИГУ"}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MyRentPage;
