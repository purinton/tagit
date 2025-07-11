import { jest } from '@jest/globals';
import { gitOperations } from '../src/gitOperations.mjs';

describe('gitOperations', () => {
  let execSyncMock;
  let fsMock;
  let logMock;

  beforeEach(() => {
    execSyncMock = jest.fn();
    fsMock = {
      existsSync: jest.fn()
    };
    logMock = {
      info: jest.fn(),
      error: jest.fn()
    };
  });

  test('runs all git and composer/npm commands when files exist', () => {
    fsMock.existsSync.mockReturnValue(true);

    gitOperations(execSyncMock, fsMock, logMock);

    expect(logMock.info).toHaveBeenCalledWith('Starting git operations');
    expect(logMock.info).toHaveBeenCalledWith('composer.json exists - running composer upgrade');
    expect(execSyncMock).toHaveBeenCalledWith('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer upgrade');
    expect(logMock.info).toHaveBeenCalledWith('Running composer bump');
    expect(execSyncMock).toHaveBeenCalledWith('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer bump');
    expect(logMock.info).toHaveBeenCalledWith('package.json exists - running npm upgrade');
    expect(execSyncMock).toHaveBeenCalledWith('npm upgrade');
    expect(logMock.info).toHaveBeenCalledWith('Adding all changes to git');
    expect(execSyncMock).toHaveBeenCalledWith('git add -A');
    expect(logMock.info).toHaveBeenCalledWith(expect.stringContaining('Committing with message:'));
    expect(execSyncMock).toHaveBeenCalledWith(expect.stringMatching(/git commit -m 'Version \d{4}-\d{2}-\d{2}'/));
    expect(logMock.info).toHaveBeenCalledWith(expect.stringMatching(/Tagging commit with tag: \d{4}-\d{2}-\d{2}/));
    expect(execSyncMock).toHaveBeenCalledWith(expect.stringMatching(/git tag \d{4}-\d{2}-\d{2}/));
    expect(logMock.info).toHaveBeenCalledWith('Pushing commits to origin');
    expect(execSyncMock).toHaveBeenCalledWith('git push');
    expect(logMock.info).toHaveBeenCalledWith('Pushing tags to origin');
    expect(execSyncMock).toHaveBeenCalledWith('git push --tags');
    expect(logMock.info).toHaveBeenCalledWith('Git operations complete');
  });

  test('skips commands if files do not exist', () => {
    fsMock.existsSync.mockReturnValue(false);

    gitOperations(execSyncMock, fsMock, logMock);

    expect(logMock.info).toHaveBeenCalledWith('Starting git operations');
    expect(execSyncMock).toHaveBeenCalledWith('git add -A');
    expect(logMock.info).toHaveBeenCalledWith(expect.stringContaining('Committing with message:'));
    expect(execSyncMock).toHaveBeenCalledWith(expect.stringMatching(/git commit -m 'Version \d{4}-\d{2}-\d{2}'/));
    expect(logMock.info).toHaveBeenCalledWith(expect.stringMatching(/Tagging commit with tag: \d{4}-\d{2}-\d{2}/));
    expect(execSyncMock).toHaveBeenCalledWith(expect.stringMatching(/git tag \d{4}-\d{2}-\d{2}/));
    expect(logMock.info).toHaveBeenCalledWith('Pushing commits to origin');
    expect(execSyncMock).toHaveBeenCalledWith('git push');
    expect(logMock.info).toHaveBeenCalledWith('Pushing tags to origin');
    expect(execSyncMock).toHaveBeenCalledWith('git push --tags');

    expect(execSyncMock).not.toHaveBeenCalledWith('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer upgrade');
    expect(execSyncMock).not.toHaveBeenCalledWith('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer bump');
    expect(execSyncMock).not.toHaveBeenCalledWith('npm upgrade');
  });
});

