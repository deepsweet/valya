import { expect } from 'chai';
import render from './utils/render';

import { Simple, Validator } from '../src/Simple';

function onStart () {
    return 'success start';
}

function onEnd () {
    return 'success end';
}

describe('Simple Validator', function () {
    it('Should be Validator instance', function () {
        let validator = render(Validator);

        expect(validator.type.displayName).to.equal('Validator');
        expect(validator.props.isValidating).to.be.false;
        expect(validator.props.isValid).to.be.true;
        expect(validator.props.validationErrorMessage).to.equal(null);
    });
});

describe('Simple Component', function () {
    it('Should contain Validator', function () {
        let component = render(Simple);

        expect(component.props.value).to.equal('Hello world');
        expect(component.props.onStart).to.be.instanceof(Function);
        expect(component.props.onEnd).to.be.instanceof(Function);
        expect(component.props.validators).to.be.instanceof(Array);
    });

    it('Should contain custom callbacks', function () {
        let component = render(Simple, {
            onStart: onStart,
            onEnd: onEnd
        });

        expect(component.props.onStart()).to.equal('success start');
        expect(component.props.onEnd()).to.equal('success end');
    });
});
