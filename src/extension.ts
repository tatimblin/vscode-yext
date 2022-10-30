import * as vscode from "vscode";

import { AuthenticationFlow } from './AuthenticationFlow';
import { AdminConsoleProvider, DocumentItem } from './AdminConsoleProvider';
import { openJSONFile } from './openJSONFile';
import { RegisterYextInit } from "./commands";
import { RunCommands } from './RunCommands';

export function activate() {
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

  RegisterYextInit();
}

export function deactivate() {}
