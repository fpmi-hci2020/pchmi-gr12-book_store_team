import React, { Component } from 'react';
import Header from '../common/Header';
import CardsGroup from '../common/CardsGroup';
import Menu from '../common/Menu';

class MainPage extends Component {

    descBigCard = ['Каталог'];
    descThemeCards = ['Популярные', 'Художественная литература', 'Научная литература', 'Проф. литература'];

    //ссылки для перехода на страницы
    linksBigCard = ['/catalog']; //каталог
    linksThemeCards = ['/catalog', '/catalog', '/catalog', '/catalog']; //все переходят на каталог с применением фильтров для книг

    render() {
        return (
            <>
                <Header />
                <div className='main-page-content'>
                    <Menu />
                    <div className='desc-big-card'>
                        <CardsGroup size={'lg'} cards={this.descBigCard} links={this.linksBigCard}/>
                    </div>
                    <div className='desc-filtered-card'>
                        <CardsGroup size={'md'} cards={this.descThemeCards} links={this.linksThemeCards}/>
                    </div>
                </div>
            </>

        )
    }
}

export default MainPage;