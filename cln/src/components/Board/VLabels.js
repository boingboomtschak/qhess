import React, { Component } from "react";
import { uuidv4 } from "../../../../lib/qhess";

class VLabels extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="VLabels">
            {this.props.vLabels.map(label => (
                <div className="VLabel" key={uuidv4()}>
                    {label}
                </div>
            ))}
        </div>);
    }
}

export default VLabels;
