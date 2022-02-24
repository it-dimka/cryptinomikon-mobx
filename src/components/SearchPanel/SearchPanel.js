import React from "react";
import './SearchPanel.css';

class SearchPanel extends React.Component {
    render() {
        return (
            <div className="search-panel">
                <hr/>
                <label className="search-panel__label">
                    Поиск тикера:
                    <input
                        className="search-panel__input  ml-1"
                        type="text"
                        placeholder="BTC"
                        value={this.props.inputValue}
                        onChange={this.props.onChange}
                    />
                </label>

                {this.props.inputValue &&
                    <span className="search-panel__info">Все тикеры по фильтру: <span
                        className="errorSpan">{this.props.inputValue}</span></span>
                }

                <hr/>
            </div>
        );
    }
}

export default SearchPanel;