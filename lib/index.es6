import React from 'react';

export default class extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            inProgress: false,
            isValid: true,
            errorMessage: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                inProgress: true
            }, () => {
                this._validate(nextProps.value);
            });
        }
    }

    _callOnStart() {
        if ('onStart' in this.props) {
            this.props.onStart();
        }
    }

    _callOnEnd() {
        if ('onEnd' in this.props) {
            this.props.onEnd(this.state.isValid, this.state.errorMessage);
        }
    }

    _onResolve(value) {
        if (value === this.props.value) {
            this.setState({
                isValid: true,
                inProgress: false,
                errorMessage: null
            }, this._callOnEnd);
        }
    }

    _onCatch(value, message) {
        if (value === this.props.value) {
            this.setState({
                isValid: false,
                inProgress: false,
                errorMessage: message
            }, this._callOnEnd);
        }
    }

    _validate(value) {
        this._callOnStart();

        Promise
            .all(
                this.props.validators.map(validator => {
                    return validator.validator(value, validator.params);
                })
            )
            .then(
                this._onResolve.bind(this, value),
                this._onCatch.bind(this, value)
            );
    }

    _showError() {
        if (this.state.isValid) {
            return null;
        }

        return (
            <span className="valya__error">{this.state.errorMessage}</span>
        );
    }

    render() {
        return (
            <span className="valya">
                <span className="valya__target">{this.props.children}</span>
                {this._showError()}
            </span>
        );
    }
}
