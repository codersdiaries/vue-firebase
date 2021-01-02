import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
// replace the values with your firebase config
var firebaseConfig = {
    apiKey: "AIzaSyAg9hD-y0bre4Gsd1pRl98c9VHIj3wHa6Y",
    authDomain: "test-f415e.firebaseapp.com",
    projectId: "test-f415e",
    storageBucket: "test-f415e.appspot.com",
    messagingSenderId: "92231304841",
    appId: "1:92231304841:web:f1706c17b43e9497516858"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection ref
const usersCollection = db.collection('users')
const gamesCollection = db.collection('games')

export {
    db,
    auth,
    storage,
    usersCollection,
    gamesCollection
}