const isClonable = (element) => !!element;

module.exports = (React, ReactNative, { styles }) => {
  const { TouchableWithoutFeedback, View } = ReactNative;

  const MenuOptions = React.createClass({
    displayName: 'MenuOptions',
    onSelect(value) {
      this.props.onSelect(value);
    },
    render() {
      return (
        <TouchableWithoutFeedback style={[styles.options, this.props.style]}>
          <View>
            { React.Children.map(this.props.children, (x) => {
              // If the children is a falsy value (for IIFE in the render method for example)
              // It should just ignore it instead of throwing an exception.
              return isClonable(x)
                ? React.cloneElement(x, {onPress: this.onSelect})
                : false;
            })}
          </View>
        </TouchableWithoutFeedback>
      );
    }
  });

  return MenuOptions;
};
