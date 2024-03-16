import { createUser, GoogleRegister } from './firebase.js';

function renderCreateAccount(navigateTo) {
  const mainPage = document.createElement('div');
  mainPage.classList.add('homePageRegister');
  mainPage.innerHTML = `
  

      <div class="imageAndTextRegister">
        <h2>Para crear una nueva cuenta, ingresa tus datos.</h2>
        <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fevolucion.png?alt=media&token=2169c4ff-1063-488c-818a-e86c115b9b36" style="width: 55%; height: auto;">
      </div>
     
      <form id="input-container">
      
        <div>
          <label for="emailRegister">Correo Electrónico:</label>
          <input type="email" id="emailRegister" name="email" autocomplete="email">
        </div>
        <div>
          <label for="passwordRegister">Contraseña:</label>
          <input type="password" id="passwordRegister" name="password" autocomplete="current-password">
        </div>
        <span id="answerPass"></span>
  
        <button id="continue">Continuar</button>
    
        <button id="google">
        <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fgoogleongpng.webp?alt=media&token=0bf583ce-00aa-467b-9101-654e9fe9aabd" class="imgGoogle">
        Registrarse con Google
        </button>

        <button id="return">Return</button>

      </form>
  `;
  mainPage.querySelector('#return').addEventListener('click', () => {
    navigateTo('/');
  });

  mainPage.querySelector('#continue').addEventListener('click', (e) => {
    e.preventDefault();
    const signUpEmail = document.querySelector('#emailRegister').value;
    const signPassword = document.querySelector('#passwordRegister').value;

    createUser(signUpEmail, signPassword)
      .then((ok) => {
        const spanPassword = document.querySelector('#answerPass');
        spanPassword.classList.add(ok.message);
        spanPassword.textContent = `${ok.message} ${ok.email} Saved`;
        navigateTo('/posts');
      })
      .catch((err) => {
        const spanPassword = document.querySelector('#answerPass');
        spanPassword.classList.add('error');
        if (err.code === 'auth/invalid-email') {
          spanPassword.textContent = 'Ingresa un email válido';
        }
        if (err.code === 'auth/missing-email') {
          spanPassword.textContent = 'Por favor ingresa un email';
        }
        if (err.code === 'auth/weak-password') {
          spanPassword.textContent = 'La contraseña debe tener al menos 6 caracteres';
        }
        if (err.code === 'auth/email-already-in-use') {
          spanPassword.textContent = 'El email ya se encuentra en uso';
        }
      });
  });

  mainPage.querySelector('#google').addEventListener('click', (e) => {
    e.preventDefault();
    GoogleRegister(navigateTo);
  });

  return mainPage;
}

export default renderCreateAccount;
