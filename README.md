# VS Code Extension for the Yext CLI

An unofficial vscode extension for interacting with the [Yext CLI](https://hitchhikers.yext.com/docs/cli/). It is assumed you have this installed for the extension to function.

## Installation

This extension is not available in the vscode marketplace and must be installed via [code](https://code.visualstudio.com/docs/editor/command-line), run `code -h` to ensure you have it installed.

1. Clone and setup this repo.

```
git clone https://github.com/tatimblin/vscode-yext
cd vscode-yext
npm i
```

2. Create a bundle.

```
npm install --global @vscode/vsce
vsce package
```

3. Install packed extension.

```
code --install-extension vscode-yext-[CURRENT_VERSION].vsix
```

## Configuration

After installing, the extension needs to be pointed to your `.yext/` directory to read data from the Yext CLI. To update this path open vscode settings *[ ⌘ + , ]* and search "Yext: Path". Following the example `User/ttimblin/.yext/`, update the path based on your machine.

## Features

1. Read / Write a `.yextrc` file in the root of the repo that triggers a prompt to automatically sign-in to the correct account for that repo.

2. A *Credentials Tab* which lists all your existing credentials to run operations like add, delete, set `.yextrc`, and visit account. (Right click on credential to see remaining operations)
