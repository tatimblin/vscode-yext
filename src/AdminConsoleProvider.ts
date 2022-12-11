import * as vscode from "vscode";
import * as fs from "fs";

type LoadProps = {
  parent?: DocumentItem,
  Item: any,
}

export class AdminConsoleProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  accountPath: string;

  constructor(accountPath: string) {
    this.accountPath = accountPath;
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: DocumentItem): Thenable<vscode.TreeItem[]> {
    console.log({ element });
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

    const test = fs.readdirSync(path, { withFileTypes: true })
      .filter((ref) => ![".DS_Store"].includes(ref.name))
      .map((ref) => {
        console.log(ref);
        return new Item(ref, parent)
      });

    return test;
  }
}

export class DocumentItem extends vscode.TreeItem {
  constructor(
    public readonly ref: fs.Dirent,
    public readonly parent?: DocumentItem
  ) {
    super(ref.name, ref.isDirectory()
      ? vscode.TreeItemCollapsibleState.Collapsed
      : vscode.TreeItemCollapsibleState.None);

    this.contextValue = this.type;
    this.command = {
      command: 'yext.openFile',
      title: '',
      arguments: [this],
    };
  }

  get path(): string {
    let item: DocumentItem = this;
    let itemPath = item.ref.name;

    while (item.parent) {
      itemPath = item.parent.ref.name + '/' + itemPath;
      item = item.parent;
    }

    return itemPath;
  }

  get type(): string {
    return this.ref.isDirectory()
      ? 'directory'
      : 'document';
  }
}
