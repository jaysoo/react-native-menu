const React = require('react-native');
const {
  NativeModules: { UIManager },
  TouchableWithoutFeedback,
  View
} = React;

const { DEFAULT_MENU_NAME } = require('./constants');
const { IMenuController } = require('./model');
const styles = require('./styles');

/*
 * The MenuContext provides a tunnel for descendant menu components to access
 * top-level methods. It also allows the <MenuOptions/> element to be placed
 * properly.
 */
const MenuContext = React.createClass({
  displayName: 'MenuContext',
  componentWillMount() {
    this._menuMeasurements = {};
    this._options = {};
  },
  getInitialState() {
    return {
      menuIsOpen: false,
      menuOptions: null,
      optionsTop: 0,
      optionsRight: 0
    };
  },
  childContextTypes: {
    menuController: IMenuController
  },
  getChildContext() {
    const menuController = {
      open: this.openMenu,
      close: this.closeMenu,
      toggle: this.toggleMenu,
      onMenuMeasure: this.onMenuMeasure,
      registerOptionsElement: this.registerOptionsElement
    };
    return { menuController };
  },
  openMenu(name = DEFAULT_MENU_NAME) {
    const { w: menuWidth, px: menuPX, py: menuPY } = this._menuMeasurements[name];
    const { w: ownWidth, py: ownPY } = this._ownMeasurements;
    const optionsTop = menuPY - ownPY;
    const optionsRight = ownWidth - menuPX - menuWidth;
    this.setState({
      menuIsOpen: true,
      menuOptions: this._options[name],
      optionsTop,
      optionsRight
    });
  },
  closeMenu() {
    this.setState({
      menuIsOpen: false,
      menuOptions: null
    });
  },
  toggleMenu(name = DEFAULT_MENU_NAME) {
    if (this.state.menuIsOpen) {
      this.closeMenu();
    } else {
      this.openMenu(name);
    }
  },
  onMenuMeasure(name, x, y, w, h, px, py) {
    this._menuMeasurements[name] = { x, y, w, h, px, py };
  },
  onLayout() {
    const handle = React.findNodeHandle(this.refs.Container);
    UIManager.measure(handle, (x, y, w, h, px, py) => {
      this._ownMeasurements = { x, y, w, h, px, py };
    });
  },
  // registerOptionsElement :: ReactElement -> void
  registerOptionsElement(name = DEFAULT_MENU_NAME, options) {
    this._options[name] = options;
  },
  render() {
    console.log(this.state.optionsRight);
    return (
      <TouchableWithoutFeedback onPress={this.closeMenu} ref="Container" onLayout={this.onLayout}>
        <View style={this.props.style}>
          { this.props.children }
          <View style={[
            styles.options,
            { top: this.state.optionsTop, right: this.state.optionsRight },
            this.state.menuIsOpen ? null : styles.optionsHidden
          ]}>
            { this.state.menuOptions }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
});

module.exports = MenuContext;
