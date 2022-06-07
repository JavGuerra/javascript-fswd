let range = 10;    // maximum score per quiz
let numQ  = 10;    // number of questions per quiz
let hits  = 0;     // hist in a quiz
let scores = [];   // list of scores
let numScores = 5; // number of scores to be displayed

const elWelcome = el('#welcome');
const elTable   = el('#table'  );
const elTmeter  = el('#tmeter' );
const elQuiz    = el('#quiz'   );
const elResult  = el('#result' );
const elHits    = el('#hits'   );
const btnPlay   = el('#play'   );
const btnEnd    = el('#end'    );
const btnStart  = el('#start'  );

btnPlay.onclick  = play;
btnEnd.onclick   = end;
btnStart.onclick = start;

if(localStorage.scores) showScores();
else hideScores();

/**
 * Start the quiz
 */
function play() {
    showEl(elWelcome, false);
    showEl(elQuiz, true);
    questionnaire();
}

/**
 * Start the endgame actions
 */
function end() {
    setHand(hits);
    addHTML(elHits, hits, true);
    showEl(elQuiz, false);
    showEl(elResult, true);
    saveScore();
}

/**
 * Start the game again
 */
function start() {
    hideScores();
    showEl(elResult, false);
    showEl(elWelcome, true);
    showScores();
}

/**
 * Displays the scores stored in localStorage
 */
function showScores() {
    let tbody, tr;
    let value = available = percent = 0;
    setSpin(true);
    setInactiveBtn(btnPlay, true);
    showEl(elTmeter, true);

    scores = JSON.parse(localStorage.scores);

    tbody = createTable(elTable, 'scoresTable', ['Hits', 'Date & Time']);
    scores.slice(-numScores).reverse().forEach(score => {
        tr = createEl(tbody, 'tr');
        createEl(tr, 'td', score.hits.toString());
        createEl(tr, 'td', score.dateTime);
        value += score.hits;
        available++;
    })
    percent = setMeter(value, range, numScores, available);

    setSpin(false);
    setInactiveBtn(btnPlay, false);
}

/**
 * Hide the scoring area
 */
function hideScores() {
    addHTML(elTable, '', true);
    showEl(elTmeter, false);
}

/**
 * Saves the score of the completed quiz
 */
function saveScore() {
    setSpin(true);
    setInactiveBtn(btnStart, true);

    if(localStorage.scores) {
        scores = JSON.parse(localStorage.scores);
    }
    scores.push({'hits': hits, 'dateTime': currentDateTime()});
    localStorage.setItem('scores', JSON.stringify(scores)); 
    
    setSpin(false);
    setInactiveBtn(btnStart, false);
}

/**
 * Gets the questions for the Quiz
 */
function questionnaire() {
    let address = `https://opentdb.com/api.php?amount=${numQ}&type=multiple`;
    let query = (data) => {
        if (data.response_code) throw Error('API n. ' + data.response_code);
        quiz(data.results);
    };
    fetchAPI(address, query);
}

/**
 * Play the Quiz game
 * @param {Array} questions for the questionnaire
 */
function quiz(questions) {

    questions.forEach((question, q) => {
        el('#category').innerHTML = question.category;
        el('#difficulty').innerHTML = question.difficulty;
        el('#question').innerHTML = question.question;
        el('#option1').innerHTML = question.correct_answer;
        el('#option2').innerHTML = question.incorrect_answers[0];
        el('#option3').innerHTML = question.incorrect_answers[1];
        el('#option4').innerHTML = question.incorrect_answers[2];
        setProgress(numQ, q + 1);
    })

    hits = Math.floor(Math.random() * (10 - 0)) + 0;

}