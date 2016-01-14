const React = require('react-native');
const { shape, func } = React.PropTypes;

const IMenuController = shape({
  // open :: void -> Effect MenuOpen
  open: func.isRequired,

  onMenuMeasure: func.isRequired,

  // registerOptionsElement :: ReactElement -> void
  registerOptionsElement: func.isRequired
});

module.exports = { IMenuController };
