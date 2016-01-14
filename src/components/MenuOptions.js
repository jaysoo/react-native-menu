const React = require('react-native');
const {
  View
} = React;

const MenuOptions = React.createClass({
  onSelect(value) {
    this.props.onSelect(value);
  },
  render() {
    return (
      <View style={this.props.style}>
        { React.Children.map(this.props.children, (x) => (
          React.cloneElement(x, { onPress: this.onSelect })
        ) ) }
      </View>
    );
  }
});

module.exports = MenuOptions;
