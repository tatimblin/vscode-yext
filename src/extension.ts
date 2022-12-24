import * as vscode from "vscode";

import { AuthenticationFlow } from './AuthenticationFlow';
import { CredentialsProvider } from './CredentialsProvider';
import {
  DeleteCredential,
  RefreshCredentialsProvider,
  RegisterYextInit,
  RemoteCredential,
  SignIn,
  WriteYextRC,
} from "./commands";

export function activate() {
  new AuthenticationFlow();
  const config = vscode.workspace.getConfiguration('yext');
  const yextPath: string = config.get('path', '/Users/ttimblin/.yext/');
  const credentialsProvider = new CredentialsProvider(yextPath);

  // Register Commands
  DeleteCredential();
  RefreshCredentialsProvider(credentialsProvider);
  RegisterYextInit();
  RemoteCredential();
  SignIn();
  WriteYextRC();

  // Register Views
  vscode.window.registerTreeDataProvider(
    'yext-credentials',
    credentialsProvider,
  );
}

export function deactivate() {}
