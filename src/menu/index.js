const menuModuleFactory = (React) => {
  const model = require('./makeModel')(React);
  const styles = require('./makeStyles')(React);

  const config = { model, styles };

  return {
    Menu: require('./makeMenu')(React, config),
    MenuContext: require('./makeMenuContext')(React, config),
    MenuOptions: require('./makeMenuOptions')(React, config),
    MenuOption: require('./makeMenuOption')(React, config),
    MenuTrigger: require('./makeMenuTrigger')(React, config)
  };
};

module.exports = menuModuleFactory;
