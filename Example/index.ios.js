'use strict';
const React = require('react-native');
const { AppRegistry, StatusBar } = React;
StatusBar.setHidden(true);
AppRegistry.registerComponent('Example', () => require('./Example'));
