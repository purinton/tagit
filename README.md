# [![Purinton Dev](https://purinton.us/logos/brand.png)](https://discord.gg/QSBxQnX7PF)

## @purinton/tagit [![npm version](https://img.shields.io/npm/v/@purinton/tagit.svg)](https://www.npmjs.com/package/@purinton/tagit) [![license](https://img.shields.io/github/license/purinton/tagit.svg)](LICENSE) [![build status](https://github.com/purinton/tagit/actions/workflows/nodejs.yml/badge.svg)](https://github.com/purinton/tagit/actions)

A starter template and version management tool for Node.js projects designed to increment project versions, update version files, and automate Git operations including commits and tagging. It serves as a foundation for managing project versioning lifecycle with integrated logging and signal handling.

---

## Table of Contents

- [Features](#features)
- [What It Does](#what-it-does)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Customization](#customization)
- [Support](#support)
- [License](#license)

## Features

- Pre-configured for Node.js (ESM)
- Environment variable support via dotenv
- Detailed logging and signal handling via `@purinton/common`
- Automated version incrementing for `composer.json` and `package.json`
- Git operations: commit changes, tag with version and date, push commits and tags
- Jest testing framework pre-configured
- MIT License

## What It Does

`tagit` automates the versioning workflow for your Node.js projects by:

- Reading and incrementing the semantic version from `composer.json` or `package.json`
- Writing updated versions back to these files
- Committing the changes to Git with message format:  
  `"Version <version> - MM-DD-YYYY"`
- Tagging the commit with the version number
- Pushing commits and tags to the remote repository
- Logging each step with informational messages

This ensures consistent version management and smooth Git operations for your projects.

## Getting Started

1. **Clone this template:**

   ```bash
   git clone https://github.com/purinton/tagit.git
   cd tagit
   rm -rf .git
   git init
   npm install
   ```

2. **Update project details:**

   - Edit `package.json` (name, description, author, etc.)
   - Update this `README.md` as needed
   - Adjust license if required

## Usage

Run the version and Git automation script with:

```bash
./tagit.mjs
```

Or, to simplify usage, you can create a symlink in your system path:

```bash
ln -s /var/opt/tagit/tagit.mjs /usr/bin/tagit
```

Then you can simply run:

```bash
tagit
```

## Development

- Main entry point: `tagit.mjs`
- Core source files under `src/`
- Add or modify code in `src/` as needed

## Testing

- Run tests using:

  ```bash
  npm test
  ```

- Tests are located in `tests/`
- Uses Jest for unit testing and mocking

## Customization

- Modify logging, signal handlers, or version increment logic to fit your needs
- Extend `gitOperations` for custom Git workflows
- Change supported version files or formats in source modules

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
