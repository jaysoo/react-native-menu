const React = require('react-native');
const { Dimensions, StyleSheet } = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  optionsContainer: {
    position: 'absolute',
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: 200,

    // Shadow only works on iOS.
    shadowColor: 'rgba(0, 0, 0, .8)',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 3,

    // This will elevate the view on Android, causing shadow to be drawn.
    elevation: 5
  },
  options: {
    flex: 1
  },
  optionsHidden: {
    top: window.height,
    bottom: -window.height
  },
  option: {
    padding: 10,
    backgroundColor: 'transparent',
    flex: 1
  }
});

module.exports = styles;
