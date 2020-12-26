import React, { Component } from "react";

import Header from "../common/Header";
import Menu from "../common/Menu";
import CatalogCardGroup from "../common/CatalogCardGroup";

class MyRentPage extends Component {

  constructor(props) {
      super(props);
      this.state = {
          cardsData: [],
          orderId: [],
      }
  }

  async componentDidMount() {
      const uid = this.props.currentUserId;
      const response = await fetch('/api/v1/orders');
      if (response.status === 200) {
          const data = await response.json();
          let inCart = data.filter(book => book.status === 'rent' && book.user_id === uid);
          console.log(inCart)
          const cards = [];
          const orderBook = []
          inCart.map(order => { 
              cards.push(order.book); 
              orderBook.push({ orderId: order.id, bookId: order.book.id });
              return
          })
          this.setState({ cardsData: cards, orderId: orderBook});
      } else {
          console.log('Data loading error')
      }
  }

  returnBook = async (bookId, bookName) => {
      const orders = this.state.orderId;
      const order = orders.find(order => order.bookId === bookId)
      const response = await fetch(`/api/v1/orders/${order.orderId}`, {
          method: 'DELETE'
      });
      if (response.status == 204) {
          alert(`Книга "${bookName}" возвращена.`)
          window.location.href = '/rent';
      } else {
          console.log('Data loading error')
      }
  }


  render() {
      console.log(this.state.orderId)
      return (
          <>
              <Header />
              <div className='catalog_content'>
                  <Menu />
                  <div className='content'>
                      {this.state.cardsData &&
                          <div className='catalog'>
                              <CatalogCardGroup cards={this.state.cardsData} withoutIcons buttonText={'ВЕРНУТЬ КНИГУ'} returnBook={this.returnBook} />
                          </div>
                      }
                  </div>
              </div>
          </>

      )
  }
}

export default MyRentPage;
