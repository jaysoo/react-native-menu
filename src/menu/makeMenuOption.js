module.exports = (React, { model, styles }) => {
  const { View, TouchableWithoutFeedback } = React;

  const MenuOption = React.createClass({
    displayName: 'MenuOption',
    contextTypes: {
      menuController: model.IMenuController
    },
    onPress() {
      !this.props.disabled && this.props.onPress(this.props.value)
    },
    render() {
      return (
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={[styles.option, this.props.style]}>
            { this.props.children }
          </View>
        </TouchableWithoutFeedback>
      );
    }
  });

  return MenuOption;
};
