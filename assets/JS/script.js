var timer;
const initialGameDuration = 60;
var gameDuration = initialGameDuration; // in seconds = 1 minute
const timePenality = 10; // in seconds = 10 
var winsCounter = 0;
var loseCounter = 0;
var nexQuestionIndex = 0;
var userCanKeepPlaying = false;
const gameClock = document.getElementById("gameClock");
const startButton = document.getElementById("start");
const resetButton = document.querySelector(".reset-button");
const winScoreElement = document.getElementById('winScore');
const loseScoreElement = document.getElementById('loseScore');
const questionContainerElement = document.getElementById('questionContainer');


//Object for questions options and valid answers.
var quizQuestions = [
  {
    question: "Common used data types DO NOT indluce:",
    possibleAnswers: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: 3,
  },
  {
    question: "The condition in an if / else statement is enclosed within_____",
    possibleAnswers: [
      "Commas",
      "Curly Brackets",
      "Parenthesis",
      "Square Brackets",
    ],
    correctAnswer: 2,
  },
  {
    question: "Arrays in JavaScrip can be used to store_____",
    possibleAnswers: [
      "Numbers and Strings",
      "Other Arrays",
      "Booleans",
      "All Of The Above",
    ],
    correctAnswer: 4,
  },
  {
    question:
      "String values must be enclosed within_____ when being assigned to variables.",
    possibleAnswers: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    correctAnswer: 3,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    possibleAnswers: [
      "JavaScript",
      "Curly Terminal/Bash",
      "For Loops",
      "Console.log",
    ],
    correctAnswer: 4,
  },
];

// StartGame function is called when startGame button is clicked
function startGame() {
  userCanKeepPlaying = true;
  // Prevents start button from being clicked when game is in play
  startButton.disabled = true;
  setDisplayQuestionSection('show');
  renderQuestions();
  startTimer();
}

function setDisplayQuestionSection(cssClassName) {
  questionContainerElement.setAttribute('class', cssClassName);
}

// setTimer function starts and stops timer and triggers userWin() and userLose()
function startTimer() {
  updateGameClock(gameDuration)
  // Sets timer
  timer = setInterval(function () {
    gameDuration--;
    updateGameClock(gameDuration);
  }, 1000); // runs every second
}

// function to display questions
function renderQuestions() {
  // Randomly picks question from quizQuestions array
  var questionToUser =
    quizQuestions[nexQuestionIndex];
    nexQuestionIndex++;
  var currentQuestion = document.getElementById("question"); 
  currentQuestion.innerHTML = questionToUser.question;
  const options = document.getElementById("multipleChoices");
  options.innerHTML = "";
  for (let i = 0; i < questionToUser.possibleAnswers.length; i++) {
    //dynamically adds an li with a radio button, + user answer, + passes for loop to check user answer
    options.innerHTML += `<li> <input type='radio' onclick='checkAnswer(${i+1})'/> ${questionToUser.possibleAnswers[i]} </li>`;
  }
}

//checks to see if answer is correct
function checkAnswer(userPick) {
  //Get current question from questions element
  const currentQuestion = document.getElementById("question");
  const questionAsked = currentQuestion.innerText;
  //Look for correct answer in quizQuestions array.
  const correctAnswerForAskedQuestion = quizQuestions.find(
    (item) =>
      item.question.toLocaleLowerCase() === questionAsked.toLocaleLowerCase()
  );
  //Compare Answers
  if (correctAnswerForAskedQuestion.correctAnswer == userPick) {
    winsCounter++;

  } else {
    loseCounter++;
    gameDuration = gameDuration - timePenality;
  }
  updateScore(winsCounter, loseCounter);
  userCanKeepPlaying = nexQuestionIndex < quizQuestions.length;

  if ( userCanKeepPlaying ) {
   // If time left, let the user play
    renderQuestions();
  } else {
    endGame();
  }
}

function resetGame() {
  stopGameClock(timer);
  gameDuration = initialGameDuration;
  setDisplayQuestionSection('hidden');
  startButton.disabled = false; // Let user start a new game
  updateScore(0,0);
}

function updateGameClock(timeLeft) {
  if (timeLeft <=0 ) {
   endGame();
  } else {
    gameClock.innerText = `${timeLeft} seconds remaining`;
  }
}

function updateScore(win, lose){
  winScoreElement.innerText= win;
  loseScoreElement.innerText = lose;
}

function stopGameClock(){
  clearInterval(timer);
  gameClock.innerText = ''; // To remove text from UI
}

function endGame(){
  winsCounter = 0;
  loseCounter = 0;
  userCanKeepPlaying = false;
  stopGameClock(timer);
  gameClock.innerText = `You ran out of time!`;
  setDisplayQuestionSection('hidden');
  if (winsCounter > loseCounter) {
    alert('YOU WON!');
  } else {
    alert('YOU LOST!');
  }
}

// PROGRAM ENTRY POINT
function main() {
  // Attach event listener to start button to call startGame function on click
  startButton.addEventListener("click", startGame);

  // Attaches event listener to button
  resetButton.addEventListener("click", resetGame);
}

main();
