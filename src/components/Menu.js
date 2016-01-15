const React = require('react-native');
const {
  NativeModules: { UIManager },
  View
} = React;

const MenuContext = require('./MenuContext');
const MenuOption = require('./MenuOption');
const MenuOptions = require('./MenuOptions');
const MenuTrigger = require('./MenuTrigger');
const { DEFAULT_MENU_NAME } = require('./constants');
const { IMenuController } = require('./model');
const styles = require('./styles');

const Menu = React.createClass({
  displayName: 'Menu',
  propTypes: {
    name: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      name: DEFAULT_MENU_NAME,
      onSelect: () => {}
    };
  },
  contextTypes: {
    menuController: IMenuController
  },
  childContextTypes: {
    getClosestMenuName: React.PropTypes.func
  },
  getChildContext() {
    return { getClosestMenuName: () => this.props.name };
  },
  onLayout() {
    const handle = React.findNodeHandle(this.refs.Menu);
    UIManager.measure(handle, (left, top, width, height, px, py) => {
      this.context.menuController.onMenuMeasure(this.props.name, left, top, width, height, px, py);
    });
  },
  onSelect(value) {
    // Call `onSelect` and close the menu, unless the callback returns `false`.
    const shouldClose = this.props.onSelect(value) !== false;
    if (shouldClose) {
      this.context.menuController.close();
    }
  },
  render() {
    const { children, name } = this.props;

    if (!Array.isArray(children)) {
      throw new Error('Menu component is missing required children components MenuTrigger and MenuOptions.')
    }

    const { rest, options } = children.reduce((accum, child) => {
      switch (child.type) {
        case MenuOptions:
          if (accum.options) {
            throw new Error('Menu component has two MenuOptions children, but it can only use one. Please remove one of them.')
          }
          accum.options = React.cloneElement(child, { onSelect: this.onSelect });
          break;
        default:
          accum.rest.push(child);
      }
      return accum;
    }, { options: null, rest: [] });

    if (!options) {
      throw new Error('Menu component is missing required child component MenuOptions.')
    }

    this.context.menuController.registerOptionsElement(name, options);

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
