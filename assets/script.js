$(document).ready(function () {
  console.log("ready!");
  const startBtn = document.getElementById("startBtn");
  const submitBtn = document.getElementById("submitBtn");
  const quizBox = document.getElementById("quizBox");

  //gives meaning to variable currentQuestion
  let currentQuestion = 0;

  //sets timer
  var counter = 60;
  let timer;

  function myTimer() {
    counter--;
    //Gives instruction on countdown
    if (counter >= 0) {
      span = document.getElementById("timer-count");
      span.innerHTML = counter;
    }
    //Alerts to game over and clears timer
    if (counter === 0) {
      alert('sorry, out of time');
      clearInterval(counter);
    }
  }
  //Hides and shows buttons and boxes for when the quiz is started
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
    console.log(questions[currentQuestion]);
    // Loops questions
    document.getElementById("questions").innerHTML = questions[currentQuestion].question;
    $("#quizBox").empty();
    for (let j = 0; j < questions[currentQuestion].choices.length; j++) {
      console.log(questions[currentQuestion].choices[j]);
      $("#quizBox").append(`<h2><input type="radio" value="${questions[currentQuestion].choices[j]}">${questions[currentQuestion].choices[j]}</h2>`)
    }
  };
  //Adds function to start button
  $(startBtn).click(function () {
    //Sets timer - Needs to add/deduct time for right/wrong answers
    timer = setInterval(myTimer, 1000);
    showQuestions()

    $("#quizBox").click(function (event) {
      if (event.target.value === questions[currentQuestion].answer) {
        currentQuestion++;
        var correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || []; // Retrieve existing correct answers from localStorage or initialize an empty array
        correctAnswers.push(questions[currentQuestion - 1].answer); // Add the correct answer to the array
        var correctAnswersString = JSON.stringify(correctAnswers); // Convert the array to a string
        localStorage.setItem('correctAnswers', correctAnswersString); // Save the updated correct answers to localStorage
      } else {
        counter -= 15;
        if (counter < 0) {
          counter = 0;
        }
      }
      if (currentQuestion === questions.length) {
        clearInterval(timer);
      }
      else {
        showQuestions();
      };
    })
  });
});

$("#submitBtn").click(function () {
  endGame();
});
function endGame() {
  var initials = prompt("Please enter your initials:");

  if (initials) {
    var userInitials = JSON.stringify(initials)
    localStorage.setItem('userInitials', userInitials);
  }
  const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'));
  const getInitials = JSON.parse(localStorage.getItem('userInitials'));

  // Loop through
  $("results").empty();
  let scoreObj = correctAnswers.length;
  var initials = JSON.stringify(getInitials);
  var score = JSON.stringify(scoreObj);
  var results = $('<li>' + initials + ' with a score of ' + score + '</li>')
  $("#results").append(results);
}
function refreshQuiz() {
  window.location.reload();
};