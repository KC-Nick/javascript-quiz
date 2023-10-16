$(document).ready(function () {
  console.log("ready!");
  const startBtn = document.getElementById("startBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const quizQuestion = document.getElementById("question");
  const quizResults = document.getElementById("results");
  if (startBtn) {
    startBtn.addEventListener("click", function () {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
      submitBtn.style.display = "block";
      startBtn.style.display = "none";
      quizQuestion.style.display = "block";

    })
  }
  $(startBtn).click(function () {
    $('quizBox').remove();
    var counter = 60;
    setInterval(function () {
      counter--;
      if (counter >= 0) {
        span = document.getElementById("timer-count");
        span.innerHTML = counter;
      }
      if (counter === 0) {
        alert('sorry, out of time');
        clearInterval(counter);
        //end game function?
      }
    }, 1000);
    for(let i=0; i<myQuestions.length; i++) {
      $('quizBox').append('<h2>'+myQuestions[i].question+'</h2>');
      for (let j = 0; j < myQuestions[j].answers.length; j++) {
        $('quizBox').append('<h2><input type="radio" name="question- "'+i+'"value="</h2>'+myQuestions[i].answers[j]+'">'+myQuestions[i].answers[j])
      }
    }
  });
});
const myQuestions = [
  {
    question: "What is JavaScript used for?",
    answers: {
      a: "Styling applications",
      b: "Creating the base of the application",
      c: "Adding function to an application",
      d: "All of the above"
    },
    correctAnswer: "c"
  },
  {
    question: "TRUE or FALSE: JSON is a data interchange format used to send and receive data by JavaScript, and no other data languages.",
    answers: {
      a: "False",
      b: "True"
    },
    correctAnswer: "a"
  },
  {
    question: "When using JSON to send data, can it stringify functions?",
    answers: {
      a: "Yes",
      b: "No",
      c: "Sometimes, depending on the function",
      d: "Sometimes, depending on the receiving end"
    },
    correctAnswer: "b"
  },
  {
    question: "What does the typeof operator console log?",
    answers: {
      a: "Logs the type of function it is inside, such as the function name.",
      b: "Logs the type of data language being used, such as Python.",
      c: "Logs the type of style being used on the webpage.",
      d: "Logs the type of the value it is used for, such as Boolean."
    },
    correctAnswer: "d"
  },
  {
    question: "TRUE or FALSE: JSON converts a string into an object to send data.",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "b"
  },
  {
    question: "When using JSON to send data, can it stringify functions?",
    answers: {
      a: "Yes",
      b: "No",
      c: "Sometimes, depending on the function",
      d: "Sometimes, depending on the receiving end"
    },
    correctAnswer: "b"
  },
  {
    question: "When using JSON to send data, can it stringify functions?",
    answers: {
      a: "Yes",
      b: "No",
      c: "Sometimes, depending on the function",
      d: "Sometimes, depending on the receiving end"
    },
    correctAnswer: "b"
  }
];
// buildQuiz();
function refreshQuiz() {
  window.location.reload();
};