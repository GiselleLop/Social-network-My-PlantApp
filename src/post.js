import {
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
import { auth, firestore, saveTask } from './firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import renderCreateAccount from './register.js';

import { main } from './register.js';

window.addEventListener('DOMContentLoaded', () => {});

export function posts() {
  main.innerHTML = '';
  const containerPost = document.createElement('form');
  containerPost.setAttribute('id', 'task-form');


  const labelTitle = document.createElement('label');
  labelTitle.setAttribute('for', 'title');
  labelTitle.textContent = 'Title';

  const postTitle = document.createElement('input');
  postTitle.setAttribute('type', 'text');
  postTitle.setAttribute('placeholder', 'Post Title');

  const labelPost = document.createElement('label');
  labelPost.setAttribute('for', 'description');
  labelPost.textContent = 'Description';

  const post = document.createElement('textarea');
  post.setAttribute('placeholder', 'Write description');
  post.setAttribute('id', 'postText');

  const buttonSave = document.createElement('button');
  buttonSave.textContent = 'Save';

  // contenedor post
  const ViewPost = document.createElement('div');
  ViewPost.textContent = ' hola ';

  containerPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = postTitle.value;
    const description = post.value;
    // console.log(title, description);
    saveTask(title, description);

    containerPost.reset();
  });
  const buttonback = document.createElement('button');
  buttonback.textContent = 'back';
  buttonback.addEventListener('click', () => {
    renderCreateAccount();
  });
  function setupPost(data) {
    if (data.length) {
      let html = '';
      data.forEach((doc) => {
        const postdata = doc.data();
        html += `
    <li class="ListGroupItem">
    <h5>${postdata.title}</h5>
    <p>${postdata.description}</p>
    </li>
    `;
      });
      ViewPost.innerHTML = html;
    } else {
      ViewPost.innerHTML = '<p>Login to see posts</p>';
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Ahora user es el objeto de usuario autenticado
      // Puedes acceder a la colección de 'post' del usuario
      const userPostsCollection = collection(firestore, 'post');

      getDocs(userPostsCollection).then((snapshot) => {
        // snapshot.docs contiene los documentos de la colección
        setupPost(snapshot.docs);
        console.log(snapshot.docs);
      });
    } else {
      setupPost([]);
      console.log('Sing out');
    }
  });
  main.append(containerPost, ViewPost, buttonback);

  containerPost.append(labelTitle, postTitle, labelPost, post, buttonSave);
}
