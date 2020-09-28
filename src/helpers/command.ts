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
  ux: UX
): Promise<any> {
  ux.startSpinner(chalk.yellowBright(`🤖 ${description}`));

  const projectPath = await SfdxProject.resolveProjectPath();

  await promise
    .then((success) => {
      ux.stopSpinner(chalk.greenBright("✅ Success"));
    })
    .catch((error) => {
      const errorLog = `${projectPath}/logs/${Date.now()}.log`;
      fs.outputFile(errorLog, JSON.stringify(error));

      ux.error(
        chalk.redBright(`❌ Operation failed, error log saved at: ${errorLog}`)
      );
    });

  return promise;
}
