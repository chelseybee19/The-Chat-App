import firebase from "firebase";

class Fire {
    constructor() {
        this.init();
        this.checkAuth();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                
                    apiKey: "AIzaSyCsh1kv2MU9cMavzXjeF6dVxTo3WCO--mA",
                    authDomain: "the-chat-app-6116f.firebaseapp.com",
                    databaseURL: "https://the-chat-app-6116f.firebaseio.com",
                    projectId: "the-chat-app-6116f",
                    storageBucket: "the-chat-app-6116f.appspot.com",
                    messagingSenderId: "918228676459",
                    appId: "1:918228676459:web:db65b494a3faf915c3a62e",
                    measurementId: "G-9ZS1C1R5PG"
                  
            });
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();