const React = require('react-native');
const {
  View,
  TouchableWithoutFeedback
} = React;

const { IMenuController } = require('./model');
const styles = require('./styles');

const MenuOption = React.createClass({
  displayName: 'MenuOption',
  contextTypes: {
    menuController: IMenuController
  },
  onPress() {
    !this.props.disabled && this.props.onPress(this.props.value)
  },
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[styles.option, this.props.style]}>
          { this.props.children }
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

module.exports = MenuOption;
