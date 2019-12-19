import firebase from 'firebase'
import 'firebase/firestore'
import "firebase/auth"

if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyDUGqYY5rWqpMNmSlmfnNg0STcQcL61LtI',
    authDomain: 'fgrx-1dcfb.firebaseapp.com',
    databaseURL: 'https://fgrx-1dcfb.firebaseio.com',
    projectId: 'fgrx-1dcfb',
    storageBucket: 'fgrx-1dcfb.appspot.com',
    messagingSenderId: '248446303823',
    appId: '1:248446303823:web:19016a000b0d0cf79ff43a',
    measurementId: 'G-WYHKDCZ6HN'
  }
  firebase.initializeApp(config)
}

const fireDB = firebase.firestore()
const fireAuth = firebase.auth()
export { fireDB , fireAuth}
