'use strict';

const React = require('react');
const ReactNative = require('react-native');
const renderer =  require('react-test-renderer');
const makeMenuContext = require('../../src/menu/makeMenuContext');

describe('MenuContext', () => {
  let MenuContext;

  beforeEach(() => {
    const moduleConfig = {
      model: require('./makeModel')(React),
      styles: require('./makeStyles')(ReactNative)
    };

    MenuContext = makeMenuContext(React, require('react-native'), moduleConfig);
  });

  it('renders', () => {
    const component = renderer.create(<MenuContext/>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  });
});
