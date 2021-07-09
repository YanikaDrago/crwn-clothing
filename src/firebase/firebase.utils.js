import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCgm2ZhhEPQQwyoq2wGr-iK75D1UQ6hYt0",
    authDomain: "crwn-db-6ddf4.firebaseapp.com",
    projectId: "crwn-db-6ddf4",
    storageBucket: "crwn-db-6ddf4.appspot.com",
    messagingSenderId: "773651481530",
    appId: "1:773651481530:web:a45e6ca665ec9798265383",
    measurementId: "G-ZEE9Q5PKPY"
  } // на сйте создали проект, при настройке взяли config
  //установили пакет, здесь настраиваем utilis

  export const createUserProfileDocument = async (userAuth, additionalData) => { //async - потомоу что запрос к API
    if (!userAuth) return; //если user не null - мы выходим (нам не надо его сохранять)

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){ //если 'снимка' данных о пользователе не существует, мы его создадим
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {                    // обработчик ошибок
        await userRef.set({    // подождет userRef, потом создаст данные
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };
  // настраиваем сохранение в базу данных firestore

  export const addCollectionAndDocuments = async (
    collectionKey, 
    objectsToAdd
    ) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch(); //пакетный объект (объеденяет/группирует все в один большой запрос)
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc() // сгенерирует id
      batch.set(newDocRef, obj);
    })

    return await batch.commit(); // вернет promise
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
      };
    });

  //вернет объект "название коллекции" = {объект коллекции} - 5    
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator
    }, {});
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({promit: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;

