import * as fs from "fs";
import { Universe } from "./types";
import { getRoot } from "./utils";

interface RunCommandFile {
  businessId: number,
  businessName: string,
  env: Universe,
}

export class RunCommand {
  private businessId: number;
  private businessName: string;
  private env: Universe;

  constructor({
    businessId = 0,
    businessName = "Unknown",
    env = Universe.Production,
  }) {
    this.businessId = businessId;
    this.businessName = businessName;
    this.env = env;
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

  readFile(filepath: string) {
    const file = this.parseFile(filepath);
    Object.assign(this, file);
  }

  parseFile(filepath: string): RunCommandFile {
    try {
      return fs.readFileSync(getRoot() + filepath, 'utf8')
        .split(/\n/)
        .reduce((obj, raw) => {
          const delimted = raw.split(/=/);
          return { ...obj, [delimted[0]]: delimted[1] }
        }, {}) as RunCommandFile;
    }
    catch {
      throw new Error("RunCommand file could not be parsed at: " + getRoot() + filepath);
    }
  }

  writeFile(filepath = ".yextrc") {
    fs.writeFileSync(getRoot() + filepath, this.createFile());
  }

  createFile(): string {
    return [
      `businessId=${this.businessId}`,
      `businessName=${this.businessName}`,
      `env=${this.env}`
    ].join('\n');
  }
}
