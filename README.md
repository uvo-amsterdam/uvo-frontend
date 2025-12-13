# UvO Amsterdam

---

## 1. Welcome to UvO Amsterdam repository

This repo contains docs, code for maintaining the website.
If you have any questions, please reach out to the maintainers(Listed in the CODEOWNERS file).

---
## Table of Contents
<!-- TOC -->
* [UvO Amsterdam](#uvo-amsterdam)
  * [1. Welcome to UvO Amsterdam repository](#1-welcome-to-uvo-amsterdam-repository)
  * [Table of Contents](#table-of-contents)
  * [2. Installation](#2-installation)
    * [2.1 Prerequisites](#21-prerequisites)
    * [2.2 Setting Up PNPM](#22-setting-up-pnpm)
      * [Global Installation](#global-installation)
      * [Corepack](#corepack)
  * [3. Running Locally](#3-running-locally)
    * [3.1 Clone Repository](#31-clone-repository)
    * [3.2 Initial Setup](#32-initial-setup)
    * [3.3 Running the Development Server](#33-running-the-development-server)
  * [4. Scripts](#4-scripts)
    * [4.1 Cleaning](#41-cleaning)
      * [`clean`](#clean)
    * [4.2 Development](#42-development)
      * [`dev`](#dev)
    * [4.3 Build](#43-build)
      * [`build`](#build)
    * [4.4 Linting and Formatting](#44-linting-and-formatting)
      * [`format-n-lint`](#format-n-lint)
      * [`format-n-lint:fix`](#format-n-lintfix)
      * [`format-n-lint:ci`](#format-n-lintci)
    * [4.5 Pre-commit Hook](#45-pre-commit-hook)
      * [`pre-commit`](#pre-commit)
  * [5. Contributing](#5-contributing)
<!-- TOC -->

---

## 2. Installation

### 2.1 Prerequisites

1. **Node.js**: version **24.11.1 or higher**  
   [Download Node.js](https://nodejs.org/en/download/)

2. After the installation we need to enable the [PNPM](https://pnpm.io/) package manager - **10.20.0 or higher**.

> **Tip**: You can verify your installed versions by running:
>
> ```sh
> node --version
> pnpm --version
> ```

### 2.2 Setting Up PNPM

You can set up PNPM either **globally** or via **Corepack** (bundled with Node.js):

#### Global Installation

```sh
npm install pnpm -g
```

#### Corepack

```sh
corepack enable
```

Either way, you should now be able to run:

```sh
pnpm --version
```

---

## 3. Running Locally

### 3.1 Clone Repository

To get started, clone this **UvO Amsterdam** repository locally. Use HTTPS or SSH:

```sh
# HTTPS
git clone https://github.com/DennisB-AH/uvo-amsterdam.git

# SSH
git clone git@github.com:DennisB-AH/uvo-amsterdam.git
```

### 3.2 Initial Setup

From within the cloned repository:

```sh
# Install dependencies
pnpm install
```

### 3.3 Running the Development Server

Once dependencies are installed, run:

```sh
pnpm dev
```

This spins up the local development enviroment.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 4. Scripts

Below is an overview of the most important scripts defined in `package.json`. In most cases, you’ll invoke them by running `pnpm <script-name>` from the repository root.

### 4.1 Cleaning

#### `clean`

```sh
pnpm clean
```
- Cleans up build artifacts and other auto-generated files across the repo.

---

### 4.2 Development

#### `dev`

```sh
pnpm dev
```

- Run this command to spin up local development environment for this repo.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### 4.3 Build

#### `build`

```sh
pnpm build
```
- Runs a production build

---

### 4.4 Linting and Formatting

#### `format-n-lint`

```sh
pnpm format-n-lint
```

- Runs [Biome](https://biomejs.dev/) checks as well as [Stylelint](https://stylelint.io/) to ensure style consistency and correct code formatting.

#### `format-n-lint:fix`

```sh
pnpm format-n-lint:fix
```

- Same as above, but applies automatic fixes where possible.

#### `format-n-lint:ci`

```sh
pnpm format-n-lint:ci
```

- Runs Biome in CI mode and Stylelint. Errors out on warnings to ensure strict compliance in CI pipelines.

---

### 4.5 Pre-commit Hook

#### `pre-commit`

```sh
pnpm pre-commit
```

- Automatically triggered by [Husky](https://typicode.github.io/husky/#/) when committing.
- Runs `format-n-lint:fix` so that staged code is kept clean and consistent.

---

## 5. Contributing

1. **Branch & PR**: Create a new branch for any changes, then open a Pull Request.
2. **Lint & Test**: Please ensure your changes pass `pnpm format-n-lint` prior to pushing.

**Happy coding!**  
If you have any questions or suggestions, feel free to open an issue or submit a Pull Request.