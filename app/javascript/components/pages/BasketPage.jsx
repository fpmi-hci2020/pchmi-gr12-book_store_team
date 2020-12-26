import React, { Component } from "react";

import Header from "../common/Header";
import Menu from "../common/Menu";
import Button from "../common/Button";
import BasketCardGroup from "../common/BasketCardGroup";

class BasketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsData: [],
      isInBill: false,
      totalPrice: 0,
      booksCounter: 0,
      address: null,
      bill: [],
      payError: null,
      removeCartError: null,
    };
  }

  getBookById = async (bookId) => {
    const response = await fetch(`/api/v1/books/${bookId}`);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.log("Data loading error");
      return;
    }
  };

  addToBill = async (bookPrice, bookId) => {
    console.log("addToBill", bookPrice);
    const book = await this.getBookById(bookId);
    console.log(book);
    let bill = this.state.bill;
    bill.push(book);
    this.setState((prevState) => {
      return {
        totalPrice: prevState.totalPrice + bookPrice,
        booksCounter: prevState.booksCounter + 1,
        bill: bill,
      };
    });
  };

  removeFromBill = (bookPrice, bookId) => {
    console.log("removeFromBill", bookPrice);
    const bookIndex = this.state.bill.findIndex((book) => book.id === bookId);
    console.log("index", bookIndex);
    let bill = this.state.bill;
    bill.splice(bookIndex);
    this.setState((prevState) => {
      return {
        totalPrice: prevState.totalPrice - bookPrice,
        booksCounter: prevState.booksCounter - 1,
        bill: bill,
      };
    });
  };

  removeFromCart = () => {
    const inCart = this.state.cardsData;
    const bill = this.state.bill;

    const booksToRemove = inCart.filter((book) =>
      bill.filter((billBook) => billBook.id === book.id)
    );
    console.log(booksToRemove);

    let result = [];

    booksToRemove.map(async (order, index) => {
      const response = await fetch(`/api/v1/orders/${order.id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        return result.push(index);
      } else {
        return;
      }
    });

    if (result.length > 0) return true;
    else return false;
  };

  async componentDidMount() {
    const uid = this.props.currentUserId;
    const response = await fetch("/api/v1/orders");
    if (response.status === 200) {
      const data = await response.json();
      let inCart = data.filter(
        (book) => book.status === "in_cart" && book.user_id === uid
      );
      this.setState({ cardsData: inCart });
    } else {
      console.log("Data loading error");
    }

    const userResponse = await fetch(`/api/v1/users/${uid}`);
    if (userResponse.status === 200) {
      const data = await userResponse.json();
      this.setState({ address: data.address });
    } else {
      console.log("Data loading error");
    }
  }

  payForOrder = async () => {
    const bill = this.state.bill;
    bill.map(async (book) => {
      const order = {
        amount: 1,
        user_id: this.props.currentUserId,
        book_id: book.id,
        status: 2,
      };

      const response = await fetch(`/api/v1/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (response.status == 200) {
      } else {
        console.log("Data loading error");
        this.setState({ payError: "Произошла ошибка, попробуйте ещё раз!" });
      }
    });

    this.removeFromCart();
    alert(this.state.payError ? this.state.payError : "Заказ оформлен!");
    window.location.reload();
  };

  render() {
    console.log("bill", this.state.bill);
    console.log(this.state.cardsData);
    return (
      <>
        <Header />
        <div className="basket_content">
          <Menu />
          <div className="content">
            <div className="left_container">
              <div className="orders">
                <BasketCardGroup
                  orders={this.state.cardsData}
                  addToBill={this.addToBill}
                  removeFromBill={this.removeFromBill}
                />
              </div>
            </div>
            <div className="right_container">
              <div className="order_list">
                <div className="order_list__title_content">
                  <h3 className="order_list__header">Итого:</h3>
                  <p>{this.state.totalPrice}</p>
                </div>
                <div className="order_list__title_content">
                  <h4 className="order_list__header">Товары: </h4>
                  <p>{`${this.state.booksCounter} шт.`}</p>
                </div>
                <div className="order_list__title_content">
                  <p>Адрес доставки:</p>
                  <p>{this.state.address}</p>
                </div>
                <div className="order_list__title_content">
                  <p>Оплата:</p>
                  <p>Наличными</p>
                </div>
                <Button
                  text={"Оплатить заказ"}
                  onClick={this.payForOrder}
                  type={"button"}
                  classes={"order_list"}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BasketPage;
