import * as vscode from "vscode";
import * as fs from "fs";
import { isDeepStrictEqual } from "util";
import { Universe } from "./types";

export interface CredentialFile {
  accessCode?: string,
  businessId: number,
  businessName: string,
  env: Universe,
  name: string,
}

export class Credential extends vscode.TreeItem {
  private filepath: string;
  private businessName: string;
  private businessId: number;
  private env: Universe;

  constructor(
    ref: fs.Dirent,
    filepath: string,
    activeCredential: CredentialFile
  ) {
    super(ref.name, vscode.TreeItemCollapsibleState.None);

    this.env = Universe.Production;
    this.businessId = 0;
    this.businessName = "Unknown";

    const credentialFile = this.parseCredentialFile(filepath)
    Object.assign(this, credentialFile);

    this.filepath = filepath;
    this.label = this.businessName;
    this.description = this.businessId.toString();
    this.tooltip = this.env;

    delete credentialFile.accessCode;
    if (isDeepStrictEqual(credentialFile, activeCredential)) {
      this.contextValue = "activeCredential";
      this.iconPath = new vscode.ThemeIcon("unlock");
    } else {
      this.contextValue = "inactiveCredential";
      this.iconPath = new vscode.ThemeIcon("lock");
    }
    
  }

  get path(): string {
    return this.filepath;
  }

  getBusinessId(): number {
    return this.businessId;
  }

  getBusinessName(): string {
    return this.businessName;
  }

  getEnv(): Universe {
    return this.env;
  }

  parseCredentialFile(filepath: string): CredentialFile {
    const raw = fs.readFileSync(filepath, { encoding:'utf8' });
    return JSON.parse(raw);
  }
}
