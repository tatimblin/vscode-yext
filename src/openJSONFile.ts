import * as vscode from "vscode";

export async function openJSONFile(filePath: string) {
  try {
    const doc = await vscode.workspace.openTextDocument(filePath);
    vscode.window.showTextDocument(doc);
  } catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}