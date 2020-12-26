import React, { Component } from "react";

import Header from "../common/Header";
import Menu from "../common/Menu";

class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      book: {},
      isInCart: false,
      orderId: null,
    };
  }

  fetchData = async (id) => {
    const response = await fetch(`/api/v1/books/${id}`);
    if (response.status === 200) {
      const data = await response.json();
      this.setState({ book: data });
    } else {
      console.log("Data loading error");
    }
  };

  isBookInCart = async (bookId, userId) => {
    const response = await fetch(`/api/v1/orders`);
    if (response.status === 200) {
      const data = await response.json();
      const curentBook = data.filter(
        (order) =>
          order.user_id === +userId &&
          order.book_id === bookId &&
          order.status === "in_cart"
      );
      if (curentBook.length > 0)
        this.setState({ isInCart: true, orderId: curentBook[0].id });
    } else {
      console.log("Data loading error");
    }
  };

  componentDidMount() {
    const id = window.location.href.split("/").reverse()[0];
    this.fetchData(id);
    this.isBookInCart(1, this.props.currentUserId);
    this.setState({ id: id });
  }

  addToCart = async (bookId, bookName) => {
    const order = {
      amount: 1,
      user_id: this.props.currentUserId,
      book_id: bookId,
      status: 4,
    };

    const response = await fetch(`/api/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (response.status == 200) {
      const data = await response.json();
      alert(`Книга "${bookName}" добавлена в Корзину.`);
      this.setState({ isInCart: true });
      window.location.href = "/catalog";
    } else {
      console.log("Data loading error");
    }
  };

  removeFromCart = async (bookName) => {
    const response = await fetch(`/api/v1/orders/${this.state.orderId}`, {
      method: "DELETE",
    });
    if (response.status == 204) {
      alert(`Книга "${bookName}" удалена из Корзины.`);
      this.setState({ isInCart: false });
      window.location.href = "/catalog";
    } else {
      console.log("Data loading error");
    }
  };

  render() {
    const book = this.state.book;
    console.log("order ID", this.state.orderId);
    return (
      <>
        <Header />
        <div className="book_content">
          <Menu />

          <div className="book_box">
            <div className="book_container">
              <div className="book_container__image">
                <img alt="Book" src={book.image_url} height="100%" />
              </div>
              <div className="book_container__info">
                <h1>{book.name}</h1>
                <table className="book_container__info__table">
                  <tr>
                    <td className="book_container__info__table_title">
                      <b>Автор</b>:
                    </td>
                    <td className="book_container__info__table_value">
                      {book.authors &&
                        book.authors.map((author) => `${author.name} `)}
                    </td>
                  </tr>
                  <tr>
                    <td className="book_container__info__table_title">
                      <b>Жанры:</b>
                    </td>
                    <td className="book_container__info__table_value">
                      {book.genres &&
                        book.genres.map((genre) => `${genre.name} `)}
                    </td>
                  </tr>
                  <tr>
                    <td className="book_container__info__table_title">
                      <b>
                        Год <br />
                        публикации:
                      </b>
                    </td>
                    <td className="book_container__info__table_value">
                      {book.publishing_year && book.publishing_year}
                    </td>
                  </tr>
                </table>
                <p>
                  <b>Описание:</b>
                </p>
                <p>{book.description && book.description}</p>
              </div>
            </div>
            <button
              className="add-to-card-button"
              onClick={
                this.state.isInCart
                  ? () => this.removeFromCart(book.name)
                  : () => this.addToCart(book.id, book.name)
              }
            >
              <b>
                {this.state.isInCart
                  ? "УДАЛИТЬ ИЗ КОРЗИНЫ"
                  : "ДОБАВИТЬ В КОРЗИНУ"}
              </b>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default BookPage;
