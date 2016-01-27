import React from 'react';
import TestUtils from 'react-addons-test-utils';

export function createRender() {
    const shallowRenderer = TestUtils.createRenderer();

    return function(component, props, ...children) {
        shallowRenderer.render(
            React.createElement(
                component,
                props,
                ...children
            )
        );

        return shallowRenderer.getRenderOutput();
    };
}

export function renderOnce(...args) {
    return createRender()(...args);
}
