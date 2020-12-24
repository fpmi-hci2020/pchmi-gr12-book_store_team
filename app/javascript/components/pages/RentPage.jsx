import React, { Component } from 'react';

import Header from '../common/Header';
import Menu from '../common/Menu';
import Input from '../common/Input';
import Button from '../common/Button';
import BasketCardGroup from '../common/BasketCardGroup';

class RentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            // cards: [1, 2, 3, 4, 5],
            cards: [
                {
                    id: 1,
                    isActive: false,
                },
                {
                    id: 1,
                    isActive: false,
                },
                {
                    id: 1,
                    isActive: false,
                },
                {
                    id: 1,
                    isActive: false,
                },
                {
                    id: 1,
                    isActive: false,
                }
            ],
            cardsData: {
                id: {

                }
            }
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/v1/orders');
        if (response.status == 200) {
            const data = await response.json();
            this.setState({ cardsData: data });
            console.log('Orders: ', data)
        } else {
            console.log('Data loading error')
        }
    }

    render() {
        return (
            <>
                <Header />
                <div className='basket_content'>
                    <Menu />
                    <div className='content'>
                        <div className='left_container'>
                            <div className='orders'>
                                <BasketCardGroup orders={this.state.cards} />
                            </div>
                        </div>
                        <div className='right_container'>
                            <div className='order_list'>
                                <div className='order_list__title_content'>
                                    <h3 className='order_list__header'>Итого:</h3>
                                    <p>0 p.</p>
                                </div>
                                <div className='order_list__title_content'>
                                    <h4 className='order_list__header'>Товары: </h4>
                                    <p>{`0 шт.`}</p>
                                </div>
                                <div className='order_list__title_content'>
                                    <p>Адрес доставки:</p>
                                    <p>г. Минск</p>
                                </div>
                                <div className='order_list__title_content'>
                                    <p>Оплата:</p>
                                    <p>Наличными</p>
                                </div>
                                <Button text={'Арендовать'} type={'button'} classes={'order_list'} />
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default RentPage;