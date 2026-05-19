importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAxSyfXuj4pLzNbOBrMlX3HKGTxi0O2VuQ",
    authDomain: "mihrabapp-32e80.firebaseapp.com",
    projectId: "mihrabapp-32e80",
    storageBucket: "mihrabapp-32e80.firebasestorage.app",
    messagingSenderId: "1057466774502",
    appId: "1:1057466774502:web:0c8f703b608ac84d8c9c27"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Background message received:', payload);
    const notificationTitle = payload.notification?.title || 'محراب';
    const notificationOptions = {
        body: payload.notification?.body || '',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        dir: 'rtl',
        lang: 'ar',
        vibrate: [200, 100, 200],
        requireInteraction: true
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event.notification);
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
