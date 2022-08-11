importScripts('https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.2/firebase-messaging.js');

/*
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCY2NvECqyvk_OH60hbGUBiYGVV4A9OKpE",
        authDomain: "messagegate-f664d.firebaseapp.com",
        projectId: "messagegate-f664d",
        storageBucket: "messagegate-f664d.appspot.com",
        messagingSenderId: "815554922507",
        appId: "1:815554922507:web:f914f365465a227d18df0e"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    */

firebase.initializeApp({
    apiKey: "AIzaSyCY2NvECqyvk_OH60hbGUBiYGVV4A9OKpE",
    authDomain: "messagegate-f664d.firebaseapp.com",
    projectId: "messagegate-f664d",
    storageBucket: "messagegate-f664d.appspot.com",
    messagingSenderId: "815554922507",
    appId: "1:815554922507:web:f914f365465a227d18df0e"
});

const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Handling background message', payload);

    // Copy data object to get parameters in the click handler
    payload.data.data = JSON.parse(JSON.stringify(payload.data));

    return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function(event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === target && 'focus' in client) {
                return client.focus();
            }
        }

        return clients.openWindow(target);
    }));
});