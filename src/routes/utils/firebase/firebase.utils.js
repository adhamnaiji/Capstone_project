import { initializeApp } from "firebase/app";

import {
getAuth,
signInWithRedirect,
signInWithPopup,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signOut,
onAuthStateChanged,

} from 'firebase/auth';

import {
  getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_4bpelFn44MuGHDFIDsZEa4bwpJNXMrI",
  authDomain: "crwn-clothing-db-4cdec.firebaseapp.com",
  projectId: "crwn-clothing-db-4cdec",
  storageBucket: "crwn-clothing-db-4cdec.appspot.com",
  messagingSenderId: "526060959579",
  appId: "1:526060959579:web:130f41e4f8cbf3f9388c7e"
};

const firebaseApp = initializeApp(firebaseConfig);
const googleprovider =new GoogleAuthProvider();

googleprovider.setCustomParameters({
prompt:"select_account"

});

export const auth=getAuth();

export const signInWithGooglePopup = () => 
signInWithPopup(auth,googleprovider);

export const signInWithGoogleRedirect = ()=>
 signInWithRedirect(auth,googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth=async(userAuth,additionalInformation={}) =>{
  if(!userAuth) return;

    const userDocRef=doc(db,'users',userAuth.uid);
    console.log(userDocRef);

   const userSnapshot = await getDoc(userDocRef);
     console.log(userSnapshot);
    console.log(userSnapshot.exists());


    if(!userSnapshot.exists()){
      const { displayName,email}=userAuth;
      const createdAt=new Date();
      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });

      }catch(error){
        console.log('error creating the user',error.message);

      }
    }
    return userDocRef;

};

export const createAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);
};


export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth,email,password);
};

export const signOutUser= async() =>await signOut(auth);

export const onAuthStateChangedListener=(callback) =>
onAuthStateChanged(auth,callback);
