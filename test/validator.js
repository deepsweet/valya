import React from 'react';
import Valya from '../lib/';

class Validator extends React.Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}

export default Valya(Validator);
