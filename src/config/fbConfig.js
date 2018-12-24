import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Key from './Key'

// Initialize Firebase
  var config = {
    apiKey: Key.apiKey,
    authDomain: "msg-board-58031.firebaseapp.com",
    databaseURL: "https://msg-board-58031.firebaseio.com",
    projectId: "msg-board-58031",
    storageBucket: "msg-board-58031.appspot.com",
    messagingSenderId: "409426006321"
  }

  firebase.initializeApp(config)
  firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase
