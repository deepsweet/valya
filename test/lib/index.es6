import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';

import Valya from '../../lib/index';
import Validator from '../validator';
import { createRender, renderOnce } from '../render';

describe('Valya', () => {
    describe('should be exported', () => {
        it('should exist', () => {
            expect(Valya).to.exist;
        });

        it('should be a function', () => {
            expect(Valya).to.be.a('function');
        });
    });

    describe('Validator', () => {
        describe('init', () => {
            it('default props', () => {
                const validator = renderOnce(Validator);

                expect(validator.props.isValidating).to.be.false;
                expect(validator.props.isValid).to.be.true;
                expect(validator.props.validationErrorMessage).to.equal(null);
            });

            it('mixed props', () => {
                const validator = renderOnce(Validator, {
                    test: true
                });

                expect(validator.props.test).to.be.true;
            });

            it('children', () => {
                const TestElement = React.createElement('div');
                const validator = renderOnce(Validator, null, TestElement);

                expect(validator.props.children).to.be.equal(TestElement);
            });
        });

        describe('validation', () => {
            const validators = [
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
            ];

            it('valid', done => {
                const render = createRender();
                const onStartCallback = sinon.spy();
                const props = {
                    value: '',
                    onStart: onStartCallback,
                    onEnd: (isValid, errorMessage) => {
                        expect(isValid).to.be.true;
                        expect(errorMessage).to.be.undefied;
                        done();
                    },
                    validators
                };

                render(Validator, props);
                props.value = 'hello';
                render(Validator, props);

                expect(onStartCallback.calledOnce).to.be.true;
            });

            it('invalid', done => {
                const render = createRender();
                const onStartCallback = sinon.spy();
                const props = {
                    value: 'hello',
                    onStart: onStartCallback,
                    onEnd: (isValid, errorMessage) => {
                        expect(isValid).to.be.false;
                        expect(errorMessage).to.be.equal('Field is required');
                        done();
                    },
                    validators
                };

                render(Validator, props);
                props.value = '';
                render(Validator, props);

                expect(onStartCallback.calledOnce).to.be.true;
            });
        });
    });
});
