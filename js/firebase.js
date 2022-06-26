import { initFirebase } from './initFirebase.js'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';
import { getDatabase, ref, get, set, child }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js';

const app  = initFirebase();
const auth = getAuth(app);
const db   = getDatabase(app);

let play = true;

onAuthStateChanged(auth, (user) => {
  if (user && play) window.location.href = "./game.html";
  else firebase();
});

function firebase() {

  play = false;

  const elDialog  = el('#error'  );
  const elErrMsg  = el('#errMsg' );
  const btnOK     = el('#ok'     );
  const elZone    = el('#zone'   );

  let spins = 0;
  let areSpins = 0;
  let msg = '';

  let mode = false;
  showEl(el('#data'), false);
  switchMode();

  el('#sndLogin').onclick = (e) => loginUser(e, auth, db);
  el('#sndReg'  ).onclick = (e) => signUpUser(e, auth, db);
  el('#lnkLogin').onclick = switchMode;
  el('#lnkReg'  ).onclick = switchMode;

  function switchMode() {
    mode = !mode;
    showEl(el('#login'), mode);
    showEl(el('#regtr'), !mode);
  }


  function loginUser(e, auth, db) {
    if (document.formLogin.checkValidity()) {
      e.preventDefault();
      setInactiveBtn(el('#sndLogin'), true);
      setSpin(true);

      const email  = document.formLogin.email.value;
      const passwd = document.formLogin.passwd.value;
      
      signInWithEmailAndPassword(auth, email, passwd)
        .then(response => {

          console.log('User successfully authenticated.');
          const userId = response.user.uid;

          // TODO Mostrar datos
          // getUserData(db, userId);
          
          showEl(el('#login'), false);
          showEl(el('#data' ), true );
        })
        .catch(err => {
          openDialog('User not available.');
          console.log(err);
        });

      setSpin(false);
      setInactiveBtn(el('#sndLogin'), false);
    }
  }


  function signUpUser(e, auth, db) {
    if (document.formAlta.checkValidity()) {
      e.preventDefault();
      setInactiveBtn(el('#sndReg'), true);
      setSpin(true);

      const name    = document.formAlta.name.value;
      const age     = document.formAlta.age.value;
      const adress  = document.formAlta.adress.value;
      const email   = document.formAlta.email2.value;
      const passwd  = document.formAlta.passwd1.value;
      const passwd2 = document.formAlta.passwd2.value;

      if (passwd !== '' && passwd2 !== '' && passwd === passwd2) {
        if (passwd.length() >= 6) {
          createUserWithEmailAndPassword(auth, email, passwd)
          .then(response => {
            console.log('User successfully created.');
            const userId = response.user.uid;
            const data = {
            name: name,
            age: age,
            adress: adress,
            email: email
            };

            // TODO subir datos
            // setUserData(db, userId, data);

            switchMode();
          })
          .catch(err => {
            openDialog('It was not possible to register the user.');
            console.log(err);
          });
        } else {
          msg = 'The password must be at least 6 characters long.';
          openDialog(msg); console.log(msg);
        }
      } else {
        msg = 'Passwords do not match.';
        openDialog(msg); console.log(msg);
      }

      setSpin(false);
      setInactiveBtn(el('#sndLogin'), false);
    }
  }


  function getUserData(db, userId) {
    setSpin(true);

    get(child(ref(db), `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log('User data obtained correctly.');
          el('#dataName'  ).innerHTML = snapshot.val().name;
          el('#dataAge'   ).innerHTML = snapshot.val().age;
          el('#dataAdress').innerHTML = snapshot.val().adress;
          el('#dataEmail' ).innerHTML = snapshot.val().email;
        } else {
          msg = 'No data available.';
          openDialog(msg); console.log(msg);
        }
      })
      .catch(err => {
        openDialog('It has not been possible to obtain user data.');
        console.log(err);
      });

    setSpin(false);
  }


  function setUserData(db, userId, data) {
    setSpin(true);

    try {
      set(ref(db, `users/${userId}`), data);
    }
    catch (err) {
      openDialog('It has not been possible to add user data.');
      console.log(err);
    };

    setSpin(false);
  }

}