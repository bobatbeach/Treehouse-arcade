/* Last updated: 2026-11-11
   Offline cache for Treehouse Arcade.
   Everything is saved on the iPad the first time the app opens online.
   After that the app always opens from the saved copy, and quietly checks for newer files when online. */
importScripts('games.js');
const CACHE = 'treehouse-' + self.ARCADE_VERSION;
const CORE = ['./', 'index.html', 'games.js', 'manifest.webmanifest', 'fonts.css',
  'baloo2-800.woff2', 'nunito-700.woff2', 'nunito-800.woff2',
  'app-180.png', 'app-192.png', 'app-512.png'];
const ALL = CORE.concat(...self.ARCADE_GAMES.map(g => g.files));

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ALL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('treehouse-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }          // saved copy first, refresh in the background
    const res = await net;
    return res || (req.mode === 'navigate' ? cache.match('index.html') : Response.error());
  }));
});
