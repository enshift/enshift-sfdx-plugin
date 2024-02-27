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

  it('throws an error', async () => {
    try {
      await EnshiftSourceDeploy.run([]);
    } catch (error) {
      expect(error).to.be.an('error');
    }

    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');

    expect(output).to.equal('');
  });
});
