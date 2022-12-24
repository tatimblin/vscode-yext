import * as fs from "fs";
import * as vscode from "vscode";
import { Credential } from "../Credential";
import { WriteYextRC } from "./WriteYextRC";

export const DeleteCredential = () => {
  vscode.commands.registerCommand('yext.deleteCredential', async (credential: Credential) => {
    console.log(credential);
    fs.unlink(credential.path, (err) => {
      if (err) {
        vscode.window.showErrorMessage('Could not delete credential: ' + credential.getBusinessName());
      } else {
        vscode.commands.executeCommand("yext.credentials.refresh");
      }
    })
  });
}
