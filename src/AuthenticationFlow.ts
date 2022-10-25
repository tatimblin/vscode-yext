import * as vscode from "vscode";
import * as fs from "fs";
import { RunCommands } from "./RunCommands";

export class AuthenticationFlow {
  private businessId: number;
  private message: string;

  constructor(rc: RunCommands) {
    this.businessId = rc.businessId;
    this.message = `Account configuration found (${this.businessId}), would you like to sign in?`;

    vscode.window.showInformationMessage(this.message, 'Sign In', 'Close');
  }
}
