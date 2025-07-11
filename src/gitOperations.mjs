export function gitOperations(execSync, fs, log, newVersion) {
    const date = new Date().toISOString().split('T')[0];

    log.info('Starting git operations');

    if (fs.existsSync('composer.json')) {
        log.info('composer.json exists - running composer upgrade');
        execSync('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer upgrade');
        log.info('Running composer bump');
        execSync('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer bump');
    }

    if (fs.existsSync('package.json')) {
        log.info('package.json exists - running npm upgrade');
        execSync('npm upgrade');
    }

    log.info('Adding all changes to git');
    execSync('git add -A');
    log.info(`Committing with message: Version ${newVersion}`);
    execSync(`git commit -m 'Version ${newVersion}'`);
    log.info(`Tagging commit with tag: ${newVersion}`);
    execSync(`git tag ${newVersion}`);
    log.info('Pushing commits to origin');
    execSync('git push');
    log.info('Pushing tags to origin');
    execSync('git push --tags');
    log.info('Git operations complete');
}
