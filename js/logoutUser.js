import { initFirebase } from './initFirebase.js'; 
import { getAuth, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';

const app  = initFirebase();
const auth = getAuth(app);

function logoutUser(event, auth) {
  event.preventDefault();

  signOut(auth)
    .then(() => {
      console.log('User logged out successfully.');
    })
    .catch(err => {
      openDialog('It has not been possible to log out.');
      console.log(err);
    });
}

export { logoutUser, auth, onAuthStateChanged };