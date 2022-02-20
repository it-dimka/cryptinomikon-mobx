import React from "react";
import './graph.css';

class Graph extends React.Component {
    minValue() {
        return Math.min(...this.props.graphValues);
    }

    maxValue() {
        return Math.max(...this.props.graphValues);
    }


    renderValues(value, idx) {
        const min = this.minValue();
        const max = this.maxValue();
        let height = null;
        if (min === max) {
            height = '50%'
        } else {
            height = (5 + ((value - min) * 95) / (max -min)) + '%'
        }
        return <div className="graph__block"
                    key={idx}
                    style={{height: height}}
        />
    }

    render() {
        const graphValues = this.props.graphValues.map((value, idx) => this.renderValues(value, idx))

        return (
            <div className="graph">
                <div className="graph__info">
                    <span className="graph__title">{this.props.selectedTicker.name}</span>
                    <button className="btn graph_btn"
                            onClick={this.props.closeGraph}
                    />
                </div>
                <div className="graph__wrapper">
                    {graphValues}
                </div>
            </div>
        );
    }
}

export default Graph;