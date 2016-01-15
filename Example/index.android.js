/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;
const Menu = require('react-native-menu');
const { MenuContext, MenuTrigger, MenuOptions, MenuOption } = Menu;

const Example = React.createClass({
  getInitialState() {
    return { message: 'Click the top-right menu triggers' };
  },
  onSelect(value) {
    if (typeof value === 'object') {
      this.setState({ message: `Woah!\n\nYou selected an object:\n\n${JSON.stringify(value)}` });
    } else {
      this.setState({ message: `You selected ${value}` });
    }
    return value !== 'dontclose';
  },
  render() {
    return (
      <MenuContext style={{ flex: 1 }}>
        <View style={styles.topbar}>
          <View style={styles.title}>
            <Text style={styles.titleText}>First</Text>
          </View>
          <Menu name ="menu1" onSelect={this.onSelect}>
            <MenuTrigger style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions style={styles.menuOptions}>
              <MenuOption style={styles.menuOption} value="normal">
                <Text>Normal option</Text>
              </MenuOption>
              <MenuOption style={styles.menuOption} value="dontclose">
                <Text>Does not close menu</Text>
              </MenuOption>
              <MenuOption style={styles.menuOption} value="disabled" disabled={true}>
                <Text style={styles.disabled}>Disabled option</Text>
              </MenuOption>
              <MenuOption style={styles.menuOption} value={{ message: 'Hello World!' }}>
                <Text>Option with object value</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View style={[styles.topbar, { backgroundColor: '#333' }]}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Second</Text>
          </View>
          <Menu name="menu2" onSelect={this.onSelect}>
            <MenuTrigger style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions style={styles.menuOptions}>
              <MenuOption style={styles.menuOption} value="one">
                <Text>Option 1</Text>
              </MenuOption>
              <MenuOption style={styles.menuOption} value="two">
                <Text>Option 2</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            { this.state.message }
          </Text>
        </View>
      </MenuContext>
    );
  }
});

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  title: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft: 5
  },
  titleText: {
    color: '#ddd',
    fontSize: 20
  },
  menuTrigger: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  menuTriggerText: {
    color: 'lightgrey',
    fontWeight: '600',
    fontSize: 20
  },
  menuOptions: {
    width: 150,
    borderRadius: 2,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, .5)',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 3
  },
  menuOption: {
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  disabled: {
    color: '#ccc'
  },
  content: { flex: 1, alignItems: 'center', backgroundColor: 'lightgrey',justifyContent: 'center' },
  contentText: { fontSize: 20 }
});

AppRegistry.registerComponent('Example', () => Example);
