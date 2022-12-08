import * as vscode from "vscode";

import { AuthenticationFlow } from './AuthenticationFlow';
import { AdminConsoleProvider } from './AdminConsoleProvider';
import { CredentialsProvider } from './CredentialsProvider';
import {
  RegisterOpenFile,
  RegisterYextInit
} from "./commands";

export function activate() {
  new AuthenticationFlow();
  const config = vscode.workspace.getConfiguration('yext');
  const yextPath: string = config.get('path', '/Users/ttimblin/.yext/');

  // Register Commands
  RegisterOpenFile();
  RegisterYextInit();

  // Register Views
  vscode.window.registerTreeDataProvider(
    'yext-credentials',
    new CredentialsProvider(yextPath),
  );
  vscode.window.registerTreeDataProvider(
    'yext-admin-console',
    new AdminConsoleProvider(yextPath),
  );
}

export function deactivate() {}
