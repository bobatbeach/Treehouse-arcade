/* Last updated: 2026-11-11
   The list of games in the arcade.
   To add a game: put its folder in games/, add an entry here, and list every file it needs in `files`
   so it works offline. Used by the hub (index.html) and the offline cache (sw.js).
   Whenever ANY file changes: set ARCADE_UPDATED to today's date and change ARCADE_VERSION,
   so iPads pick up the update. The hub shows ARCADE_UPDATED at the bottom of the screen. */
self.ARCADE_UPDATED = '2026-11-11';
self.ARCADE_VERSION = '2026-11-11c';
self.ARCADE_GAMES = [
  {
    id: 'snack-snakes',
    name: 'Snack Snakes',
    updated: '2026-11-11',   // date this game last changed; shown on its tile
    page: 'snack-snakes.html',
    icon: 'snack-snakes-icon.png',
    color: '#86cf6a',
    files: ['snack-snakes.html', 'snack-snakes-icon.png']
  }
];
