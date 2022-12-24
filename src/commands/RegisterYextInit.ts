import * as vscode from "vscode";
import { spawn } from "child_process";
import { Universe } from "../types";
import { exitCode } from "process";

interface RegisterYextInitArgs {
  businessId?: string,
  env?: Universe,
}

export const RegisterYextInit = () => {
  vscode.commands.registerCommand('yext.init', async ({
    businessId,
    env
  }: RegisterYextInitArgs = {}) => {
    const _businessId = businessId || await promptBusinessId();
    const _env = env || await promptEnv();

    if (!_businessId) {
      vscode.window.showErrorMessage('Could not initialize account: Business ID not set');
      return;
    }

    if (!_env) {
      vscode.window.showErrorMessage('Could not initialize account: env not set');
      return;
    }

    const command = 'yext';
    const args = ['init', _businessId, '-u', _env];
    
    const childProcess = spawn(command, args, { shell: true });
    let output: string[] = [];
    childProcess.stdout.on('data', d => {
      output.push(d.toString());
    });
    childProcess.on('exit', (exitCode) => {
      vscode.window.showInformationMessage(output.join('\n'));

      if (exitCode) {
        vscode.window.showErrorMessage('Could not initialize account: Yext CLI Failed');
        return;
      }

      vscode.commands.executeCommand("yext.credentials.refresh");
    });
  });
}

const promptBusinessId = async (): Promise<string | undefined> => {
  let businessId: string | undefined;

  try {
    await vscode.window.showInputBox({
      title: 'Business ID',
      prompt: 'https://yext.com/s/<BUSINESS ID>/...',
      placeHolder: '3728752',
    })
      .then(response => businessId = response);
  } catch {
    throw new Error('Could not set businessId');
  }

  return businessId;
}

const promptEnv = async (): Promise<Universe | undefined> => {
  let env: Universe | undefined;

  try {
    await vscode.window.showQuickPick([
      {
        label: "Production",
        description: "For most users",
        detail: Universe.Production,
      },
      {
        label: 'Staging',
        description: "internal test accounts",
        detail: Universe.Staging,
      },
    ])
      .then(response => env = response?.detail as Universe);
  } catch {
    throw new Error('Could not set env');
  }

  return env;
}