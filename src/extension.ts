import * as vscode from 'vscode';

import { AdminConsoleProvider, DocumentItem } from './AdminConsoleProvider';
import { openJSONFile } from './openJSONFile';

export function activate(context: vscode.ExtensionContext) {
  console.log(context);
  const accountPath = '/Users/ttimblin/.yext/pulled/production/account-3728752';

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
}

export function deactivate() {}
