import * as vscode from "vscode";
import * as fs from "fs";

export type Universe = 'staging' | 'production';

interface RCFile {
  businessId: number,
  universe: Universe,
}

export class RunCommands {
  private file: RCFile;

  constructor(fileName: string) {
    this.file = this.readRC(`${this.root}/${fileName}`);
  }

  get businessId(): number {
    return this.file.businessId;
  }

  get universe(): string {
    return this.file.universe;
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
      console.log('file not found');
      return {
        businessId: 1,
        universe: 'staging',
      };
    }
  }
}
