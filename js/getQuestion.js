import { initFirebase } from './initFirebase.js'; 
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

const app = initFirebase();
const db  = getDatabase(app);

async function getQuestionFireBase() {
    let result = null;
    setSpin(true);

    try {
        const rndChild = 'questions/' + getRndInt(0, 24);
        result = await get(child(ref(db), rndChild));
        result = result.val();
    }
    catch (err) {openDialog(err); console.log(err)}  

    setSpin(false); 
    return result;   
}

export { getQuestionFireBase }