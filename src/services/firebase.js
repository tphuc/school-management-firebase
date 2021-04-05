import firebase from 'firebase';
import 'firebase/database'; 
import serviceAccount from '../student-management-809d9-firebase-adminsdk-o681a-9cc2ab9fc2.json'

const config = {
  apiKey: "AIzaSyBA9r0y-24Xe_r2clc7Wjwzvww432kZTKs",
  authDomain: "https://student-management-809d9.web.app/",
  storageBucket: "student-management-809d9.appspot.com",
  databaseURL: "https://student-management-809d9-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage()
export { db, storage, auth }