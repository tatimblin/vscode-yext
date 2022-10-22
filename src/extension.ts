import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Try and say hello world', context);

  let displosable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World!');
  });
}

export function deactivate() {}
