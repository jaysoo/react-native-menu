# react-native-menu

A menu component for Android and iOS that provides a dropdown similar to Android's
[Spinner](http://developer.android.com/reference/android/widget/Spinner.html), but does not
retain a persistent selection.

The API is very flexible so you are free to extend the styling and behaviour.

## Installation

```
$ npm install react-native-menu --save
```

## Demo

| iOS | Android |
| --- | ------- |
| ![](./demo-ios.gif) | ![](./demo-android.gif) |

## Basic Usage

**Important:** In order for the `<Menu/>` to work, you need to mount `<MenuContext/>` as an ancestor to `<Menu/>`. This allows
the menu to open on top of all other components mounted under `<MenuContext/>` -- basically, the menu will be moved
to be the last child of the context.

You must also have a `<MenuTrigger/>` and a `<MenuOptions/>` as direct children under `<Menu/>`. The `MenuTrigger` component
opens the menu when pressed. The `MenuOptions` component can take *any* children, but you need at least one `MenuOption`
child in order for the menu to actually do anything.

The `MenuOption` component can take *any* children.

```js
// App.js
render() {
  return (
    <MenuContext>
      <ChildOne/>
      <ChildTwo/>
    </MenuContext>
  );
}

// ChildTwo.js
render() {
  return (
    <View>
      <Menu onSelect={(value) => console.log(`User selected the number ${value}`)>
        <MenuTrigger>
          <Text>open</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={1}>
            <Text>One</Text>
          </MenuOption>
          <MenuOption value={2}>
            <Text>Two</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <View>
        <Text>Some other content...</Text>
      </View>
    </View>
  );
}
```

Please refer to the full working example [here](./Example/Example.js).


## API

### MenuContext

Methods:

- openMenu() -- Opens the menu
- closeMenu() -- Closes the menu
- toggleMenu() -- Toggle the menu between open and close

Props:

*None*

### Menu

Props:

- `onSelect` -- This function is called with the value the `MenuOption` that has been selected by the user

### MenuTrigger

Props:

- `disabled` -- If true, then this trigger is not pressable
- `style` -- Overrides default style properties (user-defined style will take priority)

### MenuOptions

Props:

- `style` -- Overrides default style properties (user-defined style will take priority)

**Note:** The default style for `MenuOptions` is as follows:

```js
{
    position: 'absolute',
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: 200,

    // Shadow only works on iOS.
    shadowColor: 'rgba(0, 0, 0, .8)',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 3,

    // This will elevate the view on Android, causing shadow to be drawn.
    elevation: 5
  }
```

If you want to change the `width`, for example, you will do `<MenuOptions style={{ width: 300 }}>`.

### MenuOption

Props:

- `disabled` -- If true, then this option is not selectable
- `style` -- Overrides default style properties (user-defined style will take priority)
