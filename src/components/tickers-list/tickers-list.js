import React from "react";
import TickersListItem from "../tickers-list-item/tickers-list-item";
import './tickers-list.css';

class TickersList extends React.Component {
    render() {
        return (
            <ul className="ticker-list">
                <TickersListItem/>
            </ul>
        );
    }
}

export default TickersList;