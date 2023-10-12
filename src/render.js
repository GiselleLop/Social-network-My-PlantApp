import { getFirestore, collection, getDocs  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
  
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

export function renderCreateAccount(){
    const main = document.querySelector('.main')
    main.innerHTML= ""
  //contenedor de la vista registro 
    const containerMain = document.createElement("div");
    containerMain.setAttribute("class", "containerRegister")
  //header
  const header = document.createElement("header");
  
  //Titulo de registro
    const title = document.createElement("h2");
    title.textContent = "Para crear una nueva cuenta, ingresa tus datos."
  // Imagen
    const image = document.createElement("img")
    image.src = '/src/evolucion.png'
    image.style.width = '40%';
    image.style.height = 'auto';
  
  //Contenedor de los inputs
    const container = document.createElement("div")
    container.setAttribute("class", "Inputcontainer")
  //input Username
    const username = document.createElement("h4")
    username.textContent = "Nombres completos:"
    const inputName = document.createElement("input")
    inputName.setAttribute("type", "text");
    inputName.setAttribute("class", "input")
  // input correo
    const email = document.createElement("h4")
    email.textContent = "Correo Electrónico:"
    const inputEmail = document.createElement("input")
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("class", "input")
    inputEmail.setAttribute("id", "emailRegister")
  //input contrasena
    const password = document.createElement("h4")
    password.textContent = "Contraseña:"
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
  buttonGoogle.textContent= "Continuar con Google"
  buttonGoogle.setAttribute("class", "buttonRegister")
//boton volver
  const buttonBack = document.createElement("input");
  buttonBack.setAttribute("type", "button");
  buttonBack.setAttribute("value", "Volver")
  buttonBack.setAttribute("onclick", "history.back()")
  buttonBack.setAttribute("class", "buttonRegister")
  

    main.appendChild(containerMain);
    containerMain.appendChild(header)
    header.appendChild(title);
    header.appendChild(image);
    containerMain.appendChild(container)
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

    // continuar para registrar
buttonContinue.addEventListener("click", (e)=> {
    e.preventDefault();
    const singUpEmail = document.querySelector('#emailRegister').value;
    const singPassword = document.querySelector('#passwordRegister').value;
    //console.log(singUpEmail , singPassword);
   
    createUserWithEmailAndPassword(auth, singUpEmail, singPassword)
       .then(userCredential => {
         console.log('signup');
       })
       .catch(error => {
         console.error('Error al registrarse:', error.message);
       });
})

  }