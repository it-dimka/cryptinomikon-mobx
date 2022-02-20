import React from "react";
import './graph.css';

class Graph extends React.Component {
    render() {
        return (
            <div className="graph">
                <div className="graph__info">
                    <span className="graph__title">Doge</span>
                    <button className="btn graph_btn"/>
                </div>
                <div className="graph__wrapper">
                    <div className="graph__block"  style={{height: '50%'}}/>
                </div>
            </div>
        );
    }
}

export default Graph;