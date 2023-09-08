import { flags, SfdxCommand } from "@salesforce/command";
import { Messages, SfdxError, SfdxProject } from "@salesforce/core";
import * as chalk from "chalk";
import * as child from "child_process";
import { executePromise, parseExamples } from "../../../helpers/command";
import { getModifiedFiles } from "../../../helpers/git";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages("enshift-sfdx-plugin", "source.deploy");

export default class SourceDeploy extends SfdxCommand {
  public static description = messages.getMessage("command.description");
  public static examples = parseExamples([
    {
      command: "$ sfdx enshift:source:deploy",
      description:
        "Selectively deploys the metadata currently marked as modified in git",
    },
    {
      command: "$ sfdx enshift:source:deploy --staged",
      description:
        "Selectively deploys the metadata currently marked as staged in git",
    },
  ]);

  protected static flagsConfig = {
    staged: flags.boolean({
      char: "s",
      description: messages.getMessage("flag.staged"),
    }),
  };

  protected static requiresUsername = true;
  protected static requiresProject = true;

  public async run(): Promise<void> {
    const projectPath = await SfdxProject.resolveProjectPath();
    const modifiedFiles = await executePromise(
      getModifiedFiles(projectPath, this.flags.staged),
      "Reading git diff",
      this.ux
    );

    if (!modifiedFiles.length) {
      throw new SfdxError("Could not find any files to deploy");
    }

    const childProcess = child.exec(
      `sfdx force:source:deploy --sourcepath="${modifiedFiles.join(",")}"`,
      {
        cwd: projectPath,
      }
    );

    childProcess.stdout.on("data", (data) => {
      this.ux.log(data.toString());
    });

    childProcess.stderr.on("data", (data) => {
      this.ux.log(data.toString());
    });

    // Handle the child process exit event
    childProcess.on("close", (code) => {
      if (code === 0) {
        this.ux.log(chalk.greenBright("✅ Success"));
      } else {
        this.ux.error(chalk.redBright(`❌ Failed`));
      }
    });

    // Handle any errors that occur
    childProcess.on("error", (err) => {
      this.ux.error(chalk.redBright(`❌ Error: ${err.message}`));
    });

    return;
  }
}
