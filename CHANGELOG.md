### 0.19.0

- Fixes a performance issue where registering menu options on already
  rendered and opened menu causes infinite render loop (Closes #5, #9).

### 0.18.11

- Adds method to `MenuContext` to check if the menu is opened or not.
- Supports re-rendering of `MenuOptions` while the menu is opened.

### 0.18.10

- Adds callback for `Menu` component when menu opens and closes.
- Allows menu options to re-render dynamically while menu is open.

### 0.18.9

- Adds more customization options for options container.
- Fixes issue with wrong positioning calculation.

### 0.18.6

- Dropdown menu now animates in (using scale animation) instead of just appearing.
- Fixes opacity issue with backdrop for iOS.
