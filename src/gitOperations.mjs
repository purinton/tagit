export function gitOperations(execSync, fs) {
    const date = new Date().toISOString().split('T')[0];

    if (fs.existsSync('composer.json')) {
        execSync('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer upgrade');
        execSync('COMPOSER_HOME="." COMPOSER_ALLOW_SUPERUSER=1 composer bump');
    }

    if (fs.existsSync('package.json')) {
        execSync('npm upgrade');
    }

    execSync('git add -A');
    execSync(`git commit -m 'Version ${date}'`);
    execSync(`git tag ${date}`);
    execSync('git push');
    execSync('git push --tags');
}
