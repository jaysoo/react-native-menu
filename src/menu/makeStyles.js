module.exports = (ReactNative) => {
  const { Dimensions, StyleSheet } = ReactNative;
  const window = Dimensions.get('window');

  return StyleSheet.create({
    optionsContainer: {
      position: 'absolute',
      borderRadius: 2,
      backgroundColor: 'white',
      width: 200,

      // Shadow only works on iOS.
      shadowColor: 'black',
      shadowOpacity: 0.3,
      shadowOffset: { width: 3, height: 3 },
      shadowRadius: 4,

      // This will elevate the view on Android, causing shadow to be drawn.
      elevation: 8
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
    },
    backdrop: {
      opacity: 0,
      position: 'absolute',
      top: window.height,
      bottom: -window.height,
      left: 0
    }
  });
};
