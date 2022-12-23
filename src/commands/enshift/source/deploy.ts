import { flags, SfdxCommand } from "@salesforce/command";
import { Messages, SfdxError, SfdxProject } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";
import {
  parseExamples,
  executePromise,
  executeCommandLine,
} from "../../../helpers/command";
import { getModifiedFiles } from "../../../helpers/git";
import * as util from "util";
import * as child from "child_process";

const exec = util.promisify(child.exec);

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

  public async run(): Promise<AnyJson> {
    const projectPath = await SfdxProject.resolveProjectPath();
    const modifiedFiles = await executePromise(
      getModifiedFiles(projectPath, this.flags.staged),
      "Reading git diff",
      this.ux
    );

    if (!modifiedFiles.length) {
      throw new SfdxError("Could not find any files to deploy");
    }

    this.ux.log(modifiedFiles.join("\n"));

    executeCommandLine(
      exec(
        `sfdx force:source:deploy --sourcepath="${modifiedFiles.join(",")}"`,
        {
          maxBuffer: Infinity,
          cwd: projectPath,
        }
      ),
      "Deploying",
      this.ux,
      false
    ).catch((err) => {
      this.ux.log(err.stdout || err.stderr);
    });

    return;
  }
}
