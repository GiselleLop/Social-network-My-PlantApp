import { login, GoogleRegister } from './firebase.js';
// import { mainPage } from './main.js';

function renderLogin(navigateTo) {
  const mainPage = document.createElement('div');
  mainPage.setAttribute('class', 'homepage1');

  const header = document.createElement('header');
  header.setAttribute('class', 'headerRegister');
  // Titulo 1
  const title1 = document.createElement('h1');
  title1.textContent = '¡Nos alegra verte de nuevo!';
  // Titulo 2
  const title2 = document.createElement('h2');
  title2.textContent = 'Ingresa tus datos';

  // Imagen
  const imageLogin = document.createElement('img');
  imageLogin.src = 'img/regadera.png';
  imageLogin.style.width = '50%';
  imageLogin.style.height = 'auto';

  // Contenedor de los inputs
  const containerLogin = document.createElement('div');
  containerLogin.setAttribute('class', 'Inputcontainer');

  // input correo
  const emailLabel = document.createElement('h3');
  emailLabel.textContent = 'Correo Electrónico:';
  emailLabel.setAttribute('class', 'h4Register');

  const email = document.createElement('input');
  email.setAttribute('type', 'email');
  email.setAttribute('class', 'input');
  email.setAttribute('id', 'emailLog');
  // input contrasena
  const passwordLabel = document.createElement('h3');
  passwordLabel.textContent = 'Contraseña:';
  passwordLabel.setAttribute('class', 'h4Register');

  const password = document.createElement('input');
  password.setAttribute('type', 'password');
  password.setAttribute('class', 'input');
  password.setAttribute('id', 'passwordLogin');

  // mensaje error contrasena
  const spanPassword = document.createElement('span');
  spanPassword.setAttribute('id', 'answerPass');

  // Boton iniciar session
  const sessionBtn = document.createElement('button');
  sessionBtn.textContent = 'Iniciar sesión';
  sessionBtn.setAttribute('class', 'buttonRegister');
  sessionBtn.setAttribute('id', 'sessionBtn');

  sessionBtn.addEventListener('click', () => {
    const loginEmail = document.querySelector('#emailLog');
    const loginPassword = document.querySelector('#passwordLogin');
    login(loginEmail.value, loginPassword.value)
      .then((ok) => {
        spanPassword.classList.add(ok.message);
        spanPassword.textContent = `${ok.message} ${ok.email} Saved`;
        navigateTo('/posts');
      })
      .catch((err) => {
        spanPassword.classList.add('error');
        spanPassword.textContent = `${err.message} ${err.email} Not saved`;
      });
  });

  // input start session with GOOGLE
  const or = document.createElement('h4');
  or.textContent = 'o';
  or.setAttribute('id', 'or');

  const googleLoginBtn = document.createElement('input');
  googleLoginBtn.textContent = 'Iniciar sesión con Google';
  googleLoginBtn.setAttribute('type', 'image');
  googleLoginBtn.setAttribute('src', 'img/LoginGoogle.png');
  googleLoginBtn.setAttribute('class', 'googleLoginBtn');
  googleLoginBtn.style.width = '40%';
  googleLoginBtn.style.height = 'auto';

  googleLoginBtn.addEventListener('click', () => {
    GoogleRegister();
  });

  // boton volver
  const buttonBack = document.createElement('button');
  buttonBack.textContent = 'Volver';
  buttonBack.setAttribute('class', 'buttonRegister');
  buttonBack.setAttribute('id', 'return');
  buttonBack.addEventListener('click', () => {
    navigateTo('/');
  });

  mainPage.appendChild(header);
  header.appendChild(title1);
  header.appendChild(title2);
  header.appendChild(imageLogin);
  mainPage.appendChild(containerLogin);
  containerLogin.appendChild(emailLabel);
  containerLogin.appendChild(email);
  containerLogin.appendChild(passwordLabel);
  containerLogin.appendChild(password);
  containerLogin.appendChild(spanPassword);
  containerLogin.appendChild(sessionBtn);
  containerLogin.appendChild(or);
  containerLogin.appendChild(googleLoginBtn);
  containerLogin.appendChild(buttonBack);

  return mainPage;
}
export default renderLogin;
