import React from "react";
import './TickersListItem.css';

class TickersListItem extends React.Component {
    render() {
        let extraClass = 'ticker-list__item ';
        if (this.props.selectedTicker?.id === this.props.id) {
            extraClass += 'active';
        }

        return (
            <li className={extraClass}
                onClick={() => this.props.onSelect(this.props.id)}
            >
                <span className="ticker-list__item_title">{this.props.name} - USD</span>
                <span className="ticker-list__item_price">{this.props.price}</span>
                <button
                    className="btn ticker-list__item_btn"
                    onClick={(event) => this.props.onDelete(event, this.props.id)}
                >Удалить
                </button>
            </li>
        );
    }
}

export default TickersListItem;