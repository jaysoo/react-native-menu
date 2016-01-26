module.exports = (React) => {
  const { shape, func } = React.PropTypes;

  const IMenuController = shape({
    open: func.isRequired,
    close: func.isRequired,
    toggle: func.isRequired,
    registerOptionsElement: func.isRequired
  });

  return { IMenuController };
};

