# VS Code Extension for the Yext CLI

An unofficial vscode extension for interacting with the [Yext CLI](https://hitchhikers.yext.com/docs/cli/). It is assumed you have this installed for the extension to function.

## Installation

This extension is not available in the vscode marketplace and must be installed via [code](https://code.visualstudio.com/docs/editor/command-line), run `code -h` to ensure you have it installed.

1. Download the `.vsix` file from the a [release](https://github.com/tatimblin/vscode-yext/releases).

2. Install packed extension with the [vscode CLI](https://code.visualstudio.com/docs/editor/command-line#_launching-from-command-line).

```
code --install-extension path/to/vscode-yext-[CURRENT_VERSION].vsix
```

3. Configure your `.yext/` path, so the extension knows where to look for your Yext credentials. In Vscode open the command pallet (⌘ + ,) and search for *"Yext: Path"*. Following the placeholder `User/ttimblin/.yext/`, update the path based on your machine.

## Features

1. Read / Write a `.yextrc` file in the root of the repo that triggers a prompt to automatically sign-in to the correct account for that repo.
    - Write a `.yextrc` file by right clicking a credential and selecting "Set as default".
    - Read a `.yextrc` file automatically by opening up a repository.

2. A *Credentials Tab* which lists all your existing credentials to run operations like add, delete, set `.yextrc`, and visit account. (Right click on credential to see remaining operations)
