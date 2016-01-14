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
    return { message: 'Click the top-right menu trigger' };
  },
  onSelect(value) {
    this.setState({ message: `You selected ${value}` });
  },
  render() {
    return (
      <MenuContext style={{ flex: 1 }}>
        <View style={styles.topbar}>
          <Menu onSelect={this.onSelect}>
            <MenuTrigger style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions style={styles.menuOptions}>
              <MenuOption style={styles.menuOption} value="one">
                <Text>One</Text>
              </MenuOption>
              <MenuOption style={styles.menuOption} value="two">
                <Text>Two</Text>
              </MenuOption>
              <MenuOption style={styles.menuOption} value="three" disabled={true}>
                <Text>Three</Text>
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
    backgroundColor: 'black',
    padding: 10
  },
  menuTrigger: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: 40
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
  content: { flex: 1, alignItems: 'center', backgroundColor: 'lightgrey',justifyContent: 'center' },
  contentText: { fontSize: 20 }
});

AppRegistry.registerComponent('Example', () => Example);
