import React from "react";
import './ticker-add-form.css';

class TickerAddForm extends React.Component {
    render() {
        return (
            <form className="add-form">
                <label className="add-form__label">
                    Тикер
                    <input
                        className="add-form__input"
                        type="text"
                        placeholder="Например BTC"
                    />
                </label>

                <div className="add-form__options-ticker-list"/>


                <span className="errorSpan">Такой тикер уже добавлен</span>

                <button
                    className="btn add-form__button"
                >Добавить
                </button>
            </form>
        );
    }
}

export default TickerAddForm;