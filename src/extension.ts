import * as vscode from 'vscode';

import { AdminConsoleProvider } from './AdminConsoleProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log(context);

  vscode.window.registerTreeDataProvider(
    'yext-admin-console',
    new AdminConsoleProvider('/Users/ttimblin/.yext/pulled/production/account-3728752'),
  );

  let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
    vscode.window.showInformationMessage(`Hello World! 3`);
  });
}

export function deactivate() {}
