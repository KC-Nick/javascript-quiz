//declares timer
let timer;

$(document).ready(function () {
  console.log("ready!");
  const startBtn = document.getElementById("startBtn");
  const submitBtn = document.getElementById("submitBtn");
  const quizBox = document.getElementById("quizBox");

  //creates array for the correct answers
  var correctAnswers = [];

  //gives meaning to variable currentQuestion
  let currentQuestion = 0;

  //sets timer
  var counter = 60;

  function myTimer() {
    //counts down
    counter--;

    if (counter >= 0) {
      //if counter is greater than or equal to 0, it will display
      span = document.getElementById("timer-count");
      span.innerHTML = counter;

    }

    //alerts that game over screen will run and stops timer
    if (counter <= 0) {

      alert('Game over!');
      clearInterval(timer);
      clearBox();
      endGame();

    }
  }

  //hides and shows buttons and boxes for when the quiz is started
  if (startBtn) {
    startBtn.addEventListener("click", function () {

      submitBtn.style.display = "block";

      startBtn.style.display = "none";

      quizBox.style.display = "block";

    })
  }

  var questions =
    [
      {
        question: "Which of these is NOT a JavaScript datatype?",
        choices: ["Booelan", "Number", "JSON", "String", "Undefined", "Null", "Bigint"],
        answer: "JSON"
      },

      {
        question: "TRUE or FALSE: You are tasked to use the script tag to make sure scripts run after the page has loaded, so you would use async to do this.",
        choices: ["TRUE", "FALSE"],
        answer: "FALSE"
      },
      {
        question: "In a basic app, the script tag to include JavaScript in your HTML is placed:",
        choices: ["In the head tag, with the CSS tag", "At the bottom of the body tag", "In the part of the HTML that it is being called on for functions", "At the top of the body tag before the header"],
        answer: "At the bottom of the body tag"
      },
      {
        question: "What does the typeof operator console log?",
        choices: ["Logs the type of function it is inside, such as the function name.", "Logs the type of data language being used, such as Python.", "Logs the type of style being used on the webpage.", "Logs the data type of the value it is used for, such as Boolean"],
        answer: "Logs the data type of the value it is used for, such as Boolean"
      },
      {
        question: "TRUE or FALSE: JavaScript is a scripting library that allows you to implement compex functions on a web page.",
        choices: ["TRUE", "FALSE"],
        answer: "FALSE"
      },
      {
        question: "When running a JavaScript file, it will run:",
        choices: ["By what functions have most importance to the web page", "In the order it is written", "The order is declared in the JS file"],
        answer: "In the order it is written"
      },
      {
        question: "TRUE or FALSE: JavaScript is used for function only, and cannot function as CSS and HTML do.",
        choices: ["TRUE", "FALSE"],
        answer: "FALSE"
      },
      {
        question: "Defer is used in the script tag to:",
        choices: ["Defer the JavaScript from loading in order to loading in specific order", "Skip over certain functions unless called", "Hold the JavaScript loading until the page is done loading", "Defines an asynchronous script"],
        answer: "Hold the JavaScript loading until the page is done loading"
      },
      {
        question: "TRUE or FALSE: JavaScript does not support regular expressions, and requires additional tools to implement it.",
        choices: ["TRUE", "FALSE"],
        answer: "FALSE"
      },
      {
        question: "TRUE or FALSE: JavaScript is a client-side language, and does not require a server to run.",
        choices: ["TRUE", "FALSE"],
        answer: "TRUE"
      },
    ];

  function showQuestions() {

    //changes html of questions div to render questions
    document.getElementById("questions").innerHTML = questions[currentQuestion].question;

    //empties quizBox div so repetition is avoided
    $("#quizBox").empty();

    for (let j = 0; j < questions[currentQuestion].choices.length; j++) {

      $("#quizBox").append(`<h2><input type="radio" value="${questions[currentQuestion].choices[j]}">${questions[currentQuestion].choices[j]}</h2>`)
    }
  };

  //adds function to start button
  $(startBtn).click(function () {

    //sets timer
    timer = setInterval(myTimer, 1000);

    showQuestions()

    $("#quizBox").click(function (event) {


      if (event.target.value === questions[currentQuestion].answer) {
        //goes to next question
        currentQuestion++;
        //- 1 takes the last question and pushes the correct answer to the array after the answer is selected
        correctAnswers.push(questions[currentQuestion - 1].answer);

        //sets score number
        score = correctAnswers.length;

        //if score is not 0, as set at top of code, and local storage has a score, it will parse the score
        if (!score && localStorage.getItem('score')) {

          score = JSON.parse(localStorage.getItem('score'));
        };

        //converts array of score to string
        var scoreString = JSON.stringify(score);

        //sets updated score to local storage
        localStorage.setItem('score', scoreString);

      } else if (event.target.value !== questions[currentQuestion].answer) {

        //if answer is wrong, it will subtract 15 seconds from the timer
        counter -= 15;
      }

      if (currentQuestion === questions.length) {

        //alerts that the quiz is complete and score is ready to be submitted
        var submitMsg = confirm("You have completed the quiz! Click submit when you're ready to save your score.");

        if (submitMsg) {
          clearBox();
        };

      } else {
        //continues loop if the currentQuestion does not equal the last question
        showQuestions();

      };
    })
  });
});

function clearBox() {
  //stops timer
  clearInterval(timer);
  //changes number of timer to 0
  $('#timer-count').text('0');
  //replaces the question and answer choices in quizBox with submit message
  $('#questions').text('Play again to increase your score! Submit score below.');
  $('#quizBox').empty();
}

function endGame() {

  var userInitials = prompt("Please enter your initials:");
  //gets score from local storage
  var score = JSON.parse(localStorage.getItem('score'));

  //if userInitials is not 0 and local storage has initials, it will parse the initials
  if (!userInitials && localStorage.getItem('initials')) {
    userInitials = JSON.parse(localStorage.getItem('initials'));
  };

  if (userInitials) {

    //converts userInitials to string and sets them in local storage
    var initials = JSON.stringify(userInitials)
    localStorage.setItem('initials', initials);

    //gets game history from local storage or creates empty array if it does exist yet
    var gameHistory = localStorage.getItem('gameHistory') ? JSON.parse(localStorage.getItem('gameHistory')) : [];

    //pushes userInitials and score, called at start of function, to gameHistory array
    gameHistory.push({ initials, score });
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));

  }

  showResults();

}

function showResults() {
  //gets combined initials and score from local storage or creates new array if it doesn't exist yet
  var gameHistory = localStorage.getItem('gameHistory') ? JSON.parse(localStorage.getItem('gameHistory')) : [];

  //if gameHistory array is greater than 0
  if (gameHistory.length > 0) {

    // it will empty the results div and append the initials and score to the results div
    $("#results").empty();
    gameHistory.forEach(function (game) {
      var results = $('<li>' + game.initials + ' with a score of ' + game.score + '</li>');
      $("#results").append(results);
    });

  }
}

$("#submitBtn").click(function () {
  endGame();
});

//shows results when page is loaded
showResults();

function refreshQuiz() {
  window.location.reload();
};