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
  //declares timer
  let timer;

  function myTimer() {
    //counts down
    counter--;

    if (counter >= 0) {
      //if counter is greater than or equal to 0, it will display
      span = document.getElementById("timer-count");
      span.innerHTML = counter;

    }

    //alerts that game over screen will run and stops timer
    if (counter === 0) {

      alert('Game over!');
      clearInterval(counter);
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
        question: "What is JavaScript used for?",
        choices: ["Styling applications", "Creating the base of the application", "Adding function to an application", "All of the above"],
        answer: "Adding function to an application"
      },

      {
        question: "TRUE or FALSE: JSON is a data interchange format used to send and receive data by JavaScript, and no other data languages.",
        choices: ["TRUE", "FALSE"],
        answer: "FALSE"
      },
      {
        question: "When using JSON to send data, can it stringify functions?",
        choices: ["Yes", "No", "Sometimes, depending on the function", "Sometimes, depending on the receiving end"],
        answer: "No"
      },
      {
        question: "What does the typeof operator console log?",
        choices: ["Logs the type of function it is inside, such as the function name.", "Logs the type of data language being used, such as Python.", "Logs the type of style being used on the webpage.", "Logs the type of the value it is used for, such as Boolean"],
        answer: "Logs the type of the value it is used for, such as Boolean"
      },
      {
        question: "TRUE or FALSE: JSON converts a string into an object to send data.",
        choices: ["TRUE", "FALSE"],
        answer: "FALSE"
      }
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

      } else {

        //if answer is wrong, it will subtract 15 seconds from the timer
        counter -= 15;

        if (counter < 0) {

          counter = 0;

        }
      }

      if (currentQuestion === questions.length) {

        //alerts that the quiz is complete and score is ready to be submitted
        var submitMsg = confirm("You have completed the quiz! Click submit when you're ready to save your score.");

        if (submitMsg) {

          //stops timer
          clearInterval(timer);
          //changes number of timer to 0
          $('#timer-count').text('0');
          //replaces the question and answer choices in quizBox with submit message
          $('#questions').text('Play again to increase your score! Submit score below.');
          $('#quizBox').empty();

        };

      } else {
        //continues loop if the currentQuestion does not equal the last question
        showQuestions();

      };
    })
  });
});

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