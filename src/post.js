import { collection, getDocs } from 'firebase/firestore';
import {
  auth,
  firestore,
  saveTask,
  handleLike,
  deletePost,
  editPost,
  logOut,
  initializeAuth,
} from './firebase.js';

export function posts(navigateTo) {
  const backgroundLayer = document.createElement('div');
  backgroundLayer.classList.add('background-layer');

  const mainPage = document.createElement('div');
  mainPage.setAttribute('class', 'homepagePosts');
  const headerPost = document.createElement('div');
  headerPost.textContent = 'Mi Plantapp';
  headerPost.setAttribute('class', 'headerPost');
  const logoImage = document.createElement('img');
  logoImage.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fplanta-arana.png?alt=media&token=836eab90-f526-44b6-b147-076dfff7cd62');
  logoImage.setAttribute('class', 'logoImage');
  // Boton cerrar sesion
  const logOutIcon = document.createElement('button');
  logOutIcon.setAttribute('class', 'logOutButton');
  // icono cerrar sesion
  const iconLogOut = document.createElement('img');
  iconLogOut.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fsalir.png?alt=media&token=88e1e584-e158-446a-bd54-6f4da6ddf03b');
  // Contenedor de Creacion de post
  const containerPubication = document.createElement('div');
  containerPubication.setAttribute('class', 'containerPubication');
  // Imagen Post
  const imagePublication = document.createElement('img');
  imagePublication.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fmujer.png?alt=media&token=701d2fdc-675b-4550-b43f-162075eb0943');

  imagePublication.setAttribute('class', 'imagePublication');
  // Formulario para la creacion de post
  const containerPost = document.createElement('form');
  containerPost.setAttribute('id', 'task-form');
  // Input titulo
  const postTitle = document.createElement('input');
  postTitle.setAttribute('type', 'text');
  postTitle.setAttribute('class', 'inputTitle');
  postTitle.setAttribute('placeholder', 'Título de la publicación.');
  // Input descripcion
  const post = document.createElement('textarea');
  post.setAttribute('placeholder', 'Ingresa el contenido de la publicación.');
  post.setAttribute('id', 'inputDescription');
  // Nuevo campo para cargar archivos (fotos)
  const imageInput = document.createElement('input');
  imageInput.setAttribute('type', 'file');
  imageInput.setAttribute('id', 'post-image');
  imageInput.setAttribute('accept', 'image/*');
  // Boton publicar
  const buttonSave = document.createElement('button');
  buttonSave.setAttribute('class', 'buttonSave');
  buttonSave.textContent = 'Publicar';
  // contenedor post
  const viewPost = document.createElement('div');
  viewPost.setAttribute('class', 'postView');

  buttonSave.addEventListener('click', (e) => {
    e.preventDefault();
    if (postTitle.value === '' || post.value === '') {
      alert('Campos vacios');
    }
    saveTask(postTitle.value, post.value, imageInput.files[0]);
    containerPost.reset();
  });

  function setupPost(data) {
    if (data) {
      let html = '';
      data.forEach((doc) => {
        const postdata = doc.data();
        if (!postdata.imageUrl) {
          html += `
          <li class="ListGroupItem">
            <div class='buttonOptions'>
              <button class='deleteButton' data-post-id="${doc.id}"> Delete </button>
              <button class='editButton' data-post-id="${doc.id}"> Editar </button>
            </div>

            <div class='post-contain'>
              <h1 class='postTitle'>${postdata.title}</h5>
              <p class='postDescription'>${postdata.description}</p>
            </div>
        
            <div class="containerLikes" data-post-id="${doc.id}">
              <button class="likeButton" data-post-id="${doc.id}">
                <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Flike.png?alt=media&token=36cb50ad-0402-421f-ad97-ca3ba12f8a85" class='imgLike'>
              </button>
              <span>${postdata.likes} Likes</span>
            </div>

          <h4 class='editPublic' data-post-id="${doc.id}" style="display: none;"> Editar publicación: </h4>
          <textarea class="editTextarea" data-post-id="${doc.id}" style="display: none;">${postdata.title}</textarea>
          <textarea class="editContentTextarea" data-post-id="${doc.id}" style="display: none;">${postdata.description}</textarea>
          <button class="saveEditButton" data-post-id="${doc.id}" style="display: none;">Guardar</button>
          </li>
          `;
        } else {
          html += `
          <li class="ListGroupItem">
          <div class='buttonOptions'>
          <button class='deleteButton' data-post-id="${doc.id}"> Delete </button>
          <button class='editButton' data-post-id="${doc.id}"> Editar </button>
          </div>
          <h5>${postdata.title}</h5>
          <p>${postdata.description}</p>
          <img src="${postdata.imageUrl}" alt="Imagen del post" data-post-id="${doc.id}" class="imgPostPublication">
          <div class="containerLikes" data-post-id="${doc.id}">
          <button class="likeButton" data-post-id="${doc.id}">
          <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Flike.png?alt=media&token=36cb50ad-0402-421f-ad97-ca3ba12f8a85" class='imgLike'>
          </button>
          <span>${postdata.likes} Likes</span>
          </div>
          <h4 class='editPublic' data-post-id="${doc.id}" style="display: none;"> Editar publicación: </h4>
          <textarea class="editTextarea" data-post-id="${doc.id}" style="display: none;">${postdata.title}</textarea>
          <textarea class="editContentTextarea" data-post-id="${doc.id}" style="display: none;">${postdata.description}</textarea>
          <button class="saveEditButton" data-post-id="${doc.id}" style="display: none;">Guardar</button>
          </li>
          `;
        }
      });
      viewPost.innerHTML = html;

      // Evento Like
      const likeButtons = document.querySelectorAll('.likeButton');
      likeButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          const postId = e.currentTarget.getAttribute('data-post-id');
          const userId = auth.currentUser.uid; // Obtiene el id del usuario actual
          const isLiked = e.currentTarget.classList.contains('liked'); // Verifica si el botón ya ha sido "liked"
          // Cambiar el estado del botón "like" (colorear o quitar el color rojo)
          if (isLiked) {
            e.currentTarget.classList.remove('liked');
          } else {
            e.currentTarget.classList.add('liked');
          }
          handleLike(postId, userId, () => {
            // CallBack después de un like
            const userPostsCollection = collection(firestore, 'post');
            getDocs(userPostsCollection).then((snapshot) => {
              setupPost(snapshot.docs);
            });
          });
        });
      });

      // Evento Delete
      const deleteButton = document.querySelectorAll('.deleteButton');
      deleteButton.forEach((button) => {
        button.addEventListener('click', (e) => {
          // eslint-disable-next-line
           const alertDelete = confirm('¿Está segur@ que desea eliminar este post?');
          const postId = e.currentTarget.getAttribute('data-post-id');
          if (alertDelete === true) {
            deletePost(postId);
            alert('Post eliminado con éxito');
          } else {
            alert('Operación cancelada');
          }
        });
      });
      // Evento Editar
      const editButtons = document.querySelectorAll('.editButton');
      editButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          const postId = e.currentTarget.getAttribute('data-post-id');
          const textareaTitle = document.querySelector(
            `.editTextarea[data-post-id="${postId}"]`,
          );
          const textareaDescription = document.querySelector(
            `.editContentTextarea[data-post-id="${postId}"]`,
          );
          const saveEditButton = document.querySelector(
            `.saveEditButton[data-post-id="${postId}"]`,
          );
          const likeButton = document.querySelector(
            `.containerLikes[data-post-id="${postId}"]`,
          );
          const descriptionEdit = document.querySelector(
            `.editPublic[data-post-id="${postId}"]`,
          );
          textareaTitle.style.display = 'flex';
          textareaDescription.style.display = 'flex';
          saveEditButton.style.display = 'flex';
          descriptionEdit.style.display = 'flex';
          likeButton.style.display = 'none';

          saveEditButton.addEventListener('click', () => {
            editPost(postId, textareaTitle.value, textareaDescription.value)
              .then(() => {
                alert('Publicación editada con éxito');
              })
              .catch((error) => {
                console.error('Error al editar el post:', error);
              });
          });
        });
      });
    } else {
      // console.error('Data is not an array:', data);
      viewPost.innerHTML = '<p> Aun no hay publicaciones </p>';
    }
  }

  // evento cerrar sesion
  logOutIcon.addEventListener('click', () => {
    // eslint-disable-next-line
    const alertlogOut = confirm('¿Está segur@ que desea salir de su cuenta?');
    if (alertlogOut === true) {
      // mainPage.removeAttribute('class', 'homepage')
      logOut(navigateTo);
    } else {
      alert('Operación cancelada');
    }
  });

  initializeAuth(setupPost);

  mainPage.append(backgroundLayer, headerPost, containerPubication, viewPost);
  headerPost.append(logoImage, logOutIcon);
  logOutIcon.append(iconLogOut);
  containerPubication.append(imagePublication, containerPost);
  containerPost.append(postTitle, post, imageInput, buttonSave);
  return mainPage;
}
