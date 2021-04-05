const firebase = require('firebase')
const admin = require('firebase-admin');

const config = {
  apiKey: "AIzaSyBA9r0y-24Xe_r2clc7Wjwzvww432kZTKs",
  authDomain: "https://student-management-809d9.web.app/",
  storageBucket: "student-management-809d9.appspot.com",
  databaseURL: "https://student-management-809d9-default-rtdb.firebaseio.com/"
};

var serviceAccount = require('../student-management-809d9-firebase-adminsdk-o681a-9cc2ab9fc2.json')
firebase.initializeApp(config);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://student-management-809d9-default-rtdb.firebaseio.com/"
})

const db = firebase.database();
// const auth = firebase.auth();
// const storage = firebase.storage()
// export { db, storage, auth }



async function setUserPermission(){
  let res = await firebase.default.auth().signInWithEmailAndPassword('admin@gmail.com', '123456');
  // let res2 = await admin.auth().setCustomUserClaims(res.user.uid, {
  //   admin: true,
  //   level: 'admin'
  // })

  // let idtoken = await res.user.getIdToken()
  // admin
  // .auth()
  // .verifyIdToken(idtoken)
  // .then((claims) => {
  //   if (claims.admin === true) {
  //     console.log(36)
  //     // Allow access to requested admin resource.
  //   }
  // });

}

async function updateUser(){
  let res = await firebase.default.auth().signInWithEmailAndPassword('admin@gmail.com', '123456');
  let a = await db.ref().child('admins').get();

  console.log(a.val())



  // db.ref('/admins/' + res.user.uid).set({
  //   name: res.user.displayName,
  //   email : res.user.email,
  //   role: 'admin',
  //   user_id: res.user.uid
  // })

}


updateUser()