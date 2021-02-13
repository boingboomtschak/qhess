import React, { Component } from 'react';

class VLabels extends Component {
    render() {
        return (<div className="VLabels">
            {this.props.vLabels.map(label => (
                <div className="VLabel">
                    {label}
                </div>
            ))}
        </div>);
    }
}

export default VLabels;
