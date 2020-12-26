import React, { Component } from "react";

import Header from "../common/Header";
import Menu from "../common/Menu";
import Input from "../common/Input";
import Button from "../common/Button";
import CatalogCardGroup from "../common/CatalogCardGroup";

const Genres = ({ options, onChange }) => {
  return (
    <>
      <p className="filter__genres__label">Жанр</p>
      <select size="1" className="filter__genres" onChange={onChange}>
        <option>Выберите жанр</option>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </>
  );
};

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
      catdsToShow: [],
      message: "",
      options: [],
    };
  }

  async componentDidMount() {
    const response = await fetch("/api/v1/books");
    if (response.status === 200) {
      const data = await response.json();
      this.setState({ cardsData: data });
      console.log("Books: ", data);
    } else {
      console.log("Data loading error");
    }

    const genresResponse = await fetch("/api/v1/genres");
    if (genresResponse.status === 200) {
      const data = await genresResponse.json();
      let genres = data.map((genre) => genre.name);
      this.setState({ options: genres });
    } else {
      console.log("Data loading error");
    }
  }

  addToFavorites = async (bookId, bookName) => {
    const response = await fetch("/api/v1/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorite: {
          user_id: this.props.currentUserId,
          book_id: bookId,
        },
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(bookId);
      alert(`Книга "${bookName}" добавлена в Избранное.`);
    } else {
      console.log("Can not add book to favorite");
    }
  };

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

  rent = async (bookId, bookName) => {
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
          status: 5,
        },
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      alert(`Книга "${bookName}" добавлена в Аренду.`);
    } else {
      console.log("Can not add book to favorite");
    }
  };

  titleChangeHandler = (e) => {
    this.setState({ titleValue: e.target.value });
  };

  authorChangeHandler = (e) => {
    this.setState({ authorValue: e.target.value });
  };

  genreChangeHandler = (e) => {
    this.setState({ genreValue: e.target.value });
  };

  submitFilter = async (e) => {
    const { titleValue, authorValue, genreValue } = this.state;
    const response = await fetch(
      `/api/v1/books?by_title=${titleValue}&by_author=${authorValue}&by_genre=${genreValue}`
    );
    if (response.status == 200) {
      const data = await response.json();
      this.setState({ cardsData: data });
      console.log("Books: ", data);
    } else {
      console.log("Data loading error");
    }
  };

  render() {
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
                    addToCart={this.addToCart}
                    rent={this.rent}
                  />
                </div>
              )}
            </div>
            <div className="right_container">
              <form className="filter" onSubmit={(e) => this.submitFilter(e)}>
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
                <Genres
                  options={this.state.options}
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
