module.exports = (React, { model }) => {
  const { TouchableWithoutFeedback, View } = React;

  const MenuTrigger = React.createClass({
    displayName: 'MenuTrigger',
    propTypes: {
      disabled: React.PropTypes.bool
    },
    getDefaultProps() {
      return {disabled: false}
    },
    contextTypes: {
      menuController: model.IMenuController,
      getClosestMenuName: React.PropTypes.func.isRequired
    },
    onPress() {
      const { menuController, getClosestMenuName } = this.context;
      menuController.toggle(getClosestMenuName());
    },
    render() {
      const Container = this.props.disabled ? View : TouchableWithoutFeedback;
      return (
        <Container onPress={this.onPress}>
          <View style={this.props.style}>
            { this.props.children }
          </View>
        </Container>
      );
    }
  });

  return MenuTrigger;
};
