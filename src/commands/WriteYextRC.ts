import * as vscode from "vscode";
import { Credential } from "../Credential";
import { RunCommand } from "../RunCommand";

export const WriteYextRC = () => {
  vscode.commands.registerCommand('yext.writeYextRC', async (credential: Credential) => {
    new RunCommand({
      businessId: credential.getBusinessId(),
      businessName: credential.getBusinessName(),
      env: credential.getEnv(),
    }).writeFile();
  });
};