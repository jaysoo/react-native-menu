module.exports = (React, { styles }) => {
  const { TouchableWithoutFeedback, View } = React;

  const MenuOptions = React.createClass({
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

  return MenuOptions;
};
