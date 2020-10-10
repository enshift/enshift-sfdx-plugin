import * as chalk from "chalk";
import { SfdxProject } from "@salesforce/core";
import { UX } from "@salesforce/command";
import fs = require("fs-extra");

interface Example {
  command: string;
  description: string;
}

export function parseExamples(examples: Example[]): string[] {
  return examples.map((example) => {
    return `${chalk.white(example.command)}
    ${chalk.dim(example.description)}`;
  });
}

export async function executePromise(
  promise: Promise<any>,
  description: string,
  ux: UX,
  shouldLogError?: boolean
): Promise<any> {
  return execute(promise, description, ux, shouldLogError);
}

export async function executeCommandLine(
  promise: Promise<{
    stdout: string;
    stderr: string;
}>,
  description: string,
  ux: UX,
  shouldLogError?: boolean
): Promise<{
    stdout: string;
    stderr: string;
}> {
  return execute(promise, description, ux, shouldLogError);
}

async function execute(promise: Promise<any>,
  description: string,
  ux: UX,
  shouldLogError: boolean = true
): Promise<any> {
  ux.startSpinner(chalk.yellowBright(`🤖 ${description}`));

  const projectPath = await SfdxProject.resolveProjectPath();

  await promise
    .then(() => {
      ux.stopSpinner(chalk.greenBright("✅ Success"));
    })
    .catch((error) => {
      const errorLog = `${projectPath}/logs/${Date.now()}.log`;

      ux.error(
        chalk.redBright(`❌ Operation failed`)
      );

      if (shouldLogError) {
        fs.outputFile(errorLog, JSON.stringify(error));
        ux.error(
          chalk.whiteBright(`📋 Error log saved at: ${errorLog}`)
        )
      }
    });

  return promise;
}
