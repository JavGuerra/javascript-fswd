import { initFirebase } from './initFirebase.js'; 
import { getAuth, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';

const app  = initFirebase();
const auth = getAuth(app);

function logoutUser(e, auth) {
  e.preventDefault();
  console.log (typeof auth);
  signOut(auth)
    .then(() => {
      console.log('User logged out successfully.');
      window.location.href = "index.html";
    })
    .catch(err => {
      openDialog('It has not been possible to log out.');
      console.log(err);
    });
}

export { logoutUser, auth, onAuthStateChanged };