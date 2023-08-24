const btnIngresar = document.querySelector("#btnIngresar");
const btnSalir = document.querySelector("#btnSalir");
const formulario = document.querySelector("#formulario");
const btnEnviar = document.querySelector("#btnEnviar");
const chat = document.querySelector("#chat");
const msgInicio = document.querySelector("#msgInicio");



// https://console.firebase.google.com/project/firechat-boostrap5
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  

 // Add Firebase products that you want to use
    import { getAuth,signInWithPopup, GoogleAuthProvider , onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js'
    import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js'



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
    try {
         

        // Add a new document with a generated id.
        await addDoc(collection(db, "chats"), {

            msg: formulario.msg.value.trim(),
            uid: auth.currentUser.uid,
            fecha: new Date(),        
    });
console.log("Document written with ID: ", docRef.id);














        
     } catch (error) {
        
     }



})


