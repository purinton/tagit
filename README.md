# [![Purinton Dev](https://purinton.us/logos/brand.png)](https://discord.gg/QSBxQnX7PF)

## @purinton/tagit [![npm version](https://img.shields.io/npm/v/@purinton/tagit.svg)](https://www.npmjs.com/package/@purinton/tagit) [![license](https://img.shields.io/github/license/purinton/tagit.svg)](LICENSE) [![build status](https://github.com/purinton/tagit/actions/workflows/nodejs.yml/badge.svg)](https://github.com/purinton/tagit/actions)

Automated version management and Git operations for Node.js and PHP projects.

**Note:** `tagit` is intended for use on Linux systems only.

---

## Table of Contents

- [What is tagit?](#what-is-tagit)
- [Features](#features)
- [Usage](#usage)
- [Support](#support)
- [License](#license)
- [Links](#links)

## What is tagit?

`tagit` is a CLI utility that automates the process of incrementing your project version, updating version files (`package.json` and/or `composer.json`), committing the changes, tagging the commit, and pushing to your Git repository. It provides detailed logging and robust error handling for a smooth release workflow.

## Features

- Increments the semantic version in `package.json` and/or `composer.json`
- Writes the new version back to the file(s)
- Commits all changes with a message like: `Version <version> - MM-DD-YYYY`
- Tags the commit with the new version
- Pushes commits and tags to your remote repository
- Logs each step for transparency

## Installation

Clone the repository (suggested location: `/opt`):

```bash
sudo git clone https://github.com/rpurinton/tagit.git /opt/tagit
cd /opt/tagit
sudo npm install
# (Optional) Run tests
sudo npm test
```

Create a symlink to make `tagit` available system-wide:

```bash
sudo ln -s /opt/tagit/tagit.mjs /usr/bin/tagit
```

## Usage

Switch to the root directory of the project you want to bump the version for, then run:

```bash
tagit
```

If you have not created the symlink, you can run it directly with:

```bash
/opt/tagit/tagit.mjs
```

## Support

For help or questions, join the community and chat with the author:

[![Discord](https://purinton.us/logos/discord_96.png)](https://discord.gg/QSBxQnX7PF)  
**[Purinton Dev on Discord](https://discord.gg/QSBxQnX7PF)**

## License

[MIT © 2025 Russell Purinton](LICENSE)

## Links

- [GitHub Repo](https://github.com/purinton/tagit)
- [GitHub Org](https://github.com/purinton)
- [GitHub Personal](https://github.com/rpurinton)
- [Discord](https://discord.gg/QSBxQnX7PF)
