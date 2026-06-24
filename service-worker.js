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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_eTabpa9spioE_pGOJUZ-wRM4rIvLKGA",
  authDomain: "suria-food-ordering-system.firebaseapp.com",
  projectId: "suria-food-ordering-system",
  storageBucket: "suria-food-ordering-system.firebasestorage.app",
  messagingSenderId: "204528329291",
  appId: "1:204528329291:web:cba270a2968e6d159963ce"
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
