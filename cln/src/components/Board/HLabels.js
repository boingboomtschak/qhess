import React, { Component } from "react";
import { uuidv4 } from "../../../../lib/qhess";

class HLabels extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="HLabels">
            {this.props.hLabels.map(label => (
                <div className="HLabel" key={uuidv4()}>
                    {label}
                </div>
            ))}
        </div>);
    }
}

export default HLabels;
