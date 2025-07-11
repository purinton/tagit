import { incrementVersion } from './incrementVersion.mjs';

export async function updateVersionFiles(fs) {
  const composerFile = 'composer.json';
  const packageFile = 'package.json';
  let newVersion = null;

  if (fs.existsSync(composerFile)) {
    const composerContent = fs.readFileSync(composerFile, 'utf-8');
    const composerData = JSON.parse(composerContent);

    if (!composerData.version) {
      throw new Error('Version not found in composer.json.');
    }

    newVersion = incrementVersion(composerData.version);
    composerData.version = newVersion;

    const newContent = JSON.stringify(composerData, null, 4);
    fs.writeFileSync(composerFile, newContent);
  }

  if (fs.existsSync(packageFile)) {
    const packageContent = fs.readFileSync(packageFile, 'utf-8');
    const packageData = JSON.parse(packageContent);

    if (!packageData.version) {
      throw new Error('Version not found in package.json.');
    }

    if (!newVersion) {
      newVersion = incrementVersion(packageData.version);
    }
    packageData.version = newVersion;

    const newPkgContent = JSON.stringify(packageData, null, 4);
    fs.writeFileSync(packageFile, newPkgContent);
  }

  return newVersion;
}
