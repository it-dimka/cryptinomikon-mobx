import React from "react";
import TickersListItem from "../TickersListItem/TickersListItem";
import './TickersList.css';

class TickersList extends React.Component {
    renderTicker(ticker) {
        return (
            <TickersListItem
                key={ticker.id}
                id={ticker.id}
                name={ticker.name}
                price={ticker.price}
                selectedTicker={this.props.selectedTicker}
                onDelete={this.props.onDeleteTicker}
                onSelect={this.props.onSelectTicker}
            />
        );
    }

    render() {
        const tickersList = this.props.trackedTickers.map(ticker => this.renderTicker(ticker));
        return (
            <ul className="ticker-list">
                {tickersList}
            </ul>
        );
    }
}

export default TickersList;