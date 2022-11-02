import * as vscode from "vscode";

import { AuthenticationFlow } from './AuthenticationFlow';
import { AdminConsoleProvider, DocumentItem } from './AdminConsoleProvider';
import { openJSONFile } from './openJSONFile';
import { RegisterYextInit } from "./commands";
import { RunCommands } from './RunCommands';

export function activate() {
  const config = vscode.workspace.getConfiguration('yext');
  const yextPath: string = config.get('path', '/Users/ttimblin/.yext/');

  const yextRC = new RunCommands('.yextrc');
  new AuthenticationFlow(yextRC);

  vscode.window.registerTreeDataProvider(
    'yext-admin-console',
    new AdminConsoleProvider(yextPath),
  );

  vscode.commands.registerCommand('yext.open', (item: DocumentItem) => {
    vscode.window.showInformationMessage(`You selected ${item.ref.name}`);
    if (item.contextValue === 'document') {
      openJSONFile(yextPath + item.path);
    }
  });

  RegisterYextInit();
}

export function deactivate() {}
