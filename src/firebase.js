import {
  deleteDoc,
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';
import { initializeApp } from 'firebase/app';

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
const storage = getStorage(app);
export {
  app, firestore, googleProvider, auth,
};

// Para crear o registrar usuarios
export function createUser(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve({ message: 'success', email: user.email });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Para iniciar sesion o ingresar
export function login(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve({ message: 'success', email: user.email });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function saveTask(title, description, imageFile) {
  const postCollection = collection(firestore, 'post');
  const postCreated = {
    title,
    description,
    likes: 0,
    likedBy: [],
  };

  if (!imageFile) {
    await addDoc(postCollection, postCreated);
  } else {
    const imageName = `${Date.now()}_${imageFile.name}`;
    const storageRef = ref(storage, `/img/${imageName}`);
    const imageUrl = await uploadBytes(storageRef, imageFile)
      .then(() => getDownloadURL(storageRef));
    postCreated.image = imageUrl;
    await addDoc(postCollection, postCreated);
  }
}

// funcion para registro con google
export function GoogleRegister(navigateTo) {
  signInWithPopup(auth, googleProvider)
    .then(() => {
      navigateTo('/posts');
    })
    .catch(() => {
      navigateTo('/');
    });
}

// export function handleLike(postId, userId, callback) {
//   const likesCollection = collection(firestore, 'likes');
//   const likeButton = document.querySelector(
//     `.likeButton[data-post-id="${postId}"]`,
//   );
//   const likeQuery = query(
//     likesCollection,
//     where('postId', '==', postId),
//     where('userId', '==', userId),
//   );

//   // Ejecuta la consulta para verificar si el usuario ya ha dado like
//   getDocs(likeQuery)
//     .then((querySnapshot) => {
//       // Verifica si no hay likes existentes del usuario para esta publicación
//       if (querySnapshot.empty) {
//         const postRef = doc(firestore, 'post', postId);

//         // Obtiene la información actual de la publicación
//         getDoc(postRef)
//           .then((docSnapshot) => {
//             if (docSnapshot.exists()) {
//               const currentLikes = docSnapshot.data().likes;
//               const updatedLikes = currentLikes + 1;
//               likeButton.style.background = 'green';
//               // Actualiza la cantidad de likes en la publicación
//               updateDoc(postRef, { likes: updatedLikes })
//                 .then(() => {
//                 //  console.log('Like registrado con éxito.');

//                   // Agrega un nuevo documento de like
//                   addDoc(likesCollection, { postId, userId })
//                     .then(() => {
//                       console.log('Nuevo like registrado con éxito.');
//                       callback(); // Llama al callback después de manejar el like
//                     })
//                     .catch((error) => {
//                       console.error('Error al agregar nuevo like:', error);
//                     });
//                 })
//                 .catch((error) => {
//                   console.error('Error al actualizar likes:', error);
//                 });
//             }
//           })
//           .catch((error) => {
//             console.error('Error al obtener documento de publicación:', error);
//           });
//       } else {
//         // El usuario ya ha dado like antes, manejar según sea necesario
//         const likeDoc = querySnapshot.docs[0]; // Obtén el documento de like existente
//         const likeId = likeDoc.id;

//         // Elimina el like existente
//         deleteDoc(doc(likesCollection, likeId))
//           .then(() => {
//             console.log('Like eliminado con éxito.');

//             // Obtiene la información actual de la publicación
//             const postRef = doc(firestore, 'post', postId);
//             getDoc(postRef)
//               .then((docSnapshot) => {
//                 if (docSnapshot.exists()) {
//                   const currentLikes = docSnapshot.data().likes;
//                   const updatedLikes = currentLikes - 1;

//                   // Actualiza la cantidad de likes en la publicación
//                   updateDoc(postRef, { likes: updatedLikes })
//                     .then(() => {
//                       console.log('Like actualizado con éxito.');
//                       callback(); // Llama al callback después de manejar el unlike
//                     })
//                     .catch((error) => {
//                       console.error('Error al actualizar likes:', error);
//                     });
//                 }
//               })
//               .catch((error) => {
//                 console.error(
//                   'Error al obtener documento de publicación:',
//                   error,
//                 );
//               });
//           })
//           .catch((error) => {
//             console.error('Error al eliminar like:', error);
//           });
//       }
//     })
//     .catch((error) => {
//       console.error('Error al realizar la consulta de likes:', error);
//     });
// }

// delete post
export function deletePost(postId) {
  const postCollection = collection(firestore, 'post');
  const postDocRef = doc(postCollection, postId);
  deleteDoc(postDocRef);
    // .then(() => {
    //   console.log('Post eliminado con éxito.');
    // })
    // .catch((error) => {
    //   console.error('Error al borrar post:', error);
    // });
}

// edit post
export function editPost(postId, updatedTitle, updatedDescription) {
  return new Promise((resolve, reject) => {
    const postRef = doc(firestore, 'post', postId);
    updateDoc(postRef, {
      title: updatedTitle,
      description: updatedDescription,
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
}

// likes
export async function handleLike(postId, userLikedId) {
  const postRef = doc(firestore, 'post', postId);
  const docSnap = await getDoc(postRef);
  if (docSnap.exists()) {
    let postLikesUsers = docSnap.data().likedBy;
    if (postLikesUsers.includes(userLikedId)) {
      postLikesUsers = postLikesUsers.filter((userId) => userId !== userLikedId);
    } else {
      postLikesUsers.push(userLikedId);
    }
    await updateDoc(postRef, {
      likedBy: postLikesUsers,
      likes: postLikesUsers.length,
    });
  }
}

// funcion cerrar sesion
export function logOut(navigateTo) {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        navigateTo('/');
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function initializeAuth(setupPost, navigateTo) {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userPostsCollection = collection(firestore, 'post');
        onSnapshot(userPostsCollection, (snapshot) => {
          const newPostList = [];
          snapshot.forEach((post) => {
            newPostList.push(post);
          });
          resolve(setupPost(newPostList));
        });
      } else {
        navigateTo('/');
        alert('Please Log in or Sign up');
      }
    });
  });
}
