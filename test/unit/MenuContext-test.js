'use strict';

const { expect, sinon } = require('./../support/setup');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const makeMenuContext = require('../../src/menu/makeMenuContext');

describe('MenuContext', () => {
  let MenuContext, renderer, UIManager;

  beforeEach(() => {
    renderer = TestUtils.createRenderer();

    const Dimensions = {
      get: () => ({ width: 360, height: 640 })
    };

    UIManager = {
      fakedMeasurements: {
        left: 0, top: 0, width: 360, height: 640, pageX: 0, pageY: 0
      },
      // Immediately invokes the callback with our faked measurements.
      measure: (_, callback) => {
        const { left, top, width, height, pageX, pageY } = UIManager.fakedMeasurements;
        callback(left, top, width, height, pageX, pageY);
      }
    };

    const StyleSheet = { create: x => x };

    const ReactStub = {
      ...React,
      Dimensions,
      NativeModules: { UIManager },
      StyleSheet
    };

    const moduleConfig = {
      constants: require('../../src/menu/constants'),
      model: require('../../src/menu/makeModel')(ReactStub),
      styles: require('../../src/menu/makeStyles')(ReactStub)
    };

    MenuContext = makeMenuContext(ReactStub, moduleConfig);
  });

  it('renders', () => {
    renderer.render(<MenuContext/>);
    const menuContext = renderer.getRenderOutput();
    expect(menuContext).to.be.ok;
  });
});
