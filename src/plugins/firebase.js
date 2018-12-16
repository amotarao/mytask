import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAo1A4AEhdAjoy1ehtntwfF9J1U_WmWTV4',
  authDomain: 'mytask-cde7e.firebaseapp.com',
  databaseURL: 'https://mytask-cde7e.firebaseio.com',
  projectId: 'mytask-cde7e',
  storageBucket: 'mytask-cde7e.appspot.com',
  messagingSenderId: '154142773194',
}
firebase.initializeApp(config)

export default firebase
