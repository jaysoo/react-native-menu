const React = require('react-native');
const {
  TouchableWithoutFeedback,
  View
} = React;

const { IMenuController } = require('./model');

const MenuTrigger = React.createClass({
  displayName: 'MenuTrigger',
  contextTypes: {
    menuController: IMenuController,
    getClosestMenuName: React.PropTypes.func.isRequired
  },
  onPress() {
    this.context.menuController.toggle(this.context.getClosestMenuName());
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
