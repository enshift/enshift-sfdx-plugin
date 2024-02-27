import { TestContext } from '@salesforce/core/lib/testSetup.js';
import { expect } from 'chai';
import { stubSfCommandUx } from '@salesforce/sf-plugins-core';
import EnshiftSourceDeploy from '../../../../src/commands/enshift/source/deploy.js';

describe('enshift source deploy', () => {
  const $$ = new TestContext();
  let sfCommandStubs: ReturnType<typeof stubSfCommandUx>;

  beforeEach(() => {
    sfCommandStubs = stubSfCommandUx($$.SANDBOX);
  });

  afterEach(() => {
    $$.restore();
  });

  it('runs hello', async () => {
    await EnshiftSourceDeploy.run([]);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('hello world');
  });

  it('runs hello with --json and no provided name', async () => {
    const result = await EnshiftSourceDeploy.run([]);
    expect(result.flags).to.equal(
      '/Users/hdesmet/Projects/enshift/enshift-sfdx-plugin-next/src/commands/enshift/source/deploy.ts'
    );
  });

  it('runs hello world --name Astro', async () => {
    await EnshiftSourceDeploy.run(['--name', 'Astro']);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('hello Astro');
  });
});
