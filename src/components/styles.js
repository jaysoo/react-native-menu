const React = require('react-native');
const { Dimensions, StyleSheet } = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  options: {
    position: 'absolute'
  },
  optionsHidden: {
    top: window.height,
    bottom: -window.height
  }
});

module.exports = styles;
