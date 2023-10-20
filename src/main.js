import home from './home.js';
import renderLogin from './login.js';
import renderCreateAccount from './register.js';

// renderLogin(navigateTo)
// renderCreateAccount(navigateTo)

const defaultRoute = '/';
const root = document.querySelector('.homepage');

const routes = [
  { path: '/', component: home },
  { path: '/login', component: renderLogin },
  { path: '/register', component: renderCreateAccount },
];

function navigateTo(hash) {
  const currentPath = window.location.pathname;

  // Verifica si la ruta actual es diferente de la nueva ruta
  if (currentPath !== hash) {
    const route = routes.find((routeFound) => routeFound.path === hash);

    if (route && route.component) {
      window.history.pushState(
        { path: route.path },
        route.path,
        window.location.origin + route.path
      );

      if (root.firstChild) {
        root.removeChild(root.firstChild);
      }

      root.appendChild(route.component());
    } else {
      navigateTo('/error');
    }
  }
}
home(navigateTo);

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};
navigateTo(window.location.pathname || defaultRoute);
