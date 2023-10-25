import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
// import renderCreateAccount from './register.js';
// import { posts } from './post.js';

const firebaseConfig = {
  apiKey: 'AIzaSyA_nNPVRwXqmgLlxdYL4NmJwiItX9t2D5E',
  authDomain: 'social-network-c61c9.firebaseapp.com',
  projectId: 'social-network-c61c9',
  storageBucket: 'social-network-c61c9.appspot.com',
  messagingSenderId: '496904934051',
  appId: '1:496904934051:web:349b4f181faf09491c2516',
  measurementId: 'G-9MSK8FV9VP',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export {
  app, firestore, googleProvider, auth,
};

// Para crear o registrar usuarios
export function createUser(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Registro exitoso', userCredential);
        const user = userCredential.user;
        resolve({ message: 'success', email: user.email });
      })
      .catch((error) => {
        console.error('Error al registrarse:', error.code, error.message, error.serverResponse);
        error.email = email;
        reject(error);
      });
  });
}

// Para iniciar sesion o ingresar
export function login(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Inicio sesion exitoso', userCredential);
        const user = userCredential.user;
        resolve({ message: 'success', email: user.email });
      })
      .catch((error) => {
        console.error('Error al iniciar sesion:', error.code, error.message, error.serverResponse);
        error.email = email;
        reject(error);
      });
  });
}

// funcion save
export function saveTask(title, description) {
  addDoc(collection(firestore, 'post'), { title, description })
    .then((docRef) => {
      console.log('Documento guardado con ID:', docRef.id);
    })
    .catch((error) => {
      console.error('Error al guardar el documento:', error);
    });
  // console.log(title, description)
}

// funcion para registro con google
export function GoogleRegister() {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log('Usuario autenticado con Google:', user);
    })
    .catch((error) => {
      console.error('Error al autenticar con Google:', error.message);
    });
}
