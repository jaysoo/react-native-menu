const TimerMixin = require('react-timer-mixin');

module.exports = (React, { constants, model, styles }) => {
  const {
    NativeModules: { UIManager },
    TouchableWithoutFeedback,
    ScrollView,
    View
  } = React;
  const AnimatedOptionsContainer = require('./makeAnimatedOptionsContainer')(React);

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

  const defaultOptionsContainerRenderer = (options) => (
    <ScrollView>
      {options}
    </ScrollView>
  );

  const makeOptions = (options, { top, right }) => {
    const { optionsContainerStyle, renderOptionsContainer = defaultOptionsContainerRenderer} = options.props;
    return (
      <AnimatedOptionsContainer style={[ styles.optionsContainer, optionsContainerStyle, { top, right }]}>
        { renderOptionsContainer(options) }
      </AnimatedOptionsContainer>
    );
  };

  /*
   * The MenuContext provides a tunnel for descendant menu components to access
   * top-level methods. It also allows the <MenuOptions/> element to be placed
   * properly.
   */
  const MenuContext = React.createClass({
    displayName: 'MenuContext',
    mixins: [TimerMixin],
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
        optionsRight: 0,
        backdropWidth: 0
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
    isMenuOpen() {
      return this.state.menuIsOpen
    },
    openMenu(name = constants.DEFAULT_MENU_NAME) {
      if (!this._menuMeasurements[name]) {
        throw new Error(`MenuContext cannot find a Menu with name ${name} to open.`);
      }

      this.setState({
        menuIsOpen: true,
        menuOptions: this.makeAndPositionOptions(name),
        backdropWidth: this._ownMeasurements.w
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
      // Only override measurements if not already recorded.
      if (!this._menuMeasurements[name]) {
        this._menuMeasurements[name] = {x, y, w, h, px, py};
      }
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
      // If the menu is already open, re-render the options.
      this.setTimeout(() => {
        if (this.state.menuIsOpen) {
          this.setState({ menuOptions: this.makeAndPositionOptions(name) });
        }
      }, 16);
    },
    makeAndPositionOptions(name) {
      const options = this._options[name];
      const { w: menuWidth, px: menuPX, py: menuPY } = this._menuMeasurements[name];
      const { w: ownWidth, px: ownPX, py: ownPY } = this._ownMeasurements;
      const optionsTop = menuPY - ownPY;
      const optionsRight = ownWidth + ownPX - menuPX - menuWidth;
      return makeOptions(options, { top: optionsTop, right: optionsRight });
    },
    render() {
      return (
        <View ref="Container" onLayout={this.onLayout} style={{ flex: 1 }}>
          <View style={this.props.style}>
            { this.props.children }
          </View>
          <TouchableWithoutFeedback onPress={this.closeMenu}>
            <View style={[ styles.backdrop
                          , this.state.menuIsOpen ? { width: this.state.backdropWidth, top: 0, bottom: 0 }: null ]}/>
          </TouchableWithoutFeedback>
          { this.state.menuOptions }
        </View>
      )
    }
  });

  return MenuContext;
};
