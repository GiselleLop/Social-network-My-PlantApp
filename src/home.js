import renderLogin from './login.js';
import renderCreateAccount, { main } from './register.js';

// estructura interna del contenedor
function home(navigateTo) {
  main.innerHTML = '';
  const containerimg = document.createElement('div');
  containerimg.className = 'containerimg';
  const img = document.createElement('img');
  img.src = 'img/planta-arana.png';
  img.id = 'homeplant';
  img.alt = 'Imagen de plantas';
  const content = document.createElement('div');
  content.className = 'content';

  const homewelcome = document.createElement('h3');
  homewelcome.className = 'homewelcome';
  homewelcome.textContent = 'Bienvenidos a :';

  const hometitle = document.createElement('h1');
  hometitle.className = 'hometittle';
  hometitle.textContent = 'Mi PlantApp';

  const words = document.createElement('p');
  words.className = 'words';
  words.textContent = 'Una gran comunidad de amantes de las plantas y botánica.';
  const orderbuttons = document.createElement('div');
  orderbuttons.className = 'orderbuttons';

  const registerButton = document.createElement('button');
  registerButton.className = 'registrationButton';
  registerButton.id = 'registerButton';
  registerButton.textContent = 'Registrarse';

  // evento para que se redirija a la vista de registro
  registerButton.addEventListener('click', () => {
    renderCreateAccount();
    navigateTo('/register');
  });

  const wordsHome = document.createElement('p');
  wordsHome.className = 'wordsHome';
  wordsHome.textContent = '¿Ya tienes una cuenta?';

  const loginButton = document.createElement('button');
  loginButton.className = 'loginButton';
  loginButton.id = 'loginButton';
  loginButton.textContent = 'Iniciar Sesión';
  loginButton.addEventListener('click', () => {
    renderLogin();
    navigateTo('/login');
  });

  main.appendChild(containerimg);
  containerimg.appendChild(img);
  main.appendChild(content);
  content.appendChild(homewelcome);
  content.appendChild(hometitle);
  content.appendChild(words);
  content.appendChild(orderbuttons);
  orderbuttons.appendChild(registerButton);
  orderbuttons.appendChild(wordsHome);
  orderbuttons.appendChild(loginButton);
}
export default home;
