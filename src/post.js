import { collection, getDocs  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { auth, firestore } from "./firebase";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { renderCreateAccount } from "./register";

import { main } from "./register";
import { saveTask } from "./firebase";



window.addEventListener('DOMContentLoaded', () => {

    })
export function post() {
    main.innerHTML = "";
    const containerPost = document.createElement("form");
    containerPost.setAttribute("id", "task-form");

    containerPost.addEventListener("submit", (e)=> {
      e.preventDefault();
      const title = postTitle.value
      const description = post.value
      //console.log(title, description);
      saveTask(title, description)

      containerPost.reset()
    })
    
    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "title")
    labelTitle.textContent = "Title";
    
    const postTitle = document.createElement("input");
    postTitle.setAttribute("type", "text");
    postTitle.setAttribute("placeholder", "Post Title" )
    

    const labelPost = document.createElement("label");
    labelPost.setAttribute("for", "description")
    labelPost.textContent = "Description";
    
    const post = document.createElement("textarea");
    post.setAttribute("placeholder", "Write description" )
    post.setAttribute("id", "postText" )
    
    const buttonSave = document.createElement("button");
    buttonSave.textContent = "Save"

//contenedor post
    const ViewPost = document.createElement("div");
    ViewPost.textContent = " hola "

    const buttonback = document.createElement("button");
    buttonback.textContent= "back";
    buttonback.addEventListener("click", ()=> {
    renderCreateAccount()
  })
function setupPost(data) {
  if(data.length) {
  let html = "";
  data.forEach(doc => {
    const post = doc.data()
    html += `
    <li class="ListGroupItem">
    <h5>${post.title}</h5>
    <p>${post.description}</p>
    </li>
    `;
  });
   ViewPost.innerHTML= html;
  } else {
    ViewPost.innerHTML = `<p>Login to see posts</p>`
  }
  }
  
onAuthStateChanged(auth, (user) => {
    if (user) {
      // Ahora user es el objeto de usuario autenticado
      // Puedes acceder a la colección de 'post' del usuario
      const userPostsCollection = collection(firestore, "post");
    
      getDocs(userPostsCollection).then((snapshot) => {
        // snapshot.docs contiene los documentos de la colección
        setupPost(snapshot.docs);
        console.log(snapshot.docs);
      });
    } else {
      setupPost([])
      console.log("Sing out");
    }
    });
    main.append(containerPost, ViewPost, buttonback)
   
    containerPost.append(labelTitle, postTitle, labelPost, post, buttonSave);
}