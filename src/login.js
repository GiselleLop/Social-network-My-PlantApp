import { main } from "./register";
import { login } from "./firebase";
import { auth} from "./firebase";
import { GoogleRegister } from "./firebase";

 function renderLogin(navigateTo){
    main.innerHTML= "";
    const header = document.createElement("header");
    header.setAttribute("class", "headerRegister")
    //Titulo 1
    const title1 = document.createElement("h1");
    title1.textContent = "¡Nos alegra verte de nuevo!"
    //Titulo 2
    const title2 = document.createElement("h2");
    title2.textContent = "Ingresa tus datos"
  
    //Imagen
      const imageLogin = document.createElement("img")
      imageLogin.src= 'img/regadera.png'
      imageLogin.style.width = '50%';
      imageLogin.style.height = 'auto';
  
    //Contenedor de los inputs
    const containerLogin = document.createElement("div")
    containerLogin.setAttribute("class", "Inputcontainer")
  
  // input correo
    const emailLabel = document.createElement("h3")
    emailLabel.textContent = "Correo Electrónico:"
    emailLabel.setAttribute("class", "h4Register");

    const email = document.createElement("input")
    email.setAttribute("type", "email");
    email.setAttribute("class", "input")
    email.setAttribute("id", "emailLog")
  //input contrasena
    const passwordLabel = document.createElement("h3")
    passwordLabel.textContent = "Contraseña:";
    passwordLabel.setAttribute("class", "h4Register");

    const password = document.createElement("input")
    password.setAttribute("type", "password");
    password.setAttribute("class", "input")
    password.setAttribute("id", "passwordLogin")
  
  // Boton iniciar session
    const sessionBtn = document.createElement("button");
    sessionBtn.textContent = "Iniciar sesión"
    sessionBtn.setAttribute("class", "buttonRegister")
    sessionBtn.setAttribute("id", "sessionBtn")
    sessionBtn.addEventListener("click", ()=> {
        login(auth, email, password)
    })

  //input start session with GOOGLE
    const or = document.createElement("h4")
    or.textContent = "o";
    or.setAttribute("id", "or")
    
  
    const googleLoginBtn = document.createElement("input");
    googleLoginBtn.textContent= "Iniciar sesión con Google"  
    googleLoginBtn.setAttribute("type","image")
    googleLoginBtn.setAttribute("src", 'img/LoginGoogle.png')
    googleLoginBtn.setAttribute("class", "googleLoginBtn")
    googleLoginBtn.style.width = '40%';
    googleLoginBtn.style.height = 'auto';
  
  
    googleLoginBtn.addEventListener("click", (e) => {
    GoogleRegister()
  });
  
  //boton volver
    const buttonBack = document.createElement("button");
    buttonBack.textContent = "Volver"
    buttonBack.setAttribute("class", "buttonRegister");
    buttonBack.addEventListener("click", () => {
      location.href="index.html";
    })
  
    main.appendChild(header)
      header.appendChild(title1);
      header.appendChild(title2);
      header.appendChild(imageLogin);
      main.appendChild(containerLogin)
      containerLogin.appendChild(emailLabel);
      containerLogin.appendChild(email);
      containerLogin.appendChild(passwordLabel);
      containerLogin.appendChild(password);
      containerLogin.appendChild(sessionBtn);
      containerLogin.appendChild(or);
      containerLogin.appendChild(googleLoginBtn);
      containerLogin.appendChild(buttonBack);
  
  }
 export default renderLogin;