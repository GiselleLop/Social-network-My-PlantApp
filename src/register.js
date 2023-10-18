import { auth } from "./firebase";

import { createUser } from "./firebase";
import { GoogleRegister } from "./firebase";
import { post } from "./post";


const main = document.querySelector('.homepage')
export {main}
//para crear la vista de registro 
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
    image.setAttribute("src","img/evolucion.png");
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
  



  //prueba posts
  const post2 = document.createElement("button");
  post2.textContent = "prueba post"
  post2.addEventListener("click", ()=> {
  post();
 
     
  })
///
    main.append(header, container)
    header.append(title, image);
    container.append(username, inputName, email, inputEmail, password, inputPassword, buttonContinue, or, buttonGoogle, buttonBack, post2)
   
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
   GoogleRegister()

});
return main

}