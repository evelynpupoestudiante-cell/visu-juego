const CACHE='visu-v3';
const SHELL=['./visu_juego.html','./visu_manifest.json'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys()
    .then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('script.google.com'))return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
