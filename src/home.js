function home(navigateTo) {
  const mainPage = document.createElement('div');
  mainPage.classList.add('homePageWelcome');
  mainPage.innerHTML = `
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
