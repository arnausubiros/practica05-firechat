const btnIngresar = document.querySelector("#btnIngresar");
const btnSalir = document.querySelector("#btnSalir");
const formulario = document.querySelector("#formulario");
const btnEnviar = document.querySelector("#btnEnviar");
const chat = document.querySelector("#chat");
const msgInicio = document.querySelector("#msgInicio");
const msgTemplate = document.querySelector("#msgTemplate");


// https://console.firebase.google.com/project/firechat-boostrap5
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Add Firebase products that you want to use
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, onSnapshot, orderBy } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs2RT9md7kNZX_k0Djskn1VXzkQiHeF7c",
  authDomain: "firechat-boostrap5.firebaseapp.com",
  projectId: "firechat-boostrap5",
  storageBucket: "firechat-boostrap5.appspot.com",
  messagingSenderId: "13958282454",
  appId: "1:13958282454:web:d1f8a0a1aa2a2d29e61d77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



const eliminarElemento = (elemento) => {
  elemento.classList.add("d-none");
}

const visualizarElemento = (elemento) => {
  elemento.classList.remove('d-none');
}

let unsubscribe;
chat.innerHTML = "";



onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    console.log('el usuario ya existe', user);
    visualizarElemento(btnSalir);
    visualizarElemento(formulario);
    visualizarElemento(chat);
    eliminarElemento(btnIngresar);
    eliminarElemento(msgInicio);


    const q = query(collection(db, "chats"), orderBy("fecha"));

    chat.innerHTML = "";

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New msg: ", change.doc.data());

          //manipulando el template-------------------------------------------------------------
          const clone = msgTemplate.content.cloneNode(true);
          console.log(clone.querySelector("span"))
          clone.querySelector("span").textContent = change.doc.data().msg;
          if (user.uid === change.doc.data().uid) {
            clone.querySelector("div").classList.add('text-end');
            clone.querySelector("span").classList.add('bg-success');
          } else {
            clone.querySelector("div").classList.add('text-start');
            clone.querySelector("span").classList.add('bg-secondary');
          }



          chat.append(clone);
        }

        chat.scrollTop = chat.scrollHeight;

      });
    });
    // ...
  } else {
    // User is signed out
    // ...
    console.log('no existe el usuario', user);
    visualizarElemento(btnIngresar);
    eliminarElemento(btnSalir);
    eliminarElemento(chat);
    eliminarElemento(formulario);
    visualizarElemento(msgInicio);

    if (unsubscribe) {
      unsubscribe();
    }
  }
});





btnIngresar.addEventListener('click', async () => {

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);

  } catch (error) {
    console.log('error');

  }

})

btnSalir.addEventListener('click', async () => {

  await signOut(auth);

  // An
})

formulario.addEventListener('submit', async (e) => {

  e.preventDefault();
  console.log(formulario.msg.value);

  if (!formulario.msg.value.trim()) {
    formulario.msg.value = "";
    formulario.msg.focus();

    return console.log("Tienes que escribir algo")
  }


  try {


    btnEnviar.disable = true;
    // Add a new document with a generated id.
    await addDoc(collection(db, "chats"), {
      msg: formulario.msg.value.trim(),
      uid: auth.currentUser.uid,
      fecha: new Date(),
    });
    formulario.msg.value = " ";
    //  console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    //  console.log(error);
  } finally {
    btnEnviar.disable = false;
  }
})


