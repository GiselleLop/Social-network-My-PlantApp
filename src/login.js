import { login, GoogleRegister } from './firebase.js';

// function renderLogin(navigateTo) {
//   const mainPage = document.createElement('div');
//   mainPage.setAttribute('class', 'homepage1');

//   const header = document.createElement('header');
//   header.setAttribute('class', 'headerRegister');
//   // Titulo 1
//   const title1 = document.createElement('h1');
//   title1.textContent = '¡Nos alegra verte de nuevo!';
//   title1.setAttribute('class', 'titleLogin');
//   // Titulo 2
//   const title2 = document.createElement('h2');
//   title2.textContent = 'Ingresa tus datos';
//   title2.setAttribute('class', 'titleLogin');
//   // Imagen
//   const imageLogin = document.createElement('img');
//   imageLogin.src = 'https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fregadera.png?alt=media&token=b6994595-5975-4a79-a110-686525ba4d5f';
//   console.log(imageLogin.src);
//   imageLogin.style.width = '40%';
//   imageLogin.style.height = 'auto';
//   imageLogin.setAttribute('class', 'titleLogin');
//   // Contenedor de los inputs
//   const containerLogin = document.createElement('div');
//   containerLogin.setAttribute('class', 'Inputcontainer');
//   // input correo
//   const emailLabel = document.createElement('h3');
//   emailLabel.textContent = 'Correo Electrónico:';
//   emailLabel.setAttribute('class', 'h4Register');
//   const email = document.createElement('input');
//   email.setAttribute('type', 'email');
//   email.setAttribute('class', 'input');
//   email.setAttribute('id', 'emailLog');
//   // input contrasena
//   const passwordLabel = document.createElement('h3');
//   passwordLabel.textContent = 'Contraseña:';
//   passwordLabel.setAttribute('class', 'h4Register');
//   const password = document.createElement('input');
//   password.setAttribute('type', 'password');
//   password.setAttribute('class', 'input');
//   password.setAttribute('id', 'passwordLogin');
//   // mensaje error contrasena
//   const spanPassword = document.createElement('span');
//   spanPassword.setAttribute('id', 'answerPass');
//   // Boton iniciar session
//   const sessionBtn = document.createElement('button');
//   sessionBtn.textContent = 'Iniciar sesión';
//   sessionBtn.setAttribute('class', 'buttonRegister');
//   sessionBtn.setAttribute('id', 'sessionBtn');
//   sessionBtn.addEventListener('click', () => {
//     const loginEmail = document.querySelector('#emailLog');
//     const loginPassword = document.querySelector('#passwordLogin');
//     login(loginEmail.value, loginPassword.value)
//       .then((ok) => {
//         spanPassword.classList.add(ok.message);
//         spanPassword.textContent = `${ok.message} ${ok.email} Saved`;
//         navigateTo('/posts');
//       })
//       .catch((err) => {
//         if (err.code === 'auth/invalid-email') {
//           spanPassword.classList.add('error');
//           spanPassword.textContent = 'Ingresa un email válido';
//         }
//         if (err.code === 'auth/invalid-login-credentials') {
//           spanPassword.classList.add('error');
//           spanPassword.textContent = 'Contraseña incorrecta';
//         }
//       });
//   });
//   // input start session with GOOGLE
//   const or = document.createElement('h4');
//   or.textContent = 'o';
//   or.setAttribute('id', 'or');
//   // Boton Google
//   const buttonGoogle = document.createElement('button');
//   buttonGoogle.setAttribute('id', 'google');
//   buttonGoogle.setAttribute('class', 'buttonRegister');
//   const googleImg = document.createElement('img');
//   googleImg.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fgoogleongpng.webp?alt=media&token=0bf583ce-00aa-467b-9101-654e9fe9aabd');
//   googleImg.setAttribute('class', 'imgGoogle');
//   const textButton = document.createElement('h2');
//   textButton.textContent = 'Iniciar sesión con Google';

//   buttonGoogle.addEventListener('click', () => {
//     GoogleRegister(navigateTo);
//   });

//   // boton volver
//   const buttonBack = document.createElement('button');
//   buttonBack.textContent = 'Volver';
//   buttonBack.setAttribute('class', 'buttonRegister');
//   buttonBack.setAttribute('id', 'return');
//   buttonBack.addEventListener('click', () => {
//     navigateTo('/');
//   });

//   mainPage.appendChild(header);
//   header.appendChild(title1);
//   header.appendChild(title2);
//   header.appendChild(imageLogin);
//   mainPage.appendChild(containerLogin);
//   containerLogin.appendChild(emailLabel);
//   containerLogin.appendChild(email);
//   containerLogin.appendChild(passwordLabel);
//   containerLogin.appendChild(password);
//   containerLogin.appendChild(spanPassword);
//   containerLogin.appendChild(sessionBtn);
//   containerLogin.appendChild(or);
//   containerLogin.appendChild(buttonGoogle);
//   buttonGoogle.append(googleImg, textButton);
//   containerLogin.appendChild(buttonBack);

//   return mainPage;
// }
// export default renderLogin;

function renderLogin(navigateTo) {
  const mainPage = document.createElement('div');
  mainPage.classList.add('homepageLogin');
  mainPage.innerHTML = `
    
      <div class="imageAndTextRegister">
        <h1 class="titleLogin">¡Nos alegra verte de nuevo!</h1>
        <h2 class="titleLogin">Ingresa tus datos</h2>
        <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fregadera.png?alt=media&token=b6994595-5975-4a79-a110-686525ba4d5f" style="width: 55%; height: auto;">
      </div>
      


      <form id="input-container">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email">
        </div>

        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password">
        </div>
        <span id="answerPass"></span>
  
        <button id="log-in-button">Log In</button>
    
        <button id="google">
        <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fgoogleongpng.webp?alt=media&token=0bf583ce-00aa-467b-9101-654e9fe9aabd" class="imgGoogle">
        Log In with Google
        </button>

        <button id="return">Return</button>

      </form>
  `;

  mainPage.querySelector('#log-in-button').addEventListener('click', (e) => {
    e.preventDefault();
    const loginEmail = document.querySelector('#email').value;
    const loginPassword = document.querySelector('#password').value;

    login(loginEmail, loginPassword)
      .then((ok) => {
        const spanPassword = document.querySelector('#answerPass');
        spanPassword.classList.add(ok.message);
        spanPassword.textContent = `${ok.message} ${ok.email} Saved`;
        navigateTo('/posts');
      })
      .catch((err) => {
        const spanPassword = document.querySelector('#answerPass');
        if (err.code === 'auth/invalid-email') {
          spanPassword.classList.add('error');
          spanPassword.textContent = 'Ingresa un email válido';
        }
        if (err.code === 'auth/invalid-login-credentials') {
          spanPassword.classList.add('error');
          spanPassword.textContent = 'Contraseña incorrecta';
        }
      });
  });

  mainPage.querySelector('#google').addEventListener('click', (e) => {
    e.preventDefault();
    GoogleRegister(navigateTo);
  });

  mainPage.querySelector('#return').addEventListener('click', () => {
    navigateTo('/');
  });

  return mainPage;
}
export default renderLogin;
