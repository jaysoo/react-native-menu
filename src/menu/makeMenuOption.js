module.exports = (React, ReactNative, { model, styles }) => {
  const { View, TouchableWithoutFeedback } = ReactNative;

  const MenuOption = React.createClass({
    displayName: 'MenuOption',
    contextTypes: {
      menuController: model.IMenuController
    },
    onPress() {
      !this.props.disabled && this.props.onPress(this.props.value)
    },
    render() {
      if(this.props.renderTouchable) {
        return React.cloneElement(this.props.renderTouchable(), {onPress: this.onPress}, (
          <View style={[styles.option, this.props.style]}>
            { this.props.children }
          </View>
        ));
      }
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
