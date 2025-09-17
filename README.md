# OpenMMO

An open sourced mmo rpg game.

Check us out at [openmmo.fun](https://openmmo.fun)

[![License](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0) [![Top Language](https://img.shields.io/github/languages/top/limitedleaf/OpenMMO.svg)](https://github.com/limitedleaf/OpenMMO) [![Last Commit](https://img.shields.io/github/last-commit/limitedleaf/OpenMMO.svg)](https://github.com/limitedleaf/OpenMMO/commits)
 ![Development](https://img.shields.io/badge/Status-Dev-orange)

[![Stars](https://img.shields.io/github/stars/limitedleaf/OpenMMO?style=social)](https://github.com/limitedleaf/OpenMMO/stargazers)
[![Forks](https://img.shields.io/github/forks/limitedleaf/OpenMMO?style=social)](https://github.com/limitedleaf/OpenMMO/network/members)

## Inspiration

This project was inspired by games like `Old School Runescape`. The core idea of the project is to make a mmo rpg with all time beloved retro mechanics while supporting modern graphics.

## Project Design

The project is designed with scalability in mind while keeping in mind the performance.

The core process and networking will use an object oriented event driven architecture while the game it self will run on a custom made ecs framework

As for tooling and 3rd party dependencies the projects tends to avoid them and use the bare minimum. This is mainly because the author (myself) likes to make his own stuff :]

The project consists of three parts mainly which are client, server and core the core contains all the logic and utilities shared by both client and server. The server which is compiled by the Typescript Compiler and is run by node is meant to be light weight and only do the bare minimum a server should do. The client does the heavy lifting it does all rendering, visual etc. The client is compiled using vite and is dynamically loaded using vite and custom made client router (The project takes an SPA based approach to handling webpages).

## Contributing

### Quickstart

- Setup project with

```bash
npm install
```

- Build Server with

```bash
npm run build:server
```

- Build client with

```bash
npm run build:client
```

- Build both with

```bash
npm run build
```

- Setup auto reloading dev env with

```bash
npm run dev
```

- Launch the built server with

```bash
npm run start
```

### Requirements

- NodeJS
- Code Editor (VSCode recommended)

### Recommended VSCode Extensions

- ESLint
- Prettier

### Rules

- Your changes should be checked for any vulnerabilities
- Your code must pass all the tests
- Your code must be formatted according to the repo standard
- Your code must blend in well with design principles of the project (mentioned in project design)

### Setup

- Clone the git repo using

```bash
git clone https://github.com/limitedleaf/OpenMMO
```

- Create a `feature/my-feature` or `bugfix/my-bug-fix` branch for your changes.

```bash
git checkout -b feature/cool-feature
```

- Commit your changes with a nice clear and concise commit message

```bash
git commit -m "My very professional commit message"
```

- Push your changes to your fork.

```bash
git push origin HEAD
```

- Open a pull request to the `dev` branch of the OpenMMO repo and make sure to clearly detail you changes in your pull request!

Thank you for willing to contribute to this project!

## Todo List

They are ordered based on their priority

### Core & Networking

- [x] Logging setup
- [ ] Event system setup.
- [ ] Core utility setup.
- [ ] Core HTTP server.
- [ ] Client router.
- [ ] Home webpage.
- [ ] Database integration.
- [ ] Login and authentication.
- [ ] Login webpage.
- [ ] Core UDP server.

### Game design

- [ ] Core ECS framework.
- [ ] WebGPU based rendering.
- [ ] Game map loading and rendering.
- [ ] Game UI rendering.
- [ ] Player entity and movement.
- [ ] Player characters.
- [ ] Inventories and Items.
- [ ] Basic combat.
- [ ] Skilling system.
- [ ] Cutscence and Animations.
- [ ] NPCs and their behavior.
- [ ] Bosses and leveling system.
- [ ] Main storyline design.
- [ ] Quests.
- [ ] Game economy design.
- [ ] Player trading and auction house.
- [ ] NPCs shops.
- [ ] Game store, micro transactions and memberships.
- [ ] Store webpage design.
- [ ] 3d Modelling and 2d sprite designs.
- [ ] Optimization and security testing.
- [ ] Character customization.
- [ ] Player chat.
- [ ] Player security and rule enforcement.

### Development & Maintenance

- [ ] Testing framework setup.
- [ ] Custom level editor.
- [ ] Server deployment, stability testing and stress test.
- [ ] Final touches and polishing.
- [ ] Deployment, rollback, backups.
- [ ] Damage control testing.
- [ ] Game economy safety and damage control.

### Community

- [x] Obtaining a cool domain
- [ ] Proper Discord server setup and game promotion.
- [ ] Bug reporting channels.
- [ ] Alpha testing and bugfix.
- [ ] Moderation tools for discord and game.
- [ ] Beta testing and pre-release.
- [ ] Official PC web release.

### Accessibility

- [ ] Colorblind support and text scaling etc.
- [ ] Settings  UI.
- [ ] Cross platform UI.
- [ ] Localization support.
- [ ] Steam port.
- [ ] Mobile support.

## License

This project source code is licensed under the AGPL-3.0 license which allows the user to modify and distribute as long as the modified material is licensed under the same license and the author of the original code is attributed properly.

All non code assets though available for public viewing are proprietary assets of the author and can only be modified and distributed with the exclusive permission of the author. Contact `limitedleaf7` on `discord` or `limitedleaf7@gmail.com` via `email` for more info.
