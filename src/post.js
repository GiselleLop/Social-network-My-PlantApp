import {
  auth,
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
  mainPage.innerHTML = `
    <div class="headerPost">My Plantapp
    <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fplanta-arana.png?alt=media&token=836eab90-f526-44b6-b147-076dfff7cd62" class="logoImage" alt="Plantapp logo">
    <button class="logOutButton">
      <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fsalir.png?alt=media&token=88e1e584-e158-446a-bd54-6f4da6ddf03b" alt="Cerrar sesión">
    </button>
  
    </div>
   
  
    <div class="containerPublication">
      <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Fmujer.png?alt=media&token=701d2fdc-675b-4550-b43f-162075eb0943" class="imagePublication" alt="Imagen de publicación">
  
      <form id="task-form">
        <input type="text" class="inputTitle" placeholder="Post Title">
        <textarea placeholder="Enter the content of the publication" id="inputDescription"></textarea>
        <div class='publication-alert-and-input-image'> 
          <input type="file" id="post-image" accept="image/*">
          <h4 class='empty-fields'>Empty fields</h4>
        </div>
        <button class="buttonSave">Post</button>
      </form>
    </div>
  
    <div class="postView"></div>
    `;
  function renderPost(postList) {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    console.log(auth.currentUser);
    mainPage.querySelector('.postView').innerHTML = '';
    postList.forEach((doc) => {
      const postCard = document.createElement('div');
      postCard.classList.add('ListGroupItem');
      postCard.innerHTML = `    
              <div class='buttonOptions'> 
                <button class='deleteButton' data-post-id="${doc.id}"> Delete </button>
                <button class='editButton' data-post-id="${doc.id}"> Edit </button>
              </div>
      
              <div class='post-contain'>
                <h1 class='postTitle' data-post-id="${doc.id}">${doc.data().title}</h1>
                <p class='postDescription' data-post-id="${doc.id}">${doc.data().description}</p>
              </div>
              
              <div class="containerLikes" data-post-id="${doc.id}">
                <button class="likeButton" data-post-id="${doc.id}">
                  <img src="https://firebasestorage.googleapis.com/v0/b/social-network-c61c9.appspot.com/o/img%2Flike.png?alt=media&token=36cb50ad-0402-421f-ad97-ca3ba12f8a85" class='imgLike'>
                </button>
                <span>${doc.data().likes} Likes</span>
                <h4 class='alert-post-edited' data-post-id="${doc.id}">Post edited successfully</h4>
                <h4 class='alert-post-error' data-post-id="${doc.id}">Error editing the post, complete all fields </h4>
       
              </div>
              <div class='editPublicContainer' data-post-id="${doc.id}" style="display: none;"></div>
      `;
      if (doc.data().imageUrl) {
        postCard.querySelector('.post-contain').innerHTML = `
        <h1 class='postTitle'>${doc.data().title}</h5>
        <p class='postDescription'>${doc.data().description}</p>
        <img src="${doc.data().imageUrl}" alt="Imagen del post" data-post-id="${
          doc.id
        }" class="imgPostPublication">
        `;
      }
      const likedBy = doc.data().likedBy;
      if (likedBy && likedBy.includes(userId)) {
        // El documento tiene la propiedad likedBy y el usuario ya ha dado like
        const likeButton = postCard.querySelector('.likeButton');
        if (likeButton) {
          likeButton.id = 'likedButtonAndPostByUSer';
        }
      }
      mainPage.querySelector('.postView').appendChild(postCard);
    });

    const deleteButton = document.querySelectorAll('.deleteButton');
    deleteButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        // eslint-disable-next-line
        const alertDelete = confirm(
          '¿Está segur@ que desea eliminar este post?'
        );
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
        const actualTitle = document.querySelector(
          `.postTitle[data-post-id="${postId}"]`
        );
        const actualDescription = document.querySelector(
          `.postDescription[data-post-id="${postId}"]`
        );
        const editContainer = document.querySelector(
          `.editPublicContainer[data-post-id="${postId}"]`
        );
        document.querySelector('.containerLikes').style.display = 'none';
        editContainer.style.display = 'flex';
        editContainer.style.flexDirection = 'column';
        editContainer.innerHTML = `
        <h4 class='editPublic'>Edit post</h4>
        <textarea class="editTextarea" placeholder="Post Title">${actualTitle.textContent}</textarea>
        <textarea class="editContentTextarea" placeholder="Enter the content of the publication">${actualDescription.textContent}</textarea>
        <button class="saveEditButton">Save</button>
     `;

        editContainer
          .querySelector('.saveEditButton')
          .addEventListener('click', () => {
            const titleEdited = editContainer.querySelector('.editTextarea');
            const descriptionEdited = editContainer.querySelector(
              '.editContentTextarea'
            );
            if (titleEdited.value !== '' || descriptionEdited.value !== '') {
              editPost(postId, titleEdited.value, descriptionEdited.value).then(
                () => {
                  editContainer.style.display = 'none';
                  mainPage.querySelector(
                    `.alert-post-edited[data-post-id="${postId}"]`
                  ).style.display = 'flex';
                  document.querySelector('.containerLikes').style.display =
                    'flex';
                }
              );
            } else {
              editContainer.style.display = 'none';
              mainPage.querySelector(
                `.alert-post-error[data-post-id="${postId}"]`
              ).style.display = 'flex';
            }
          });
      });
    });

    // Evento Like
    const likeButtons = document.querySelectorAll('.likeButton');
    likeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const postId = e.currentTarget.getAttribute('data-post-id');
        const userId = auth.currentUser.uid;
        console.log(userId);
        handleLike(postId, userId);
      });
    });

    //   } else {
    //     // console.error('Data is not an array:', data);
    //     viewPost.innerHTML = '<p> Aun no hay publicaciones </p>';
    //   }
    // }
  }
  initializeAuth(renderPost);

  // public post
  mainPage.querySelector('.buttonSave').addEventListener('click', (e) => {
    e.preventDefault();
    const postTitle = document.querySelector('.inputTitle');
    const postDescription = document.querySelector('#inputDescription');
    const imageInput = document.querySelector('#post-image');
    const containerPost = document.querySelector('#task-form');
    if (postTitle.value === '' || postDescription.value === '') {
      mainPage.querySelector('.empty-fields').style.display = 'flex';
      mainPage.querySelector('.empty-fields').style.color = 'red';
      setTimeout(() => {
        mainPage.querySelector('.empty-fields').style.display = 'none';
      }, 1000);
      return;
    }
    saveTask(postTitle.value, postDescription.value, imageInput.files[0]);
    containerPost.reset();
  });

  // evento cerrar sesion
  mainPage.querySelector('.logOutButton').addEventListener('click', () => {
    // eslint-disable-next-line
    const alertlogOut = confirm('¿Está segur@ que desea salir de su cuenta?');
    if (alertlogOut === true) {
      logOut(navigateTo);
    } else {
      alert('Operación cancelada');
    }
  });

  mainPage.append(backgroundLayer);
  return mainPage;
}
