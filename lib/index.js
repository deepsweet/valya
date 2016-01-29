import React from 'react';

export default Base => {
    return class extends React.Component {
        static displayName = 'Valya';
        static defaultProps = {
            shouldValidate: true,
            initialValidation: false
        };
        static propTypes = {
            value: React.PropTypes.any,
            validators: React.PropTypes.array.isRequired,
            shouldValidate: React.PropTypes.bool,
            initialValidation: React.PropTypes.bool,
            onStart: React.PropTypes.func,
            onEnd: React.PropTypes.func.isRequired
        };

        constructor(props, context) {
            super(props, context);

            this.state = {
                isValidating: props.shouldValidate && props.initialValidation,
                isValid: true,
                validationMessage: null
            };
        }

        componentWillMount() {
            if (this.state.isValidating) {
                this._validate(this.props.value);
            }
        }

        componentWillReceiveProps(nextProps) {
            if (
                nextProps.shouldValidate &&
                (
                    nextProps.shouldValidate !== this.props.shouldValidate ||
                    nextProps.value !== this.props.value
                )
            ) {
                this.setState({
                    isValidating: true
                }, () => {
                    this._validate(nextProps.value);
                });
            }
        }

        _callOnStart() {
            if ('onStart' in this.props) {
                this.props.onStart({
                    ...this.props,
                    ...this.state
                });
            }
        }

        _callOnEnd() {
            this.props.onEnd({
                ...this.props,
                ...this.state
            });
        }

        _onResolve(value) {
            if (value === this.props.value) {
                this.setState({
                    isValid: true,
                    isValidating: false,
                    validationMessage: null
                }, this._callOnEnd);
            }
        }

        _onCatch(value, message) {
            if (value === this.props.value) {
                this.setState({
                    isValid: false,
                    isValidating: false,
                    validationMessage: message
                }, this._callOnEnd);
            }
        }

        _validate(value) {
            this._callOnStart();

            const validators = this.props.validators.reduce((sequence, next) => {
                return sequence.then(() => {
                    return next.validator(value, next.params);
                });
            }, Promise.resolve());

            validators.then(
                this._onResolve.bind(this, value),
                this._onCatch.bind(this, value)
            );
        }

        render() {
            return React.createElement(
                Base,
                {
                    ...this.props,
                    ...this.state
                },
                this.props.children
            );
        }
    };
};
