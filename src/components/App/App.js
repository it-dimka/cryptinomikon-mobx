import React from "react";
import Cryptonomikon from "../../store/cryptonomikon";
import TickerAddForm from "../TickerAddForm/TickerAddForm";
import SearchPanel from "../SearchPanel/SearchPanel";
import TickersList from "../TickersList/TickersList";
import Graph from "../Graph/Graph";
import './App.css';
import {observer} from "mobx-react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.store = new Cryptonomikon();
    }

    componentDidMount() {
        if (localStorage.getItem('appID')) {
            this.store.loadDataToLocalStorage();
        }

        // спросить как быть с промисами чтобы не создавать переменных
        // const foo = this.store.loadAvailableTickers()
        this.store.loadAvailableTickers().then();

        this.updateInterval = setInterval(this.store.downloadingUpdatedTickerPrice, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    render() {
        return (
            <div className="app">
                <TickerAddForm
                    inputValue={this.store.formInputValue}
                    isValid={this.store.isValidTicker}
                    optionsTicker={this.store.availableOptionsTicker}
                    onChange={this.store.changedFormInputValue}
                    onSubmit={this.store.addTicker}
                    onClick={this.store.availableTickerHandler}
                />
                {Boolean(this.store.trackedTickersList.length) &&
                    <SearchPanel
                        inputValue={this.store.searchInputValue}
                        onChange={this.store.changedSearchInputValue}
                    />
                }
                <TickersList
                    trackedTickers={this.store.filteredListOfTickers}
                    selectedTicker={this.store.selectedTicker}
                    onDeleteTicker={this.store.removeTicker}
                    onSelectTicker={this.store.selectTicker}
                />
                {this.store.selectedTicker &&
                    <Graph
                        selectedTicker={this.store.selectedTicker}
                        graphValues={this.store.graph}
                        closeGraph={this.store.closeGraph}
                    />
                }
            </div>
        );
    }
}

export default observer(App);