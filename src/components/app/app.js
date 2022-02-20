import React from "react";
import TickerAddForm from "../ticker-add-form/ticker-add-form";
import SearchPanel from "../search-panel/search-panel";
import TickersList from "../tickers-list/tickers-list";
import Graph from "../graph/graph";
import './app.css';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <TickerAddForm/>
                <SearchPanel/>
                <TickersList/>
                <Graph/>
            </div>
        );
    }
}

export default App;