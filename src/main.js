
import { renderLogin } from "./login.js";
import { renderCreateAccount } from "./register.js";

const register = document.querySelector('#registerButton') 
  register.addEventListener('click', renderCreateAccount) 

const login = document.querySelector('#loginButton');
  login.addEventListener('click', renderLogin)

/*const index = 'index.html'

  const routes = [
  { path: '/', component: index},
    {path: '/register', component: renderCreateAccount()}
  ]
  const defaultRoute = '/';
  const root = document.querySelector('.homepage')


  function navigateTo(hash) {
    const route = routes.find((routeFound) => routeFound.path === hash);
    

    if (route && route.component) {
      window.history.pushState(
        {},
        route.path,
        window.location.origin + route.path,
      );
  
      if (root.firstChild) {
        root.removeChild(root.firstChild);
      }
      root.appendChild(route.component());
     }
     else {
      navigateTo('/error');
    }
  }
  
window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
*/









  /*

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
*/
