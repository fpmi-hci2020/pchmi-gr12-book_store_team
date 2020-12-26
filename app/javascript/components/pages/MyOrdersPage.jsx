import React, { Component } from "react";

import Header from "../common/Header";
import Menu from "../common/Menu";
import Input from "../common/Input";
import Button from "../common/Button";
import CatalogCardGroup from "../common/CatalogCardGroup";

class MyOrdersPage extends Component {
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
    const uid = this.props.currentUserId;
    const response = await fetch("/api/v1/orders");
    if (response.status === 200) {
      const data = await response.json();
      let inCart = data.filter(
        (book) => book.status === "delivered" && book.user_id === uid
      );
      console.log(inCart);
      const cards = [];
      inCart.map((order) => cards.push(order.book));
      this.setState({ cardsData: cards });
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
                <CatalogCardGroup cards={this.state.cardsData} withoutIcons />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MyOrdersPage;
