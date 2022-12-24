import * as vscode from "vscode";
import { Credential } from "../Credential";

export const SignIn = () => {
  vscode.commands.registerCommand("yext.credentials.signin", async (credential: Credential) => {
    vscode.commands.executeCommand(
      "yext.init",
      {
        businessId: credential.getBusinessId(),
        env: credential.getEnv()
      }
    );
  });
}