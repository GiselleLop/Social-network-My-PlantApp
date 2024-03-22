import home from './home.js';
import renderLogin from './login.js';
import renderCreateAccount from './register.js';
import { posts } from './post.js';

const routes = [
  { path: '/', component: home },
  { path: '/login', component: renderLogin },
  { path: '/register', component: renderCreateAccount },
  { path: '/posts', component: posts },
];

const mainPage = document.querySelector('.homepage');
const defaultRoute = '/';

function navigateTo(hash) {
  const route = routes.find((r) => r.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (mainPage.firstChild) {
      mainPage.removeChild(mainPage.firstChild);
      mainPage.append(route.component(navigateTo));
    } else {
      navigateTo('/error');
    }
  }
}

window.addEventListener('popstate', () => {
  navigateTo(defaultRoute);
});

function initRouter() {
  navigateTo(window.location.pathname || defaultRoute);
}

initRouter();
export default navigateTo;
