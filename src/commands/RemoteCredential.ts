import * as vscode from "vscode";
import { Credential } from "../Credential";

export const RemoteCredential = () => {
  vscode.commands.registerCommand("yext.credentials.remote", async (credential: Credential) => {
    const url = credential.getRemoteURL();
    vscode.env.openExternal(url);
  });
}