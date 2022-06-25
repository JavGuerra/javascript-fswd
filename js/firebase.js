import { initFirebase } from './initFirebase.js'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';
import { getDatabase, ref, get, set, child }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js';

const app  = initFirebase();
const auth = getAuth(app);
const db   = getDatabase(app);

let msg = '';
let play = true;

onAuthStateChanged(auth, (user) => {

  if (user && play) {

    window.location.href = "./game.html";

  } else {
    
    play = false;

    const elDialog  = el('#error'  );
    const elErrMsg  = el('#errMsg' );
    const btnOK     = el('#ok'     );
    const elZone    = el('#zone'   );

    let spins = 0;
    let areSpins = 0;

    let mode = false;
    showEl(el('#datos'), false);
    switchMode();

    el('#envLogin').onclick = (e) => loginUser(e, auth, db);
    el('#envAlta' ).onclick = (e) => signUpUser(e, auth, db);
    el('#lnkLogin').onclick = switchMode;
    el('#lnkAlta' ).onclick = switchMode;

    function switchMode() {
      mode = !mode;
      showEl(el('#login'), mode);
      showEl(el('#alta'), !mode);
    }


    function loginUser(e, auth, db) {
      if (document.formLogin.checkValidity()) {
        e.preventDefault();
        setInactiveBtn(el('#envLogin'), true);
        setSpin(true);

        const correo = document.formLogin.correo.value;
        const passwd = document.formLogin.passwd.value;
        
        signInWithEmailAndPassword(auth, correo, passwd)
          .then(response => {

            console.log('User successfully authenticated.');
            const userId = response.user.uid;

            // TODO Mostrar datos
            // getUserData(db, userId);
            
            showEl(el('#login'), false);
            showEl(el('#datos'), true);
          })
          .catch(err => {
            openDialog('User not available.');
            console.log(err);
          });

          setSpin(false);
          setInactiveBtn(el('#envLogin'), false);
      }
    }


    function signUpUser(e, auth, db) {
      if (document.formAlta.checkValidity()) {
        e.preventDefault();
        setInactiveBtn(el('#envAlta'), true);
        setSpin(true);

        const nombre  = document.formAlta.nombre.value;
        const edad    = document.formAlta.edad.value;
        const direcc  = document.formAlta.direccion.value;
        const correo  = document.formAlta.correo2.value;
        const passwd  = document.formAlta.passwd1.value;
        const passwd2 = document.formAlta.passwd2.value;

        if (passwd !== '' && passwd2 !== '' && passwd === passwd2) {
          if (passwd.length() >= 6) {
            createUserWithEmailAndPassword(auth, correo, passwd)
            .then(response => {
              console.log('User successfully created.');
              const userId = response.user.uid;
              const data = {
              nombre: nombre,
              edad: edad,
              direcc: direcc,
              correo: correo
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
        setInactiveBtn(el('#envLogin'), false);
      }
    }


    function getUserData(db, userId) {
      setSpin(true);

      get(child(ref(db), `users/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log('Datos de usuario obtenidos correctamente.');
            el('#dataNombre').innerHTML = snapshot.val().nombre;
            el('#datoEdad'  ).innerHTML = snapshot.val().edad;
            el('#datoDirec' ).innerHTML = snapshot.val().direcc;
            el('#datoCorreo').innerHTML = snapshot.val().correo;
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

});
