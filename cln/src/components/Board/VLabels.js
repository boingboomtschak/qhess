import React, { Component } from "react";
import { uuidv4 } from "../../../../lib/qhess";

class VLabels extends Component {
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
