self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-app-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCno2NNkzt3gLdC4CfZ4TlhwESQJgI_IXk",
  authDomain: "test-login2-e4c7f.firebaseapp.com",
  databaseURL: "https://test-login2-e4c7f-default-rtdb.firebaseio.com",
  projectId: "test-login2-e4c7f",
  storageBucket: "test-login2-e4c7f.appspot.com",
  messagingSenderId: "698181575885",
  appId: "1:698181575885:web:4e9110486e5c6fd5eab584",
  measurementId: "G-428DYPE8X1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background Message Handler
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  if (payload.notification) {
    const { title, body, icon } = payload.notification;

    self.registration.showNotification(title, {
      body: body || "New notification",
      icon: icon || "/icon.png", // Provide a default icon
    });
  }
});

self.addEventListener("push", (event) => {

  const notif = event.data.json().notification;

  event.waitUntil(self.registration.showNotification(notif.title , {
      body: notif.body,
      icon: notif.image,
      data: {
          url: notif.click_action
      }
  }));

});

self.addEventListener("notificationclick", (event) => {

  event.waitUntil(clients.openWindow(event.notification.data.url));

});


// Handle Notification Clicks
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked.");
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      if (windowClients.length > 0) {
        return windowClients[0].focus();
      } else {
        return clients.openWindow("/");
      }
    })
  );
});
