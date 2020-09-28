import * as util from "util";
import * as child from "child_process";

const exec = util.promisify(child.exec);

export async function getModifiedFiles(projectPath: string, getStagedOnly: boolean = false): Promise<string[]> {
  const diffCommand = await exec(`git diff --name-only ${getStagedOnly ? '--staged' : ''}`, {
    maxBuffer: Infinity,
    cwd: projectPath,
  });

  return diffCommand.stdout.split('\n').filter(val => val.length);
}
