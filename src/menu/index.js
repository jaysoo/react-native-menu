const menuModuleFactory = (React, ReactNative) => {
  const model = require('./makeModel')(React);
  const styles = require('./makeStyles')(ReactNative);

  const config = { model, styles };

  return {
    Menu: require('./makeMenu')(React, ReactNative, config),
    MenuContext: require('./makeMenuContext')(React, ReactNative, config),
    MenuOptions: require('./makeMenuOptions')(React, config),
    MenuOption: require('./makeMenuOption')(React, config),
    MenuTrigger: require('./makeMenuTrigger')(React, config)
  };
};

module.exports = menuModuleFactory;
