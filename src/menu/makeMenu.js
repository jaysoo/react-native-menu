const PropTypes = require('prop-types');
const createClass = require('create-react-class');

module.exports = (React, ReactNative, { constants, model, styles }) => {
  const {
    NativeModules: { UIManager },
    View
  } = ReactNative;

  return createClass({
    displayName: 'Menu',
    propTypes: {
      name: PropTypes.string,
      onSelect: PropTypes.func,
      onOpen: PropTypes.func,
      onClose: PropTypes.func
    },
    getDefaultProps() {
      return {
        onSelect: () => {},
        onOpen: () => {},
        onClose: () => {}
      };
    },
    contextTypes: {
      menuController: model.IMenuController
    },
    childContextTypes: {
      getClosestMenuName: PropTypes.func
    },
    getChildContext() {
      return { getClosestMenuName: () => this._name };
    },
    componentWillMount() {
      this._name = this.props.name || this.context.menuController.makeName();
    },
    componentWillUnmount() {
      this.context.menuController.unregisterMenu(this._name);
    },
    getName() {
      return this._name;
    },
    _register(ref) {
      this.context.menuController.registerMenu(this._name, {
        ref,
        didOpen: () => this.didOpen(),
        didClose: () => this.didClose()
      });
    },
    onSelect(value) {
      // Call `onSelect` and close the menu, unless the callback returns `false`.
      const shouldClose = this.props.onSelect(value) !== false;
      if (shouldClose) {
        this.context.menuController.close();
      }
    },
    didOpen() {
      this.props.onOpen();
    },
    didClose() {
      this.props.onClose();
    },
    render() {
      const { children } = this.props;

      if (React.Children.count(children) < 2) {
        throw new Error('Menu component is missing required children components MenuTrigger and MenuOptions.')
      }

      const { rest, options } = children.reduce((accum, child) => {
        switch (child.type.displayName) {
          case 'MenuOptions':
            if (accum.options) {
              throw new Error('Menu component has two MenuOptions children, but it can only use one. Please remove one of them.')
            }
            accum.options = React.cloneElement(child, {onSelect: this.onSelect});
            break;
          default:
            accum.rest.push(child);
        }
        return accum;
      }, {options: null, rest: []});

      if (!options) {
        throw new Error('Menu component is missing required child component MenuOptions.')
      }

      this.context.menuController.registerOptionsElement(this._name, options);

      // view can't collapse see https://github.com/facebook/react-native/issues/3282
      return (
        <View style={this.props.style} ref={this._register} collapsable={false}>
          { rest }
        </View>
      );
    }
  });
};
