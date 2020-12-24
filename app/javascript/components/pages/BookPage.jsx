import React, { Component } from 'react';

import Header from '../common/Header';
import Menu from '../common/Menu';

class BookPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            book: {}
        }
    }

    fetchData = async (id) => {
        const response = await fetch(`/api/v1/books/${id}`);
        if (response.status == 200) {
            const data = await response.json();
            this.setState({ book: data });
            console.log('Books: ', data)
        } else {
            console.log('Data loading error')
        }
    }

    componentDidMount() {
        const id = (window.location.href).split('/').reverse()[0];
        this.fetchData(id)
        this.setState({ id: id })
    }

    // createOrder = async () => {
    //     const order = {
    //         amount: ,

    //     }

    //     const response = await fetch(`/api/v1/orders`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     });
    //     if (response.status == 200) {
    //         const data = await response.json();
    //         this.setState({ book: data });
    //         console.log('Books: ', data)
    //     } else {
    //         console.log('Data loading error')
    //     }
    // }

    render() {
        console.log(this.state.id)
        const book = this.state.book;
        return (
            <>
                <Header />
                <div className='book_content'>
                    <Menu />

                    <div className='book_box'>
                        <div className='book_container'>
                            <img className='book_container__image' src={book.image_url} />
                            <div className='book_container__info'>
                                <h1>{book.name}</h1>
                                <table className='book_container__info__table'>
                                    <tr>
                                        <td className='book_container__info__table_title'><b>Автор</b>:</td>
                                        <td className='book_container__info__table_value'>{book.authors && book.authors.map(author => `${author.name} `)}</td>
                                    </tr>
                                    <tr>
                                        <td className='book_container__info__table_title'><b>Жанры:</b></td>
                                        <td className='book_container__info__table_value'>{book.genres && book.genres.map(genre => `${genre.name} `)}</td>
                                    </tr>
                                    <tr>
                                        <td className='book_container__info__table_title'><b>Год <br />публикации:</b></td>
                                        <td className='book_container__info__table_value'>{book.publishing_year && book.publishing_year}</td>
                                    </tr>
                                </table>
                                <p><b>Описание:</b></p>
                                <p>Примечание: В том случае, если чьи-либо выставленные оценки будут «коррелировать» в рамках статистической погрешности с «Рейтингом к экзамену» (см далее) на экзамене можно получить оценку 9 (девять) автоматом.</p>
                            </div>

                        </div>
                        <button className='add-to-card-button' onClick={this.createOrder}><b>ДОБАВИТЬ В КОРЗИНУ</b></button>
                    </div>
                </div>
            </>
        )
    }

}

export default BookPage;