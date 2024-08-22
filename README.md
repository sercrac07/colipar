# Colipar

[![npm version](https://badge.fury.io/js/colipar.svg)](https://badge.fury.io/js/colipar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Colipar** is a lightweight and flexible tool for capturing and parsing user input from the command line.

## Features

- **Lightweight:** Colipar is lightweight and has a small footprint, making it easy to integrate into your project.
- **Flexible:** Colipar allows you to capture and parse user input from the command line in a flexible and customizable way.
- **TypeScript Support:** Colipar is written in TypeScript, making it easy to use with TypeScript projects.

## Installation

```bash
npm install colipar
pnpm add colipar
yarn add colipar
bun add colipar
```

## Usage

```javascript
const input = colipar({
  flags: {
    msg: { type: "string", short: "m" },
    version: { type: "boolean", short: "v" }
  }
})

// Your code here
```

```bash
my-command --msg "Hello world" # output: { msg: "Hello world", version: false }
my-command -m "Hello world" # output: { msg: "Hello world", version: false }
my-command -v # output: { msg: undefined, version: true }
my-command # output: { msg: undefined, version: false }
```

## API Reference

### `colipar(options)`

Captures and parses user input from the command line.

**Options:**

- `flags` (object): The flags to capture and parse.
  - `type` (string): The type of the flag.
    - `"string"`: The flag is a string.
    - `"boolean"`: The flag is a boolean.
  - `short` (string | undefined): The short version of the flag.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request. Here are some ways you can contribute:

- **Bug Reports:** If you find any bugs or unexpected behavior, please open an issue describing the problem.
- **Feature Requests:** If you have ideas for new features or improvements, feel free to suggest them by opening an issue.
- **Code Contributions:** Contributions to the codebase via pull requests are highly appreciated. Before submitting a pull request, please make sure to follow the contribution guidelines below.

### Contribution Guidelines

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature/fix: `git checkout -b feature-name`.
3. Make changes and test them thoroughly.
4. Ensure that your code follows the existing code style and conventions.
5. Update the README and documentation if necessary.
6. Commit your changes with descriptive commit messages.
7. Push your branch to your fork: `git push origin feature-name`.
8. Open a pull request to the `main` branch of the original repository.

Thank you for contributing to **colipar**!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
