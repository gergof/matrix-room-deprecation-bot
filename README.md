# Matrix Room Deprecation Bot

[![Build Status](https://ci.systest.eu/api/badges/gergof/matrix-room-deprecation-bot/status.svg?ref=refs/heads/master)](https://ci.systest.eu/gergof/matrix-room-deprecation-bot)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![matrix](https://img.shields.io/badge/matrix-%23craftobot%3Asystemtest.tk-blue?logo=matrix)](https://matrix.to/#/#craftobot:systemtest.tk)
[![docker image](https://img.shields.io/badge/docker-gergof%2Fmatrix--room--deprecation--bot-blue?logo=docker)](https://hub.docker.com/r/gergof/matrix-room-deprecation-bot)

## Introduction

Room Deprecation Bot is a very simple bot that you can use to migrate from a channel to an other.

Why would you do that? In my case, we had a community that randomly formed on a public room, but it's admin wasn't active during the past year. We could do nothing in that room, so we decided to create a new room and move there. But the people kept joining to the old one, so I created this bot to solve this. When someone joins the old room, he will get a message and he will be invited to the new one as well.

## Usage

#### TL; DR

- Invite [Room Deprecation Bot](https://matrix.to/#/@room-deprecation-bot:systemtest.tk) (@room-deprecation-bot:systemtest.tk) to the old room
- Type `!deprecate <Room ID of the target room>`
- Done.

#### Advanced usage

`!deprecate <room ID>` - redirect users from the current room to an other room. You need to execute this command before you could use any other features

`!deprecate help` - print a help message

`!deprecate get-config` - print the current configuration

`!deprecate message <message>` - set the deprecation message. You can use HTML and [mustache](https://mustache.github.io/)

> You can use the following tags:
>
> `{{currentRoomId}}` - the ID of the current room
>
> `{{roomId}}` - the ID of the target room
>
> `{{{roomLink}}}` - a matrix.to link to the new room

`!deprecate invite <true|false>` - set if the bot will invite the users to this room or not

`!deprecate throttle <time in seconds>` - get the warning triggered only in every X seconds. Default: 600

`!undeprecate` - deregister room from deprecation bot

#### Self-host Room Deprecation Bot

- Pull the following image: [gergof/matrix-room-deprecation-bot](https://hub.docker.com/r/gergof/matrix-room-deprecation-bot)
- Create a folder to store the config and data for the bot
- Create `.env` in that folder based on `.env.sample` (you can also pass the env vars directly to the container)
- Run the container and mount the data folder to `/data`
