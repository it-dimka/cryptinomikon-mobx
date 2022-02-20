import {makeAutoObservable} from "mobx";

class Cryptonomikon {
    static id = 1;

    trackedTickersList = [];
    availableTickersList = [];
    graph = [];
    formInputValue = '';
    searchInputValue = '';
    selectedTicker = null;

    constructor() {
        makeAutoObservable(this);
    }

    loadAvailableTickers = async () => {
        if (!this.availableTickersList.length) {
            const response = await fetch('https://min-api.cryptocompare.com/data/all/coinlist?summary=true');
            const data = await response.json();

            this.availableTickersList = Object.keys(data.Data);
        }
    };

    downloadingUpdatedTickerPrice = async () => {
        const API_KEY = '5a12aecee1cde2235ae74f20da99ce4442aa59299bc0cdda271142dc6535a252';
        if (this.trackedTickersList.length) {
            const trackedTickersNames = this.trackedTickersList.map(ticker => ticker.name);
            const response = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${trackedTickersNames}&tsyms=USD&api_key=${API_KEY}`);
            const data = await response.json();

            this.updatePrice(data)
        }
    };

    updatePrice = (data) => {
        this.trackedTickersList = this.trackedTickersList.map(ticker => {
            if (data[ticker.name]?.USD) {
                ticker.price = data[ticker.name].USD > 1 ? data[ticker.name].USD.toFixed(2) : data[ticker.name].USD.toPrecision(2);
                if (ticker.id === this.selectedTicker?.id) {
                    this.graph.push(ticker.price);
                }
            } else {
                ticker.price = 'no data';
            }
            return ticker;
        });
    }

    saveDataToLocalStorage = () => {
        localStorage.setItem('appID', String(Cryptonomikon.id))
        localStorage.setItem('trackedTickers', JSON.stringify(this.trackedTickersList))
    }

    loadDataToLocalStorage = () => {
        Cryptonomikon.id = Number(localStorage.getItem('appID'));
        this.trackedTickersList = JSON.parse(localStorage.getItem('trackedTickers'))
    }

    changedFormInputValue = (event) => {
        this.formInputValue = event.target.value.trim().toUpperCase();
    };

    changedSearchInputValue = (event) => {
        this.searchInputValue = event.target.value.trim().toUpperCase();
    };

    addTicker = (event) => {
        event.preventDefault();
        if (this.isValidTicker.status) {
            const newTicker = {id: Cryptonomikon.id++, name: this.formInputValue, price: 'not price'};
            this.trackedTickersList.push(newTicker);
            this.formInputValue = '';
            this.saveDataToLocalStorage()
        }
    };

    removeTicker = (event, id) => {
        event.stopPropagation();
        this.trackedTickersList = this.trackedTickersList.filter(ticker => ticker.id !== id);
        if (this.selectedTicker?.id === id) {
            this.selectedTicker = null;
        }
        this.saveDataToLocalStorage()
    };

    selectTicker = (id) => {
        this.selectedTicker = this.trackedTickersList.find(ticker => ticker.id === id);
        this.graph = [];
    };

    closeGraph = () => {
        this.selectedTicker = null;
    };

    // Спросить про ошибку (что то про строгий режим), если этот action сделать computed
    availableOptionsTicker = () => {
        if (this.formInputValue !== '') {
            const valid = this.availableTickersList.some(ticker => ticker.startsWith(this.formInputValue))
            if (valid) {
                return this.availableTickersList.filter(ticker => ticker.startsWith(this.formInputValue)).slice(0, 4);
            }
        }
    };

    // Дублирование кода с addTicker
    availableTickerHandler = (event) => {
        this.formInputValue = event.target.textContent
        if (this.isValidTicker.status) {
            const newTicker = {id: Cryptonomikon.id++, name: this.formInputValue, price: 'not price'};
            this.trackedTickersList.push(newTicker);
            this.formInputValue = '';
            this.saveDataToLocalStorage()
        }
    }

    get isRepeatTickerName() {
        return !this.trackedTickersList.map(ticker => ticker.name).includes(this.formInputValue);
    }

    get isAvailableTickerName() {
        if (this.formInputValue.length < 2) {
            return true;
        }
        return this.availableTickersList.includes(this.formInputValue);
    }

    get isValidTicker() {
        if (!this.isRepeatTickerName) {
            return {status: false, message: 'Такой тикер уже добавлен'};
        } else if (!this.isAvailableTickerName) {
            return {status: false, message: 'Тикер отсутствует в базе'};
        } else {
            return {status: true, message: ''};
        }
    }

    get filteredListOfTickers() {
        return this.trackedTickersList.filter(ticker => ticker.name.startsWith(this.searchInputValue));
    }
}

export default Cryptonomikon;