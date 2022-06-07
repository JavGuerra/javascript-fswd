let range = 10;     // Maximum score per quiz
let numQ  = 10;     // Number of total questions per quiz
let hits  = 0;      // Hist in a quiz
let scores = [];    // List of scores
let numScores = 5;  // Number of scores to be displayed
let questions = []; // The quiz questions
let question = {};  // Selected question and answers
let qIndex = 1;     // Actual Q&A order number
let cards = [0, 1, 2, 3]; // Where questions are mixed 

const elWelcome = el('#welcome');
const elTable   = el('#table'  );
const elTmeter  = el('#tmeter' );
const elQuiz    = el('#quiz'   );
const elResult  = el('#result' );
const elHits    = el('#hits'   );
const elCatego  = el('#catego' );
const elDiffic  = el('#diffic' );
const elQuesti  = el('#questi' );
const btnPlay   = el('#play'   );
const btnSend   = el('#send'   );
const btnStart  = el('#start'  );

btnPlay.onclick  = play;
btnStart.onclick = start;
btnSend.onclick  = event => checkAnswer(event);

if(localStorage.scores) showScores();
else hideScores();
getQuiz();

/**
 * Start the quiz
 */
function play() {
    setProgress(numQ, 0);
    setInactiveBtn(btnSend, true);
    showEl(elWelcome, false);
    showEl(elQuiz, true);
    askQuestion();
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
    getQuiz();
    qIndex = 1;
    hits = 0;
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
function getQuiz() {
    let address = `https://opentdb.com/api.php?amount=${numQ}&type=multiple`;
    let query = (data) => {
        if (data.response_code) throw Error('API #' + data.response_code);
        questions = data.results;
    };
    fetchAPI(address, query);
}

/**
 * Show a new question
 */
function askQuestion() {
    setProgress(numQ, qIndex -1);

    fisherYatesShuffle(cards);
    for (let i = 0; i <= 3; i++) {
        el(`#opt${i + 1}`).checked = false;
        el(`#opt${i + 1}`).setAttribute('value', cards[i]);
    }
    question = questions[qIndex - 1];
    addHTML(elCatego, question.category);
    addHTML(elDiffic, question.difficulty);
    addHTML(elQuesti, question.question);

    for (let i = 0; i <= 3; i++) {
        if(cards[i]) {
            addHTML(el(`label[for=opt${i + 1}]`), question.incorrect_answers[i]);
        } else {
            addHTML(el(`label[for=opt${i + 1}]`), question.correct_answer);
            console.log(question.correct_answer); // Did someone ask for help? ;)
        }
    }

    setInactiveBtn(btnSend, false);
}

/**
 * Check the form
 * @param {event} event prevent
 */
function checkAnswer(event) {
    event.preventDefault();
    setInactiveBtn(btnSend, true);
    
    // If (!response) hits++;

    if (qIndex == numQ) {
        hits = Math.floor(Math.random() * (10 - 0)) + 0;
        end();
    } else {
        qIndex++;
        askQuestion();
    }
}