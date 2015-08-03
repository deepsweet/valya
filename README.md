[![npm](https://img.shields.io/npm/v/valya.svg?style=flat-square)](https://www.npmjs.com/package/valya)
[![travis](http://img.shields.io/travis/deepsweet/valya.svg?style=flat-square)](https://travis-ci.org/deepsweet/valya)
[![coverage](http://img.shields.io/coveralls/deepsweet/valya/master.svg?style=flat-square)](https://coveralls.io/r/deepsweet/valya)
[![deps](http://img.shields.io/david/deepsweet/valya.svg?style=flat-square)](https://david-dm.org/deepsweet/valya)

Valya is just a tiny [Higher-Order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) for validation in React that can be used as an [ES7 decorator](https://github.com/wycats/javascript-decorators).

## Install

```
npm i -S valya
```

## Example

### Creating `Validator`

```js
import React from 'react';
import Valya from 'valya';

@Valya
class Validator extends React.Component {
    static displayName = 'Validator';

    _renderError() {
        if (!this.props.enabled || this.props.isValid) {
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
```

Your `Validator` will receive the following props:
* `enabled`
* `isValidating`
* `isValid`
* `validationErrorMessage`

### Usage

```js
_onInputChange(e) {
    this.setState({
        value: e.target.value
    });
}

render () {
    return (
        <Validator
            value={this.state.value}
            onStart={() => {
                console.log('Validation start');
            }}
            onEnd={(isValid, message) => {
                console.log('validation end:', isValid, message);
            }}
            validators={[
                {
                    validator(value, params) {
                        if (value) {
                            return Promise.resolve();
                        }

                        return Promise.reject(params.message);
                    },
                    params: {
                        message: 'Field is required'
                    }
                }
            ]}>
            <div>
                <input type="text" value={this.state.value} onChange={::this._onInputChange} />
            </div>
        </Validator>
    );
}
```

You can pass the following props:
* `enabled <boolean>` – control whether Valya should be enabled (`true` by default)
* `initialValidation` – control whether Valya should validate first right in constructor (`false` by default)
* `value <any>` – current target's value to validate
* `onStart <Function>` – "on validation start" callback
* `onEnd <Function>` – "on validation end" callback
* `validators <Array>` – array of "validators": every `validator` is just a function that must return a `promise`, so Valya doesn't really cares about what is happening inside.
