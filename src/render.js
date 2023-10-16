import { getFirestore, collection, getDocs  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
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
    appId: "1:496904934051:web:349b4f181faf09491c2516",
    measurementId: "G-9MSK8FV9VP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Para crear o registrar usuarios
function createUser(auth, singUpEmail, singPassword){
createUserWithEmailAndPassword(auth, singUpEmail, singPassword)
  .then(userCredential => {
    console.log('Registro exitoso', userCredential);
  })
  .catch(error => {
    console.error('Error al registrarse:', error.code, error.message);
  })
}
/*
// Para iniciar sesion o ingresar 
const buttonLogin =  document.querySelector('#buttonLogin');
buttonLogin.addEventListener('click', (e) => {
e.preventDefault();
const loginEmail = document.querySelector('#emailLog').value;
const loginPassword = document.querySelector('#passwordLog').value;
//console.log(loginEmail, loginPassword);
signInWithEmailAndPassword(auth, loginEmail, loginPassword)
.then(userCredential => {
console.log('Inicio de sesión exitoso', userCredential);
})
.catch(error => {
console.error('Error al iniciar sesión:', error.code, error.message);
});
})
*/
const main = document.querySelector('.homepage')
export function renderCreateAccount(){
    main.innerHTML= ""
  //header
  const header = document.createElement("header");
  header.setAttribute("class", "headerRegister")
  
  //Titulo de registro
    const title = document.createElement("h2");
    title.textContent = "Para crear una nueva cuenta, ingresa tus datos."
  // Imagen
    const image = document.createElement("img")
    image.src = '/src/evolucion.png'
    image.style.width = '60%';
    image.style.height = 'auto';
  
  //Contenedor de los inputs
    const container = document.createElement("div")
    container.setAttribute("class", "Inputcontainer")
  //input Username
    const username = document.createElement("h4")
    username.textContent = "Nombres completos:";
    username.setAttribute("class", "h4Register");
    const inputName = document.createElement("input")
    inputName.setAttribute("type", "text");
    inputName.setAttribute("class", "input")
  // input correo
    const email = document.createElement("h4")
    email.textContent = "Correo Electrónico:"
    email.setAttribute("class", "h4Register");
    const inputEmail = document.createElement("input")
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("class", "input")
    inputEmail.setAttribute("id", "emailRegister")
  //input contrasena
    const password = document.createElement("h4")
    password.textContent = "Contraseña:";
    password.setAttribute("class", "h4Register");
    const inputPassword = document.createElement("input")
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("class", "input")
    inputPassword.setAttribute("id", "passwordRegister")
  // boton continuar
    const buttonContinue = document.createElement("button");
    buttonContinue.textContent = "Continuar"
    buttonContinue.setAttribute("class", "buttonRegister")
    buttonContinue.setAttribute("id", "continue")
  //google boton
  const or = document.createElement("h4")
  or.textContent = "o";
  or.setAttribute("id", "or")

  const buttonGoogle = document.createElement("button");
  buttonGoogle.textContent= "Registrarse con Google"
  buttonGoogle.setAttribute("class", "buttonRegister")
//boton volver
  const buttonBack = document.createElement("button");
  buttonBack.textContent = "Volver"
  buttonBack.setAttribute("class", "buttonRegister");
  buttonBack.addEventListener("click", () => {
    location.href="index.html";
  })
  //boton x
  const postx = document.createElement("button");
  postx.setAttribute("class", "buttonRegister");
  postx.textContent = "posts"
  postx.addEventListener("click", ()=>{
  
    renderPosts()
  })

   
    main.appendChild(header)
    header.appendChild(title);
    header.appendChild(image);
    main.appendChild(container)
    container.appendChild(username);
    container.appendChild(inputName);
    container.appendChild(email);
    container.appendChild(inputEmail);
    container.appendChild(password);
    container.appendChild(inputPassword);
    container.appendChild(buttonContinue);
    container.appendChild(or)
    container.appendChild(buttonGoogle)
    container.appendChild(buttonBack)
    container.appendChild(postx)

   
    // continuar para registrar
 buttonContinue.addEventListener("click", (e)=> {
  e.preventDefault();
  const singUpEmail = document.querySelector('#emailRegister').value;
  const singPassword = document.querySelector('#passwordRegister').value;
  //console.log(singUpEmail , singPassword);
  createUser(auth, singUpEmail, singPassword);
 })

// Con Google

buttonGoogle.addEventListener("click", (e) => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);
    })
    .catch((error) => {
      console.error("Error al autenticar con Google:", error.message);
    });
});
/*// Función para manejar clic en el botón de Google
const buttonGoogle = document.getElementById('buttonGoogle'); // Asegúrate de tener el botón en tu HTML

buttonGoogle.addEventListener("click", (e) => {
  // Cerrar sesión si hay una sesión activa
  if (auth.currentUser) {
      .then(() => {
        console.log('Usuario desconectado');
        // Después de cerrar sesión, abrir la ventana emergente de Google para iniciar sesión
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            const user = result.user;
            console.log("Usuario autenticado con Google:", user);
          })
          .catch((error) => {
            console.error("Error al autenticar con Google:", error.message);
          });
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error.message);
      });
  } else {
    // Si no hay una sesión activa, simplemente abrir la ventana emergente de Google para iniciar sesión
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Usuario autenticado con Google:", user);
      })
      .catch((error) => {
        console.error("Error al autenticar con Google:", error.message);
      });
  }
}); */
}

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
