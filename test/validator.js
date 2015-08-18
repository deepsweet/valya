import React from 'react';
import Valya from '../lib/';

@Valya
class Validator extends React.Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}

export default Validator;
