import * as vscode from "vscode";
import * as fs from "fs";

type LoadProps = {
  parent?: DocumentItem,
  Item: any,
}

export class CredentialsProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  accountPath: string;

  constructor(accountPath: string) {
    this.accountPath = accountPath + 'env';
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: DocumentItem): Thenable<vscode.TreeItem[]> {
    return Promise.all([
      this.load({
        parent: element,
        Item: DocumentItem,
      }),
    ])
      .then(([items]) => [...items])
      .catch(() => []);
  }

  async load({
    parent,
    Item,
  }: LoadProps): Promise<vscode.TreeItem[]> {
    const path = parent?.path
      ? this.accountPath + '/' + parent.path
      : this.accountPath;

    return this.getAllFiles(path)
      .map(ref => new Item(ref));
  }

  getAllFiles(dirPath: string, arrayOfFiles: fs.Dirent[] = []) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const ref of files) {
      if (this.isInvalidName(ref.name)) {
        continue;
      }

      const path = `${dirPath}/${ref.name}`;

      if (ref.isDirectory()) {
        arrayOfFiles = this.getAllFiles(path, arrayOfFiles);
      } else {
        ref.path = path;
        arrayOfFiles.push(ref);
      }
    }

    return arrayOfFiles;
  }

  isInvalidName(fileName: string): boolean {
    return ['.DS_Store', 'variables.json', 'default']
      .includes(fileName);
  }
}

export class DocumentItem extends vscode.TreeItem {
  constructor(
    public readonly ref: fs.Dirent
  ) {
    super(ref.name, vscode.TreeItemCollapsibleState.None);

    this.contextValue = 'document';
    // this.command = {
    //   command: 'yext.openFile',
    //   title: '',
    //   arguments: [this],
    // };
    this.iconPath = new vscode.ThemeIcon("key");
  }

  get path() {
    return this.ref.path;
  }
}
