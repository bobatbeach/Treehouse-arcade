# Treehouse Arcade

Last updated: 2026-11-11 · See CHANGELOG.md for what changed and when.

An offline games app for the kids' iPad. One icon on the home screen opens a hub of games. Once it has been opened online once, it works with no internet.

## What's inside

```
index.html              the hub (game tiles)
games.js                the list of games + version number   <- edit when adding a game
sw.js                   offline saving (service worker)
manifest.webmanifest    app name and icons for "Add to Home Screen"
icons/                  app icon (treehouse)
shared/fonts.css        fonts, stored locally so they work offline
shared/fonts/
games/snack-snakes/     index.html (game), look.js (snake drawing + decorations), icon.png
tools/make-icons.js     redraws the PNG icons:  node tools/make-icons.js  (needs Playwright)
```

## Putting it on the iPad

The app has to be served from an https web address once so the iPad can save it. Free option: GitHub Pages.

1. Make a GitHub repository (e.g. `treehouse-arcade`), upload everything in this folder, then Settings > Pages > Deploy from branch `main` / root.
2. On the iPad, open the Pages address in **Safari** (e.g. `https://yourname.github.io/treehouse-arcade/`).
3. Tap Share > **Add to Home Screen**. Name it, tap Add.
4. Open it once from the new icon while online, so it can save everything. After that it works offline.

Progress (coins, outfits, wins) is saved on that iPad inside the app. Apps added to the Home Screen keep their data; deleting the icon erases it.

## Uploading from a phone (no folders)

Phones can't upload folders to GitHub, so `python3 tools/build-flat.py` makes `dist-flat/`: the same app with every file side by side.
Upload everything in `dist-flat/` to the top level of the repository. This is the copy that goes on GitHub; the folders here are the working source.

## Adding a new game

1. Make a folder `games/<game-id>/` with an `index.html` (plus any other files it needs) and a square `icon.png` (400x400 works well).
2. In the game, link back to the hub with `href="../../index.html"`. Link the shared fonts with `../../shared/fonts.css` if wanted.
3. Add an entry to `ARCADE_GAMES` in `games.js`, listing **every** file the game uses in `files` (that is what gets saved for offline use).
4. In `games.js`, set `ARCADE_UPDATED` to today's date, change `ARCADE_VERSION`, and set the game's `updated` date.
   Update the "Last updated" line at the top of each file you changed, and add a dated entry to `CHANGELOG.md`.
5. Upload the changes. The iPad picks them up the next time the app is opened online, and shows them on the launch after that.

## Snack Snakes notes

- Rounds: 30 seconds or 1 minute.
- Final showdown: you vs. the biggest computer snake of the round. Bigger snake wins.
- Computer snakes have spread-out skill levels (speed, how much they grow per snack, how far they look, how fast they react, how often they chase).
- Adaptive difficulty: `diff` (0 to 1, starts 0.5) sets the best computer snake's skill. Each loss lowers it by 0.09, 0.13, 0.17, then 0.21 per loss as a losing streak grows; each win raises it 0.07.
- Decorations live in `look.js` (`PATTERNS`, `HEADS`, `FACES`, `TAILS`) with their coin costs. The Crown unlocks after 3 showdown wins.
- Saved data key: `snackSnakes.v2` (coins and upgrades carry over from the first version).
