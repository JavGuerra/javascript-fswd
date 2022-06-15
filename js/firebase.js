import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
const app = initFireBase();

function initFireBase() {
    const firebaseConfig = {
        apiKey: "AIzaSyDaF-45rWqh8YLLUe--EwoYLRiEe2Px0B0",
        authDomain: "summer-quiz-e02fd.firebaseapp.com",
        databaseURL: "https://summer-quiz-e02fd-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "summer-quiz-e02fd",
        storageBucket: "summer-quiz-e02fd.appspot.com",
        messagingSenderId: "163068474160",
        appId: "1:163068474160:web:c5db0935ac758fa6c4cef5"
    };
    return initializeApp(firebaseConfig);
}

async function getQuestionFireBase() {
    try {
        setSpin(true);
        const refResults = ref(getDatabase(app));
        const rndChild = 'results/' + getRndInt(0, 24);
        let result = await get(child(refResults, rndChild));
        setSpin(false);
        return result.val();
    }
    catch (err) {openDialog(err); console.log(err)}      
}

export { getQuestionFireBase }