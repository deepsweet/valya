[![npm](https://img.shields.io/npm/v/valya.svg?style=flat-square)](https://www.npmjs.com/package/valya)
[![travis](http://img.shields.io/travis/deepsweet/valya.svg?style=flat-square)](https://travis-ci.org/deepsweet/valya)
[![coverage](http://img.shields.io/coveralls/deepsweet/valya/master.svg?style=flat-square)](https://coveralls.io/r/deepsweet/valya)
[![deps](http://img.shields.io/david/deepsweet/valya.svg?style=flat-square)](https://david-dm.org/deepsweet/valya)

Valya is just [Higher-Order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) that can be used as an [ES7 decorator](https://github.com/wycats/javascript-decorators).

## Install

```
npm i -S valya
```

## Usage

```js
// validator.es6
import React from 'react';
import Valya from 'valya';

@Valya
class Validator extends React.Component {
    static displayName = 'Validator';

    _showError() {
        if (this.props.isValid) {
            return null;
        }

        return React.DOM.span(
            {
                className: 'validator__error',
                key: 'error'
            },
            this.props.validationErrorMessage
        );
    }

    render() {
        return React.DOM.span(
            {
                className: 'validator'
            },
            React.DOM.span(
                {
                    className: 'target',
                    key: 'target'
                },
                this.props.children
            ),
            this._showError()
        );
    }
}

export default Validator;
```

```js
// app.es6
_onInputChange(e) {
    this.setState({
        value: e.target.value
    });
}

render() {
    return Validator(
        {
            value: this.state.value,
            onStart: () => {
                console.log('validation start');
            },
            onEnd: () => {
                console.log('validation end');
            },
            validators: [
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
                }
            ]
        },
        React.dom.input({
            value: this.state.value,
            onChange: ::this._onInputChange
        })
    );
}
```
