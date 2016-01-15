const React = require('react-native');
const {
  TouchableWithoutFeedback,
  View
} = React;

const styles = require('./styles');

const MenuOptions = React.createClass({
  onSelect(value) {
    this.props.onSelect(value);
  },
  render() {
    return (
      <TouchableWithoutFeedback style={[styles.options, this.props.style]}>
        <View>
          { React.Children.map(this.props.children, (x) => (
            React.cloneElement(x, { onPress: this.onSelect })
          ) ) }
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

module.exports = MenuOptions;
