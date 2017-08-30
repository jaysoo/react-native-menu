const TimerMixin = require('react-timer-mixin');

let nextID = 1;

module.exports = (React, ReactNative, { constants, model, styles }) => {
  const {
    UIManager,
    TouchableWithoutFeedback,
    ScrollView,
    View,
    BackHandler
  } = ReactNative;
  const AnimatedOptionsContainer = require('./makeAnimatedOptionsContainer')(React, ReactNative);

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

  const NULL_HOOKS = {
    didOpen: () => {},
    didClose: () => {}
  }

  /*
   * The MenuContext provides a tunnel for descendant menu components to access
   * top-level methods. It also allows the <MenuOptions/> element to be placed
   * properly.
   */
  const MenuContext = React.createClass({
    displayName: 'MenuContext',
    propTypes: {
      detectBackHandler: React.PropTypes.bool,
    },
    getDefaultProps() {
      return {
        detectBackHandler: true,
      };
    },
    mixins: [TimerMixin],

    // Public methods
    isMenuOpen() {
      return this.state.openedMenu
    },
    openMenu(name) {
      const handle = ReactNative.findNodeHandle(this._menus[name].ref);
      UIManager.measure(handle, (x, y, w, h, px, py) => {
        this._menus[name].measurements = { x, y, w, h, px, py };

        this.setState({
          openedMenu: name,
          menuOptions: this._makeAndPositionOptions(name, this._menus[name].measurements),
          backdropWidth: this._ownMeasurements.w
        });

        this._activeMenuHooks = this._menus[name];
        this._activeMenuHooks && this._activeMenuHooks.didOpen();
      });
    },
    closeMenu() {
      if (this.props.onCloseMenu) {
        this.props.onCloseMenu(this.state)
      }
      this.setState({
        openedMenu: '',
        menuOptions: null
      });

      this._activeMenuHooks && this._activeMenuHooks.didClose();
      this._activeMenuHooks = NULL_HOOKS;
    },
    toggleMenu(name) {
      if (this.state.openedMenu === name) {
        this.closeMenu(name);
      } else {
        this.openMenu(name);
      }
    },

    // Private and lifecycle methods
    getInitialState() {
      return {
        openedMenu: '',
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
        registerMenu: this._registerMenu,
        unregisterMenu: this._unregisterMenu,
        registerOptionsElement: this._registerOptionsElement,
        makeName: this._makeName
      };
      return { menuController };
    },
    componentWillMount() {
      this._menus = {};
      this._options = {};
      // Only do this once on initial layout.
      this.onLayout = once(this.onLayout);
    },
    handleBackHandler() {
      if (this.isMenuOpen()){
        this.closeMenu();
        return true;
      }
      return false;
    },
    onLayout() {
      const handle = ReactNative.findNodeHandle(this.refs.Container);
      UIManager.measure(handle, (x, y, w, h, px, py) => {
        this._ownMeasurements = {x, y, w, h, px, py};
      });
    },
    _registerMenu(name, hooks) {
      if (this._menus[name]) {
        console.warn(`Menu ${name} has already been registered in this context. Please provide a different name.`);
      }

      if (this.props.detectBackHandler){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackHandler);  //Override previous listener
        BackHandler.addEventListener('hardwareBackPress', this.handleBackHandler);
      }
      this._menus[name] = hooks;
    },
    _unregisterMenu(name) {
      delete this._menus[name];
      delete this._options[name];
    },
    _registerOptionsElement(name, options) {
      // If options are already set and visible, skip the update.
      if (this.state.menuOptions === options) {
        return;
      }
      this._options[name] = options;
      // If the menu is already open, re-render the options.
      this.setTimeout(() => {
        if (this.state.openedMenu === name) {
          this.setState({ menuOptions: this._makeAndPositionOptions(name, this._menus[name].measurements) });
        }
      }, 16);
    },
    _makeName() {
      return `menu-${nextID++}`;
    },
    _makeAndPositionOptions(name, menuMeasurements) {
      const options = this._options[name];
      const { w: menuWidth, px: menuPX, py: menuPY } = menuMeasurements;
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
                          , this.state.openedMenu ? { width: this.state.backdropWidth, top: 0, bottom: 0 }: null ]}/>
          </TouchableWithoutFeedback>
          { this.state.menuOptions }
        </View>
      )
    }
  });

  return MenuContext;
};
