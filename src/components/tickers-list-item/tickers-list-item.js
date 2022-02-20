import React from "react";
import './tickers-list-item.css';

class TickersListItem extends React.Component {
    render() {
        // let extraClass = 'ticker-list__item ';
        
        return (
            <li className="ticker-list__item">
                <span className="ticker-list__item_title"> - USD</span>
                <span className="ticker-list__item_price">-</span>
                <button
                    className="btn ticker-list__item_btn"
                >Удалить</button>
            </li>
        );
    }
}

export default TickersListItem;