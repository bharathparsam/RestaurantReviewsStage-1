var CacheName = 'restaurant-cache';
/*
 * Function to fetch Files from Internet
 */
self.addEventListener('fetch', function(e) {
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) return response;
      return fetch(e.request);
    })
  );
});
/*
 * An Event to cache the visited webpages when loaded
 * for the very first time
 */

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CacheName).then(function(cache) {
      console.log('Caching files.')
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/js/dbhelper.js',
        '/js/restaurant_info.js',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDpNTXSpTh2uXmmFEzBD8b0ibCNfEWazCU&libraries=places&callback=initMap',
        '/js/main.js',
        '/css/styles.css',
        '/data/restaurants.json',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg'
      ]);
    })
  );
});

/*
 * Event to update cache if any new changes are made in the website
 */
self.addEventListener('activate', function(e) {
  console.log('Service worker activated');
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {
        if (thisCacheName !== CacheName) {
          console.log('Service Worker removing cached files from ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }))
    })
  )
});
