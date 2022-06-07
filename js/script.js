let range = 10;     // maximum score per quiz
let numQ  = 10;     // number of total questions per quiz
let hits  = 0;      // hist in a quiz
let scores = [];    // list of scores
let numScores = 5;  // number of scores to be displayed
let questions = []; // the quiz questions
let question = '';  // selected question and answers
let qIndex = 1;     // actual Q&A order number

const elWelcome = el('#welcome');
const elTable   = el('#table'  );
const elTmeter  = el('#tmeter' );
const elQuiz    = el('#quiz'   );
const elResult  = el('#result' );
const elHits    = el('#hits'   );
const btnPlay   = el('#play'   );
const btnSend   = el('#send'   );
const btnStart  = el('#start'  );

btnPlay.onclick  = play;
btnStart.onclick = start;
btnSend.onclick  = event => checkAnswer(event);

if(localStorage.scores) showScores();
else hideScores();

/**
 * Start the quiz
 */
function play() {
    setProgress(numQ, 0);
    showEl(elWelcome, false);
    showEl(elQuiz, true);
    getQA();
}

/**
 * Start the endgame actions
 */
function end() {
    setHand(hits);
    addHTML(elHits, hits);
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
    addHTML(elTable, '');
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
function getQA() {
    let address = `https://opentdb.com/api.php?amount=${numQ}&type=multiple`;
    let query = (data) => {
        if (data.response_code) throw Error('API #' + data.response_code);
        questions = data.results;
        qIndex = 1;
        ask();
    };
    fetchAPI(address, query);
}

/**
 * Play the Quiz game
 */
function ask() {
    setInactiveBtn(btnSend, true);

    question = questions[qIndex - 1];

    setProgress(numQ, qIndex);

    addHTML(el('#category'), question.category);
    addHTML(el('#difficulty'), question.difficulty);
    addHTML(el('#question'), question.question);
    addHTML(el('#option1'), question.correct_answer);
    addHTML(el('#option2'), question.incorrect_answers[0]);
    addHTML(el('#option3'), question.incorrect_answers[1]);
    addHTML(el('#option4'), question.incorrect_answers[2]);

    setInactiveBtn(btnSend, false);
}

function checkAnswer(event) {
    event.preventDefault();
    
    //

    if (qIndex == numQ) {
        hits = Math.floor(Math.random() * (10 - 0)) + 0;
        end();
    } else {
        qIndex++;
        ask();
    }
}