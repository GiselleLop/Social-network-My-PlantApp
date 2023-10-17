  import { getFirestore, collection, getDocs  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
  import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
  
  
  import { renderCreateAccount, renderLogin } from "./render.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    const firebaseConfig = {
    apiKey: "AIzaSyA_nNPVRwXqmgLlxdYL4NmJwiItX9t2D5E",
    authDomain: "social-network-c61c9.firebaseapp.com",
    projectId: "social-network-c61c9",
    storageBucket: "social-network-c61c9.appspot.com",
    messagingSenderId: "496904934051",
    appId: "1:496904934051:web:4cc5210ca6b1e3661c2516",
    measurementId: "G-ZBR0EJZW08"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app)
  const firestore = getFirestore(app);
  /*
// Para crear o registrar usuarios
const buttonSignin = document.querySelector('#buttonSignin');
buttonSignin.addEventListener('click', (e) => {
  e.preventDefault();
 const singUpEmail = document.querySelector('#emailIn').value;
 const singPassword = document.querySelector('#passwordIn').value;
 //console.log(singUpEmail , singPassword);

 createUserWithEmailAndPassword(auth, singUpEmail, singPassword)
    .then(userCredential => {
      console.log('signup');
    })
    .catch(error => {
      console.error('Error al registrarse:', error.message);
    });
})


// Para iniciar sesion o ingresar 
const loginButton =  document.querySelector('#loginBtn');
loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector('#emailLog').value;
  const loginPassword = document.querySelector('#passwordLog').value;
//console.log(loginEmail, loginPassword);
signInWithEmailAndPassword(auth, loginEmail, loginPassword)
.then(userCredential => {
  
  console.log('login');
})
.catch(error => {
  console.error('Error al registrarse:', error.message);
});
})


const div = document.querySelector('#close')
const list = document.createElement("ul")
div.appendChild(list)


function setupPost(data) {
if(data.length) {
  let html = "";
  data.forEach(doc => {
    const post = doc.data()
    const li = `
    <li class="ListGroupItem">
    <h5>${post.title}</h5>
    <p>${post.description}</p>
    </li>
    `;
    html += li;
  });
  list.innerHTML= html;
} else {
  list.innerHTML = `<p>Login to see posts</p>`
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
//import { myFunction } from './lib/index.js';

//myFunction();
*/
const loginBtn = document.querySelector('#loginButton')
loginBtn.addEventListener('click',renderLogin)



const register = document.querySelector('#registerButton') 
register.addEventListener('click', renderCreateAccount)

