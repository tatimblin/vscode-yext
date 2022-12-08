import * as vscode from "vscode";
import { RunCommand } from "./RunCommand";

type AuthAction = "Sign In" | "Close";

export class AuthenticationFlow {
  private runCommands: RunCommand;
  private messageTemplate: string;

  constructor(message?: string) {
    this.runCommands = new RunCommand('.yextrc');
    this.messageTemplate = message || `Account configuration found for %s, would you like to sign in?`;

    this.prompt()
      .then((item) => {
        if (item === "Sign In") {
          this.authenticate();
        }
      });
  }

  prompt(): Thenable<AuthAction | undefined> {
    return vscode.window.showInformationMessage(this.message, "Sign In", 'Close');
  }

  get message(): string {
    let name = `${this.runCommands.businessId}`;
    if (this.runCommands.businessName) {
      name = `${this.runCommands.businessName} (${name})`;
    }
    return this.messageTemplate.replace('%s', name);
  }

  authenticate() {
    vscode.commands.executeCommand('yext.init', {
      businessId: this.runCommands.businessId,
      env: this.runCommands.env,
    });
  }
}
