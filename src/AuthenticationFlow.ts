import * as vscode from "vscode";
import { RunCommands } from "./RunCommands";
import { Universe } from "./types";

type AuthAction = "Sign In" | "Close";

export class AuthenticationFlow {
  private businessId: number;
  private businessName?: string;
  private env: Universe
  private messageTemplate: string;

  constructor(rc: RunCommands, message?: string) {
    this.businessId = rc.businessId;
    this.businessName = rc.businessName;
    this.env = rc.env;
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
    let name = `${this.businessId}`;
    if (this.businessName) {
      name = `${this.businessName} (${name})`;
    }
    return this.messageTemplate.replace('%s', name);
  }

  authenticate() {
    vscode.commands.executeCommand('yext.init', {
      businessId: this.businessId,
      env: this.env,
    });
  }
}
