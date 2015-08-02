import React from 'react';
import Valya from '../../../build/index';

@Valya
class Validator extends React.Component {
    static displayName = 'Validator';

    _renderError() {
        if (this.props.isValid) {
          return null;
        }

        return (
            <span className="validator__error" key="error">
                {this.props.validationErrorMessage}
            </span>
        );
    }

    render () {
        return (
            <span className="validator">
                <span className="validator__target" key="target">
                    {this.props.children}
                </span>
                {this._renderError()}
            </span>
        );
    }
}

class Simple extends React.Component {
    static displayName = 'Simple';

    constructor (props) {
        super(props);

        this.state = {
            value: 'Hello world'
        };
    }

    _onInputChange (e) {
        this.setState({value: e.target.value});
    }

    validators () {
        return [
            {
                validator: (value, params) => {
                    if (value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(params.message);
                },
                params: {
                    message: 'Field is required'
                }
            },
            {
                validator: (value, params) => {
                    if (value && value.startsWith('Hello')) {
                        return Promise.resolve();
                    }

                    return Promise.reject(params.message);
                },
                params: {
                    message: 'Your message must start with Hello'
                }
            }
        ];
    }

    onStart () {
        console.log('Validation start');
    }

    onEnd (isValid, message) {
        console.log('validation end:', isValid, message);
    }

    render () {
        return (
            <Validator
                value={this.state.value}
                onStart={this.props.onStart || ::this.onStart}
                onEnd={this.props.onEnd || ::this.onEnd}
                validators={this.props.validators || this.validators()}>
                <div>
                    <input type="text" value={this.state.value} onChange={::this._onInputChange} />
                </div>
            </Validator>
        );
    }
}

if (!global) {
    const mountNode = document.querySelector('.page');
    React.render(<Simple />, mountNode);
}

export default { Simple, Validator };
