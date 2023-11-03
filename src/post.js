import {
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore, saveTask, handleLike, deletePost, editPost } from './firebase.js';

export function posts(navigateTo) {
const homepage = document.querySelector('.homepage');
const body1 = document.querySelector('body');
const backgroundLayer = document.createElement('div');
backgroundLayer.classList.add('background-layer');

  homepage.style.boxShadow = '0px 0px 0px transparent';
  homepage.style.height = '100%';
  homepage.style.width = '100%'
  homepage.style.paddingTop = '0em'; 
  
    backgroundLayer.style.background = "url('/img/patron2.avif')";
    backgroundLayer.style.opacity = 0.1;
    backgroundLayer.style.zIndex = '-1';

    backgroundLayer.style.top = '0';
    backgroundLayer.style.left = '0';
    backgroundLayer.style.width = '100%';
    backgroundLayer.style.height = '100%';

  const mainPage = document.createElement('div');
  mainPage.setAttribute('class', 'homepagePosts');

  const headerPost = document.createElement('div');
  headerPost.textContent = 'Mi Plantapp';
  headerPost.setAttribute('class', 'headerPost');

  const logoImage = document.createElement('img');
  logoImage.setAttribute('src', '/img/planta-arana.png');
  logoImage.setAttribute('class', 'logoImage');
  
  const containerPubication = document.createElement('div');
  containerPubication.setAttribute('class', 'containerPubication');

  const imagePublication = document.createElement('img');
  imagePublication.setAttribute('src', '/img/mujer.png');
  imagePublication.setAttribute('class', 'imagePublication');

  const containerPost = document.createElement('form');
  containerPost.setAttribute('id', 'task-form');

  const postTitle = document.createElement('input');
  postTitle.setAttribute('type', 'text');
  postTitle.setAttribute('class', 'postTitle')
  postTitle.setAttribute('placeholder', 'Título de la publicación.');

  const post = document.createElement('textarea');
  post.setAttribute('placeholder', 'Ingresa el contenido de la publicación.');
  post.setAttribute('id', 'postText');

  const buttonSave = document.createElement('button');
  buttonSave.setAttribute('class', 'buttonSave');
  buttonSave.textContent = 'Publicar';

  // contenedor post
  const viewPost = document.createElement('div');
  viewPost.textContent = ' hola ';
  viewPost.setAttribute('class', 'postView');

  containerPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = postTitle.value;
    const description = post.value;
    // console.log(title, description);
    saveTask(title, description);
    // console.log(auth.currentUser.uid);
    containerPost.reset();
  });
  const buttonback = document.createElement('button');
  buttonback.textContent = 'back';
  buttonback.addEventListener('click', () => {
    navigateTo('/');
  
    backgroundLayer.style.opacity = 0.0;
    backgroundLayer.style.zIndex = '-1';
    backgroundLayer.style.top = '0';
    backgroundLayer.style.left = '0';
    backgroundLayer.style.width = '0%';
    backgroundLayer.style.height = '0%';

    homepage.style.boxShadow = '0 0 10px rgba(156, 158, 156, 0.346), 0 0 20px rgba(135, 136, 135, 0.5), 0 0 30px rgba(0, 255, 0, 0.203)';
    homepage.style.height = '90%';
    homepage.style.width = '90%'
    homepage.style.paddingTop = '0em'; 
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuario autenticado, puedes acceder a la colección de 'post'
      console.log('User authenticated:', auth.currentUser.uid, "email:", user.email);
      const userPostsCollection = collection(firestore, 'post');
  
      onSnapshot(userPostsCollection, (snapshot) => {
        const postSnap = [];
        snapshot.forEach((doc) => {
          postSnap.push(doc);
        });
        setupPost(postSnap);
      });
    } else {
      console.log('Usuario no autenticado');
      navigateTo('/login');
    }
  });
  
  function setupPost(data) {
    if (data.length) {
      let html = '';
      data.forEach((doc) => {
        const postdata = doc.data();
        html += `
    <li class="ListGroupItem">
    <div class='buttonOptions'>
    <button class='deleteButton' data-post-id="${doc.id}"> Delete </button>
    <button class='editButton' data-post-id="${doc.id}"> Editar </button>
    </div>
    <h5>${postdata.title}</h5>
    <p>${postdata.description}</p>
    <div class="containerLikes" data-post-id="${doc.id}">
    <button class="likeButton" data-post-id="${doc.id}">
    <img src="img/like.png" class='imgLike'>
    </button>
    <span>${postdata.likes} Likes</span>
    </div>
    <h4 class='editPublic' data-post-id="${doc.id}" style="display: none;"> Editar publicación: </h4>
    <textarea class="editTextarea" data-post-id="${doc.id}" style="display: none;">${postdata.description}</textarea>
    <textarea class="editContentTextarea" data-post-id="${doc.id}" style="display: none;">${postdata.description}</textarea>
    <button class="saveEditButton" data-post-id="${doc.id}" style="display: none;">Guardar</button>
    </li>
    `;
});
viewPost.innerHTML = html;

//Evento Like
const likeButtons = document.querySelectorAll('.likeButton');
likeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const postId = e.currentTarget.getAttribute('data-post-id');
    const userId = auth.currentUser.uid; // Obtiene el id del usuario actual
    console.log(postId);
  
    handleLike(postId, userId, 
      () => {
      
      //CallBack despues de un like
      const userPostsCollection = collection(firestore, 'post');

      getDocs(userPostsCollection).then((snapshot) => {
        setupPost(snapshot.docs);
  });
});
});
});
//Evento Delete
const deleteButton = document.querySelectorAll('.deleteButton')
deleteButton.forEach((button) => {
button.addEventListener('click', (e)=> {
let alertDelete = confirm('¿Está segur@ que desea eliminar este post?');
const postId = e.currentTarget.getAttribute('data-post-id')
 //alert( alertDelete ); // true si se pulsa OK
  if (alertDelete === true) {
    deletePost(postId);
    alert('Post eliminado con éxito');
    } 
  else {
    alert('Operación cancelada') ; 
  }
})
})
 // Evento Editar
 const editButtons = document.querySelectorAll('.editButton');
 editButtons.forEach((button) => {
   button.addEventListener('click', (e) => {
     const postId = e.currentTarget.getAttribute('data-post-id');
     const textareaTitle = document.querySelector(`.editTextarea[data-post-id="${postId}"]`);
     const textareaDescription = document.querySelector(`.editContentTextarea[data-post-id="${postId}"]`);
     const saveEditButton = document.querySelector(`.saveEditButton[data-post-id="${postId}"]`);
     const likeButton = document.querySelector(`.containerLikes[data-post-id="${postId}"]`);
     const descriptionEdit = document.querySelector(`.editPublic[data-post-id="${postId}"]`)
    
     textareaTitle.style.display = 'flex';
     textareaDescription.style.display = 'flex';
     saveEditButton.style.display = 'flex';
     descriptionEdit.style.display = 'flex';
     likeButton.style.display = 'none';

     saveEditButton.addEventListener('click', () => {
    editPost(postId, textareaTitle.value, textareaDescription.value)
         .then(() => {
           alert('Post editado con éxito');
           // Puedes recargar la lista de posts o actualizar la interfaz según sea necesario
         })
         .catch((error) => {
           console.error('Error al editar el post:', error);
         });
     })
   });
 });

}
else {
  viewPost.innerHTML = '<p>Login to see posts</p>';
}

}
  mainPage.append(headerPost, containerPubication, viewPost, buttonback);
  headerPost.append(logoImage);
  body1.appendChild(backgroundLayer);
  containerPubication.append(imagePublication, containerPost)
  containerPost.append(postTitle, post, buttonSave);
  return mainPage;
}
