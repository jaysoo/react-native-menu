const React = require('react-native');
const {
  NativeModules: { UIManager },
  TouchableWithoutFeedback,
  View
} = React;

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
    this._options = null;
  },
  getInitialState() {
    return {
      menuIsOpen: false,
      menuOptions: this._options,
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
      onMenuMeasure: this.onMenuMeasure,
      registerOptionsElement: this.registerOptionsElement
    };
    return { menuController };
  },
  // registerOptionsElement :: ReactElement -> Effect MenuOpen
  openMenu() {
    const { px: menuPX, py: menuPY } = this._menuMeasurements;
    const { px: ownPX, py: ownPY } = this._ownMeasurements;
    const optionsTop = menuPY - ownPY;
    const optionsRight = menuPX - ownPX;
    console.log(optionsTop, optionsRight);
    this.setState({
      menuIsOpen: true,
      menuOptions: this._options,
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
  onMenuMeasure(x, y, w, h, px, py) {
    this._menuMeasurements = { x, y, w, h, px, py };
  },
  onLayout() {
    const handle = React.findNodeHandle(this.refs.Container);
    UIManager.measure(handle, (x, y, w, h, px, py) => {
      this._ownMeasurements = { x, y, w, h, px, py };
    });
  },
  // registerOptionsElement :: ReactElement -> void
  registerOptionsElement(options) {
    this._options = options;
  },
  render() {
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
