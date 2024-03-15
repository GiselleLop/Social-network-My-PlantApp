// function home(navigateTo) {
//   const mainPage = document.createElement('div');
//   mainPage.setAttribute('class', 'homepage1');

//   const containerimg = document.createElement('div');
//   containerimg.className = 'containerimg';
//   const img = document.createElement('img');
//   img.src = 'https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fplanta-arana.png?alt=media&token=836eab90-f526-44b6-b147-076dfff7cd62';
//   img.id = 'homeplant';
//   img.alt = 'Imagen de plantas';

//   const content = document.createElement('div');
//   content.className = 'content';

//   const homewelcome = document.createElement('h3');
//   homewelcome.className = 'homewelcome';
//   homewelcome.textContent = 'Bienvenidos a :';

//   const hometitle = document.createElement('h1');
//   hometitle.className = 'hometittle';
//   hometitle.textContent = 'Mi PlantApp';

//   const words = document.createElement('p');
//   words.className = 'words';
//   words.textContent = 'Una gran comunidad de amantes de las plantas y botánica.';
//   const orderbuttons = document.createElement('div');
//   orderbuttons.className = 'orderbuttons';

//   const registerButton = document.createElement('button');
//   registerButton.className = 'registrationButton';
//   registerButton.id = 'registerButton';
//   registerButton.textContent = 'Registrarse';

//   registerButton.addEventListener('click', () => {
//     navigateTo('/register');
//   });

//   const wordsHome = document.createElement('p');
//   wordsHome.className = 'wordsHome';
//   wordsHome.textContent = '¿Ya tienes una cuenta?';

//   const loginButton = document.createElement('button');
//   loginButton.className = 'loginButton';
//   loginButton.id = 'loginButton';
//   loginButton.textContent = 'Iniciar Sesión';
//   loginButton.addEventListener('click', () => {
//     navigateTo('/login');
//   });

//   mainPage.appendChild(containerimg);
//   containerimg.appendChild(img);
//   mainPage.appendChild(content);
//   content.appendChild(homewelcome);
//   content.appendChild(hometitle);
//   content.appendChild(words);
//   content.appendChild(orderbuttons);
//   orderbuttons.appendChild(registerButton);
//   orderbuttons.appendChild(wordsHome);
//   orderbuttons.appendChild(loginButton);
//   return mainPage;
// }

// export default home;

function home(navigateTo) {
  const mainPage = document.createElement('div');
  mainPage.innerHTML = `
    <div class="homePageWelcome">
      
        <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fplanta-arana.png?alt=media&token=836eab90-f526-44b6-b147-076dfff7cd62" id="homeplant" alt="Imagen de plantas">
      
      <div class="content">

        <div class='homeWelcomeAndText'>
          <h3 class="homewelcome">Bienvenidos a :</h3>
          <h1 class="hometitle">Mi PlantApp</h1>
          <p class="homewelcome">Una gran comunidad de amantes de las plantas y botánica.</p>
        </div>

        <div class="orderbuttons">
          <button class="registrationButton" id="registerButton">Registrarse</button>
          <p class="wordsHome">¿Ya tienes una cuenta?</p>
          <button class="loginButton" id="loginButton">Iniciar Sesión</button>
        </div>

      </div>
    </div>
  `;

  mainPage.querySelector('#registerButton').addEventListener('click', () => {
    navigateTo('/register');
  });

  mainPage.querySelector('#loginButton').addEventListener('click', () => {
    navigateTo('/login');
  });

  return mainPage;
}

export default home;
