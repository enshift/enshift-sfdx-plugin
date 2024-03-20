import { exec } from 'node:child_process';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { getModifiedFiles } from '../../../helpers/git.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('enshift-sfdx-plugin', 'enshift.source.deploy');

export type EnshiftSourceDeployResult = void;

export default class EnshiftSourceDeploy extends SfCommand<EnshiftSourceDeployResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');
  public static readonly requiresProject = true;

  public static readonly flags = {
    staged: Flags.boolean({
      char: 's',
      summary: messages.getMessage('flags.staged.summary'),
      description: messages.getMessage('flags.staged.description'),
    }),
  };

  public async run(): Promise<EnshiftSourceDeployResult> {
    const { flags } = await this.parse(EnshiftSourceDeploy);
    const projectPath = this.project?.getPath();

    if (!projectPath) {
      this.error('Could not find a valid project', { exit: 1 });
    }

    const modifiedFiles = await getModifiedFiles(projectPath, flags.staged);

    if (!modifiedFiles.length) {
      this.error('Could not find any files to deploy', { exit: 1 });
    }

    const deployFiles = exec(`sf force:source:deploy --sourcepath="${modifiedFiles.join(',')}"`, {
      cwd: projectPath,
    });

    deployFiles.stdout?.on('data', (data) => {
      this.log(data as string);
    });

    deployFiles.stderr?.on('data', (data) => {
      this.log(data as string);
    });

    // Handle the child process exit event
    deployFiles.on('close', (code) => {
      if (code === 0) {
        this.logSuccess('✅ Deploy successful');
      } else {
        this.logToStderr('❌ Deploy failed');
      }
    });

    // Handle any errors that occur
    deployFiles.on('error', (err) => {
      this.error(err);
    });

    return;
  }
}
