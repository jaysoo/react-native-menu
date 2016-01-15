'use strict';
const React = require('react-native');
const { AppRegistry, StatusBarIOS } = React;
StatusBarIOS.setHidden(true);
AppRegistry.registerComponent('Example', () => require('./Example'));
