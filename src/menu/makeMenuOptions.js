const createClass = require('create-react-class');

module.exports = (React, ReactNative, { styles }) => {
  const { TouchableWithoutFeedback, View } = ReactNative;

  return createClass({
    displayName: 'MenuOptions',
    onSelect(value) {
      this.props.onSelect(value);
    },
    render() {
      return (
        <TouchableWithoutFeedback style={[styles.options, this.props.style]}>
          <View>
            { React.Children.map(this.props.children, (x) => (
              React.cloneElement(x, {onPress: this.onSelect})
            )) }
          </View>
        </TouchableWithoutFeedback>
      );
    }
  });
};
