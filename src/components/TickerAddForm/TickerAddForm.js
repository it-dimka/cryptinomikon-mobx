import React from "react";
import './TickerAddForm.css';

class TickerAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        this.inputRef.current.focus()
    }

    isValidOptionsTicker() {
        return Boolean(this.props.optionsTicker());
    }

    renderOptionsTicker() {
        return this.props.optionsTicker().map(ticker => <span className="add-form__options-ticker-list_item"
                                                              key={ticker}
                                                              onClick={(event) => this.props.onClick(event)}
        >{ticker}</span>);
    }

    render() {
        return (
            <form className="add-form"
                  onSubmit={this.props.onSubmit}
            >
                <label className="add-form__label">
                    Тикер
                    <input
                        className="add-form__input"
                        type="text"
                        placeholder="Например BTC"
                        ref={this.inputRef}
                        value={this.props.inputValue}
                        onChange={this.props.onChange}
                    />
                </label>

                {this.isValidOptionsTicker() &&
                    <div className="add-form__options-ticker-list">
                        {this.renderOptionsTicker()}
                    </div>

                }

                {!this.props.isValid.status &&
                    <span className="errorSpan">{this.props.isValid.message}</span>
                }

                <button
                    className="btn add-form__button"
                >Добавить
                </button>
            </form>
        );
    }
}

export default TickerAddForm;