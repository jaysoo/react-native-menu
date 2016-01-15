const menuModuleFactory = (React) => {
  const constants = require('./constants');
  const model = require('./makeModel')(React);
  const styles = require('./makeStyles')(React);

  const config = { constants, model, styles };

  return {
    Menu: require('./makeMenu')(React, config),
    MenuContext: require('./makeMenuContext')(React, config),
    MenuOptions: require('./makeMenuOptions')(React, config),
    MenuOption: require('./makeMenuOption')(React, config),
    MenuTrigger: require('./makeMenuTrigger')(React, config)
  };
};

module.exports = menuModuleFactory;
