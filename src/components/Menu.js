const React = require('react-native');
const {
  NativeModules: { UIManager },
  View
} = React;

const MenuContext = require('./MenuContext');
const MenuOption = require('./MenuOption');
const MenuOptions = require('./MenuOptions');
const MenuTrigger = require('./MenuTrigger');
const { IMenuController } = require('./model');
const styles = require('./styles');

const Menu = React.createClass({
  displayName: 'Menu',
  contextTypes: {
    menuController: IMenuController
  },
  onLayout() {
    const handle = React.findNodeHandle(this.refs.Menu);
    UIManager.measure(handle, (left, top, width, height, px, py) => {
      this.context.menuController.onMenuMeasure(left, top, width, height, px, py);
    });
  },
  onSelect(value) {
    this.props.onSelect(value);
  },
  render() {
    const { rest, options } = this.props.children.reduce((accum, child) => {
      switch (child.type) {
        case MenuOptions:
          accum.options = React.cloneElement(child, { onSelect: this.onSelect });
          break;
        default:
          accum.rest.push(child);
      }
      return accum;
    }, { options: null, rest: [] });

    this.context.menuController.registerOptionsElement(options);

    return (
      <View style={this.props.style} ref="Menu" onLayout={this.onLayout}>
        { rest }
      </View>
    );
  }
});

Menu.MenuContext = MenuContext;
Menu.MenuOption = MenuOption;
Menu.MenuOptions = MenuOptions;
Menu.MenuTrigger = MenuTrigger;

module.exports =Menu;
