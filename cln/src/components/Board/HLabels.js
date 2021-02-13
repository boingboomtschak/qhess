import React, { Component } from 'react';

class HLabels extends Component {
    render() {
        return (<div className="HLabels">
            {this.props.hLabels.map(label => (
                <div className="HLabel">
                    {label}
                </div>
            ))}
        </div>);
    }
}

export default HLabels;
