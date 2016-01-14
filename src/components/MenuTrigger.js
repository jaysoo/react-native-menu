const React = require('react-native');
const {
  TouchableWithoutFeedback,
  View
} = React;

const { IMenuController } = require('./model');

const MenuTrigger = React.createClass({
  displayName: 'MenuTrigger',
  contextTypes: {
    menuController: IMenuController
  },
  onPress() {
    this.context.menuController.open();
  },
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={this.props.style}>
          { this.props.children }
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

module.exports = MenuTrigger;
