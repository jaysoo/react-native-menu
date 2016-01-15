module.exports = (React, { constants, model, styles }) => {
const {
  NativeModules: { UIManager },
  TouchableWithoutFeedback,
  View
} = React;

  // Calls a function once, then never again.
  const once = (fn) => {
    let called = false;
    return (...args) => {
      if (!called) {
        called = true;
        fn(...args);
      }
    };
  };

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
      // Only do this once on initial layout.
      this.onLayout = once(this.onLayout);
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
      menuController: model.IMenuController
    },
    getChildContext() {
      const menuController = {
        open: this.openMenu,
        close: this.closeMenu,
        toggle: this.toggleMenu,
        onMenuMeasure: this.onMenuMeasure,
        registerOptionsElement: this.registerOptionsElement
      };
      return {menuController};
    },
    openMenu(name = constants.DEFAULT_MENU_NAME) {
      if (!this._menuMeasurements[name]) {
        throw new Error(`MenuContext cannot find a Menu with name ${name} to open.`);
      }

      const { w: menuWidth, px: menuPX, py: menuPY } = this._menuMeasurements[name];
      const { w: ownWidth, px: ownPX, py: ownPY } = this._ownMeasurements;
      const optionsTop = menuPY - ownPY;
      const optionsRight = ownWidth + ownPX - menuPX - menuWidth;

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
    toggleMenu(name = constants.DEFAULT_MENU_NAME) {
      if (this.state.menuIsOpen) {
        this.closeMenu();
      } else {
        this.openMenu(name);
      }
    },
    onMenuMeasure(name, x, y, w, h, px, py) {
      this._menuMeasurements[name] = {x, y, w, h, px, py};
    },
    onLayout() {
      const handle = React.findNodeHandle(this.refs.Container);
      UIManager.measure(handle, (x, y, w, h, px, py) => {
        this._ownMeasurements = {x, y, w, h, px, py};
      });
    },
    // registerOptionsElement :: ReactElement -> void
    registerOptionsElement(name = constants.DEFAULT_MENU_NAME, options) {
      this._options[name] = options;
    },
    render() {
      return (
        <TouchableWithoutFeedback onPress={this.closeMenu} ref="Container" onLayout={this.onLayout}>
          <View style={this.props.style}>
            { this.props.children }
            <View style={[
              styles.optionsContainer,
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

  return MenuContext;
};
