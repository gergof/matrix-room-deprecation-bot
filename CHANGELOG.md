# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.3](https://github.com/gergof/matrix-room-deprecation-bot/compare/v1.2.2...v1.2.3) (2021-03-24)


### Bug Fixes

* **invite:** use third word for boolean value (zero-based indexing) ([c4b3819](https://github.com/gergof/matrix-room-deprecation-bot/commit/c4b381917ba327fe6777f020644c8b1d07359e0c))


### CI/Build

* Sign drone yml ([f2d9cd0](https://github.com/gergof/matrix-room-deprecation-bot/commit/f2d9cd0c9b145d5f74793e0604190e42d1637476))
* Transition to drone-ci ([47be068](https://github.com/gergof/matrix-room-deprecation-bot/commit/47be068fd221c28c94591b4aec9bbec550ec0320))


### Documentation

* Update badge ([c9dee9a](https://github.com/gergof/matrix-room-deprecation-bot/commit/c9dee9afac85bff44410c02229d3bc3b37f991a1))

### [1.2.2](https://github.com/gergof/matrix-room-deprecation-bot/compare/v1.2.1...v1.2.2) (2020-02-24)


### Bug Fixes

* **warning:** Throttle only deprecation message, but do the invites ([3be70f0](https://github.com/gergof/matrix-room-deprecation-bot/commit/3be70f0ec449c8d6487b161506100107a74d93cd))

### [1.2.1](https://github.com/gergof/matrix-room-deprecation-bot/compare/v1.2.0...v1.2.1) (2020-02-24)


### Bug Fixes

* **warning:** Don't ignore throttle for join events ([eafddc3](https://github.com/gergof/matrix-room-deprecation-bot/commit/eafddc3c0e7f72cd4827cadb29396ea07f1e1f69))

## 1.2.0 (2020-01-23)


### Features

* Added option to throttle, change message and enable/disable invites. Also added more user friendly commands. ([dcd5216](https://github.com/gergof/matrix-room-deprecation-bot/commit/dcd52169d957cd0d2c5511ff7cb366756339c755))
* Allow to configure deprecation for rooms and send out deprecation warnings when a user joins/writes to the old group. ([a352f91](https://github.com/gergof/matrix-room-deprecation-bot/commit/a352f9131cd0fe4b5a67a20a89363ecb8c684cb4))
* Created logger and config parser ([be9d980](https://github.com/gergof/matrix-room-deprecation-bot/commit/be9d980d6e341537f50a6549be7d39b245bc7a04))
* Handle SIGTERM and close db gracefully. ([b79f2d3](https://github.com/gergof/matrix-room-deprecation-bot/commit/b79f2d3a908e62bdaca366a17ecf1f36e95a7433))


### Bug Fixes

* **logging:** When calling undeprecate the logs only showed undefined ([5b4ca42](https://github.com/gergof/matrix-room-deprecation-bot/commit/5b4ca429b637b3786cf102ecacd4e3c31c4a696d))


### CI/Build

* Automatize build and deploy using docker ([d57a5bb](https://github.com/gergof/matrix-room-deprecation-bot/commit/d57a5bbccd49faaca52a597e839423b552ee2ddc))
* Fix build script ([28c915f](https://github.com/gergof/matrix-room-deprecation-bot/commit/28c915fbe9319f4d7b6820551f706dd824e76cef))
* Initialize project ([87cfd7c](https://github.com/gergof/matrix-room-deprecation-bot/commit/87cfd7ce772bd262df3ca490909f0a36ef6a7a4f))


### Documentation

* Create proper README.md ([3738aec](https://github.com/gergof/matrix-room-deprecation-bot/commit/3738aecdb14bae4a4c2bb8164dbb015f05ad5da8))

### [0.1.2](https://github.com/gergof/matrix-room-deprecation-bot/compare/v0.1.1...v0.1.2) (2019-11-28)


### CI/Build

* Fix build script ([28c915f](https://github.com/gergof/matrix-room-deprecation-bot/commit/28c915fbe9319f4d7b6820551f706dd824e76cef))

### 0.1.1 (2019-11-28)


### Features

* Allow to configure deprecation for rooms and send out deprecation warnings when a user joins/writes to the old group. ([a352f91](https://github.com/gergof/matrix-room-deprecation-bot/commit/a352f9131cd0fe4b5a67a20a89363ecb8c684cb4))
* Created logger and config parser ([be9d980](https://github.com/gergof/matrix-room-deprecation-bot/commit/be9d980d6e341537f50a6549be7d39b245bc7a04))
* Handle SIGTERM and close db gracefully. ([b79f2d3](https://github.com/gergof/matrix-room-deprecation-bot/commit/b79f2d3a908e62bdaca366a17ecf1f36e95a7433))


### CI/Build

* Automatize build and deploy using docker ([d57a5bb](https://github.com/gergof/matrix-room-deprecation-bot/commit/d57a5bbccd49faaca52a597e839423b552ee2ddc))
* Initialize project ([87cfd7c](https://github.com/gergof/matrix-room-deprecation-bot/commit/87cfd7ce772bd262df3ca490909f0a36ef6a7a4f))
