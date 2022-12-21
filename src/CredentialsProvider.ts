import * as vscode from "vscode";
import * as fs from "fs";
import { Credential, CredentialFile } from "./Credential";

type LoadProps = {
  parent?: Credential,
  Item: any,
}

export class CredentialsProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Credential): Thenable<vscode.TreeItem[]> {
    return Promise.all([
      this.load({
        parent: element,
        Item: Credential,
      }),
    ])
      .then(([items]) => [...items])
      .catch(() => []);
  }

  async load({
    Item,
  }: LoadProps): Promise<vscode.TreeItem[]> {
    return this.getAllFilesInDirectory(`${this.path}env`)
      .map(ctx => new Item(...ctx, this.getActiveCredential()));
  }

  getAllFilesInDirectory(dirPath: string, arrayOfFiles: [fs.Dirent, string][] = []) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const ref of files) {
      if (this.isInvalidName(ref.name)) {
        continue;
      }

      const path = `${dirPath}/${ref.name}`;

      if (ref.isDirectory()) {
        arrayOfFiles = this.getAllFilesInDirectory(path, arrayOfFiles);
      } else {
        arrayOfFiles.push([ref, path]);
      }
    }

    return arrayOfFiles;
  }

  getActiveCredential(): CredentialFile {
    const raw = fs.readFileSync(`${this.path}current/active-credential`, { encoding:'utf8' });
    const json = JSON.parse(raw);
    const parts = json.cred.split("-");

    return {
      businessId: parseInt(parts.pop()),
      businessName: parts.join("-"),
      env: json.env,
      name: json.cred,
    };
  }

  isInvalidName(fileName: string): boolean {
    return ['.DS_Store', 'variables.json', 'default']
      .includes(fileName);
  }
}
