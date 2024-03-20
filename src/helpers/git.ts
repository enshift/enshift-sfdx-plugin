import { promisify } from 'node:util';
import { exec } from 'node:child_process';

const promisifiedExec = promisify(exec);

export async function getModifiedFiles(projectPath: string, getStagedOnly: boolean = false): Promise<string[]> {
  const diffCommand = await promisifiedExec(`git diff --name-only ${getStagedOnly ? '--staged' : ''}`, {
    maxBuffer: Infinity,
    cwd: projectPath,
  });

  return diffCommand.stdout.split('\n').filter((val) => val.length);
}
