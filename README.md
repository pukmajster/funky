# Keith

Keith is an open-source mods manager for L4D2, developed with Electron, Svelte and SkeletonUI.

![App](/resources/app.png)

Initially inspired by Left 4 Dead 2's terrible in-game addons menu, I wanted something that gives me more functionallity, like search and a better method of solving conflicts, but the scope has since gotten much broader with lots of other great features and QoL improvements that are not possible in the in-game menu.

## Features

- [x] Grid display with thumbnails and pagination
- [x] Search and filters
- [x] Automatic mod categorization based on mod contents
- [x] Detailed mod inspection
- [x] Batch selection of mods w/ various actions
- [x] Conflict solving menu, showing you exactly which mods are conflicting
- [x] Profiles, letting you quickly hop between various setups
- [x] Mod shuffles that change things up everytime you launch the game
- [x] Unsubscribing from mods via Steam Web API
- [x] VPK browser with extraction 

## Ideas

Here are some ideas or features I'd still like implemented one day

- [ ] Built-in custom config/autoexec editor
- [ ] Local data backup
- [ ] Online data backup
- [ ] Collections
- [ ] Custom vocalizer editor
- [ ] Proper L4D1 Support

## Caveats

While I've found Keith to be extremly useful in organizing my ever growing library of mods, there's still some things to keep in mind:
- The game needs to be restarted before any changes made in Keith can take effect.
- Newly subscribed-to Workshop mods will only be downloaded after you start the game.

So taking both of these points into account, if you've just subscribed to a new mod, you'll have to open up the game, wait for the game to download the mod, close the game, make any changes in Keith and then finally, run the game from within Keith in order for all changes to take effect. Quite clumbersome, but it is what it is.

## Project Setup

### Prep submodules

```bash
$ git submodule init
$ git submodule update
```

### Install dependencies

```bash
$ npm i
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
