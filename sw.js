/* Altere CACHE_VERSION ao publicar uma atualização dos arquivos do aplicativo. */
const CACHE_VERSION='cad-pwa-2.0.0';
const BASE=new URL('./',self.location.href).href;
const SHELL=['./','index.html','styles.css','app.js','data.js','manifest.webmanifest','feed.json','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','icons/icon-maskable-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_VERSION).then(cache=>cache.addAll(SHELL.map(path=>new URL(path,BASE).href)))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('cad-pwa-')&&k!==CACHE_VERSION).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(BASE))return;
 const relative=url.pathname.slice(new URL(BASE).pathname.length);
 if(req.mode!=='navigate'&&!SHELL.includes(relative)&&relative!=='')return;
 // Prioriza a rede também para o feed: evita prender o celular em notícias antigas.
 const key=new URL(url.href);key.search='';
 event.respondWith((async()=>{const cache=await caches.open(CACHE_VERSION);try{const response=await fetch(req);if(!response.ok)throw Error('Network '+response.status);await cache.put(key.href,response.clone());return response}catch{const saved=await cache.match(key.href);if(saved)return saved;if(req.mode==='navigate')return await cache.match(new URL('index.html',BASE).href)||Response.error();return Response.error()}})());
});
