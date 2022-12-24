import * as vscode from 'vscode';
import { CredentialsProvider } from '../CredentialsProvider';

export const RefreshCredentialsProvider = (provider: CredentialsProvider) => {
  vscode.commands.registerCommand('yext.credentials.refresh', () => {
    console.log("refresh")
    provider.refresh();
  });
}