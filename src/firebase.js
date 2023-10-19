import { getFirestore, collection, getDocs, addDoc  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import  renderCreateAccount  from "./register";

const firebaseConfig = {
    apiKey: "AIzaSyA_nNPVRwXqmgLlxdYL4NmJwiItX9t2D5E",
    authDomain: "social-network-c61c9.firebaseapp.com",
    projectId: "social-network-c61c9",
    storageBucket: "social-network-c61c9.appspot.com",
    messagingSenderId: "496904934051",
    appId: "1:496904934051:web:349b4f181faf09491c2516",
    measurementId: "G-9MSK8FV9VP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export{auth};
const firestore = getFirestore(app);
export {firestore}
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});


// Para crear o registrar usuarios
export function createUser(auth, singUpEmail, singPassword){

createUserWithEmailAndPassword(auth, singUpEmail, singPassword)
  .then(userCredential => {
    console.log('Registro exitoso', userCredential);
  })
  .catch(error => {
    console.error('Error al registrarse:', error.code, error.message);
  })

}

// Para iniciar sesion o ingresar 
export function login(auth, loginEmail, loginPassword){
signInWithEmailAndPassword(auth, loginEmail, loginPassword)
.then(userCredential => {
console.log('Inicio de sesión exitoso', userCredential);
})
.catch(error => {
console.error('Error al iniciar sesión:', error.code, error.message);
});
}



//funcion save
export function saveTask(title, description) {
 addDoc(collection(firestore, 'post'), {title, description}) 
//console.log(title, description)
}


//funcion para crear los posts
const main = document.querySelector('.homepage')
export function renderPosts() {
  main.innerHTML= "";
  //contenerdor de posts
  const postContainer = document.createElement("div");
  postContainer.setAttribute("class", "postContainer");
  
  const buttonback = document.createElement("button");
  buttonback.textContent= "back";
  buttonback.addEventListener("click", ()=> {
    renderCreateAccount()
  })
main.appendChild(postContainer)
main.appendChild(buttonback)


function setupPost(data) {
  if(data.length) {
  let html = "";
  data.forEach(doc => {
    const post = doc.data()
    html += `
    <li class="ListGroupItem">
    <h5>${post.title}</h5>
    <p>${post.description}</p>
    </li>
    `;
  });
  postContainer.innerHTML= html;
  } else {
  postContainer.innerHTML = `<p>Login to see posts</p>`
  }
  }
  

onAuthStateChanged(auth, (user) => {
    if (user) {
      // Ahora user es el objeto de usuario autenticado
      // Puedes acceder a la colección de 'post' del usuario
      const userPostsCollection = collection(firestore, "post");
    
      getDocs(userPostsCollection).then((snapshot) => {
        // snapshot.docs contiene los documentos de la colección
        setupPost(snapshot.docs);
        console.log(snapshot.docs);
      });
    } else {
      setupPost([])
      console.log("Sing out");
    }
    });



}


//funcion para registro con google
export function GoogleRegister() {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);
    })
    .catch((error) => {
      console.error("Error al autenticar con Google:", error.message);
    });
    return main;
}