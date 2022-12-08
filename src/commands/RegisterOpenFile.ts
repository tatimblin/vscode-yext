import * as vscode from "vscode";

import { DocumentItem } from '../AdminConsoleProvider';
import { openJSONFile } from '../openJSONFile';

export const RegisterOpenFile = () => {
  vscode.commands.registerCommand('yext.openFile', (item: DocumentItem) => {
    vscode.window.showInformationMessage(`You selected ${item.ref.name}`);
    if (item.contextValue === 'document') {
      openJSONFile(item.path);
    }
  });
}