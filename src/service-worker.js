const CACHE_NAME = 'network-app-cache';
const urlsToCache = [
  '/dist',
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      }),
  );
});


self.addEventListener('fetch', (event) => {
  if (event.request && event.request.url && event.request.url.includes('chrome-extension')) {
    return;
  }
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          event.waitUntil(
            cache.put(event.request, networkResponse.clone()),
          );
          return networkResponse;
        });
      });
    })
  );
});
