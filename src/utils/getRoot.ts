import * as vscode from "vscode";

export const getRoot = (): string | undefined => {
  const fileName = vscode.window.activeTextEditor?.document.fileName;
  return vscode.workspace.workspaceFolders
    ?.map((folder) => folder.uri.fsPath)
    .filter((fsPath) => fileName?.startsWith(fsPath))[0] + '/';
}