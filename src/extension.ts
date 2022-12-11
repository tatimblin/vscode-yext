import * as vscode from "vscode";

import { AuthenticationFlow } from './AuthenticationFlow';
import { CredentialsProvider } from './CredentialsProvider';
import {
  RegisterYextInit
} from "./commands";

export function activate() {
  new AuthenticationFlow();
  const config = vscode.workspace.getConfiguration('yext');
  const yextPath: string = config.get('path', '/Users/ttimblin/.yext/');

  // Register Commands
  RegisterYextInit();

  // Register Views
  vscode.window.registerTreeDataProvider(
    'yext-credentials',
    new CredentialsProvider(yextPath),
  );
}

export function deactivate() {}
