import { jest } from '@jest/globals';
import { gitOperations } from '../src/gitOperations.mjs';

describe('gitOperations', () => {
  let execSyncMock;
  let fsMock;

  beforeEach(() => {
    execSyncMock = jest.fn();
    fsMock = {
      existsSync: jest.fn()
    };
  });

  test('runs all git and composer/npm commands when files exist', () => {
    fsMock.existsSync.mockReturnValue(true);

    gitOperations(execSyncMock, fsMock);

    expect(execSyncMock).toHaveBeenCalledWith('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer upgrade');
    expect(execSyncMock).toHaveBeenCalledWith('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer bump');
    expect(execSyncMock).toHaveBeenCalledWith('npm upgrade');
    expect(execSyncMock).toHaveBeenCalledWith('git add -A');
    expect(execSyncMock).toHaveBeenCalledWith(expect.stringMatching(/git commit -m 'Version \d{4}-\d{2}-\d{2}'/));
    expect(execSyncMock).toHaveBeenCalledWith(expect.stringMatching(/git tag \d{4}-\d{2}-\d{2}/));
    expect(execSyncMock).toHaveBeenCalledWith('git push');
    expect(execSyncMock).toHaveBeenCalledWith('git push --tags');
  });

  test('skips commands if files do not exist', () => {
    fsMock.existsSync.mockReturnValue(false);

    gitOperations(execSyncMock, fsMock);

    expect(execSyncMock).toHaveBeenCalledWith('git add -A');
    expect(execSyncMock).toHaveBeenCalledWith(expect.stringMatching(/git commit -m 'Version \d{4}-\d{2}-\d{2}'/));
    expect(execSyncMock).toHaveBeenCalledWith(expect.stringMatching(/git tag \d{4}-\d{2}-\d{2}/));
    expect(execSyncMock).toHaveBeenCalledWith('git push');
    expect(execSyncMock).toHaveBeenCalledWith('git push --tags');

    expect(execSyncMock).not.toHaveBeenCalledWith('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer upgrade');
    expect(execSyncMock).not.toHaveBeenCalledWith('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer bump');
    expect(execSyncMock).not.toHaveBeenCalledWith('npm upgrade');
  });
});

