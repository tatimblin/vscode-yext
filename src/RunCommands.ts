import * as vscode from "vscode";
import * as fs from "fs";
import { Universe } from "./types";

interface RCFile {
  businessId: number,
  businessName: string,
  env: Universe,
}

export class RunCommands {
  private file: RCFile;

  constructor(fileName: string) {
    this.file = this.readRC(`${this.root}/${fileName}`);
  }

  get businessId(): number {
    return this.file.businessId;
  }

  get businessName(): string {
    return this.file.businessName;
  }

  get env(): Universe {
    return this.file.env;
  }

  get root(): string | undefined {
    const fileName = vscode.window.activeTextEditor?.document.fileName;
    return vscode.workspace.workspaceFolders
      ?.map((folder) => folder.uri.fsPath)
      .filter((fsPath) => fileName?.startsWith(fsPath))[0];
  }

  readRC(path: string): RCFile {
    try {
      return fs.readFileSync(path, 'utf8')
        .split(/\n/)
        .reduce((obj, raw) => {
          const delimted = raw.split(/=/);
          return { ...obj, [delimted[0]]: delimted[1] }
        }, {}) as RCFile;
    }
    catch {
      throw new Error('.yextrc file could not be parsed');
    }
  }
}
