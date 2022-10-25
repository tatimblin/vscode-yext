import * as vscode from "vscode";
import * as fs from "fs";

import { AuthenticationFlow } from './AuthenticationFlow';
import { AdminConsoleProvider, DocumentItem } from './AdminConsoleProvider';
import { openJSONFile } from './openJSONFile';
import { RunCommands } from './RunCommands';

export function activate(context: vscode.ExtensionContext) {
  console.log(context);
  const accountPath = '/Users/ttimblin/.yext/pulled/production/account-3728752';

  const yextRC = new RunCommands('.yextrc');
  new AuthenticationFlow(yextRC);

  vscode.window.registerTreeDataProvider(
    'yext-admin-console',
    new AdminConsoleProvider(accountPath),
  );

  vscode.commands.registerCommand('yext.open', (item: DocumentItem) => {
    vscode.window.showInformationMessage(`You selected ${item.ref.name}`);
    if (item.contextValue === 'document') {
      openJSONFile(`${accountPath}/${item.path}`);
    }
  });

  vscode.commands.registerCommand('yext.init', (context: RunCommands) => {
    console.log(context);
    vscode.window.showInformationMessage('Try and sign in', ...['Sign In', 'Close']);
  });
}

export function deactivate() {}
