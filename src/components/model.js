const React = require('react-native');
const { shape, func } = React.PropTypes;

const IMenuController = shape({
  open: func.isRequired,
  close: func.isRequired,
  toggle: func.isRequired,
  onMenuMeasure: func.isRequired,
  registerOptionsElement: func.isRequired
});

module.exports = { IMenuController };
