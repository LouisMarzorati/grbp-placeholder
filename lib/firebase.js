import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDLHcVTh65B3A2uCZ2GBRvJCAWaK1vCoAg',
  authDomain: 'grbp-fd3c5.firebaseapp.com',
  projectId: 'grbp-fd3c5',
  storageBucket: 'grbp-fd3c5.appspot.com',
  messagingSenderId: '619034334079',
  appId: '1:619034334079:web:3d36e8cb9191bc9e6e004a',
  measurementId: 'G-P4EFMV0YL8',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const storage = firebase.storage()
export const signOut = () => auth.signOut()

export function docToJSON(doc) {
  const data = doc.data()
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  }
}
