const ReactNative = require('react-native');
const React = require('react');

// Make our components from factory functions.
const {
  Menu,
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} = require('./menu')(React, ReactNative);

Menu.MenuContext = MenuContext;
Menu.MenuOption = MenuOption;
Menu.MenuOptions = MenuOptions;
Menu.MenuTrigger = MenuTrigger;

module.exports = Menu;
