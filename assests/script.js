// Quiz questions and answers
const questions = [
    {
      question: "Question 1: What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "Rome", correct: false },
        { text: "Berlin", correct: false },
      ],
    },
    {
      question: "Question 2: Who painted the Mona Lisa?",
      answers: [
        { text: "Leonardo da Vinci", correct: true },
        { text: "Pablo Picasso", correct: false },
        { text: "Vincent van Gogh", correct: false },
      ],
    },
    // Add more questions here...
];
  
let currentQuestionIndex = 0;
let score = 0;
let time = 300;
let timerInterval;
let quizCompleted = false; // Flag to track if the quiz is completed
  
const startButton = document.getElementById("start-btn");
const highScoresButton = document.getElementById("high-scores-btn");
const questionContainer = document.getElementById("question-container");
const timerElement = document.getElementById("time");
const resultContainer = document.getElementById("result-container");
  
  startButton.addEventListener("click", startQuiz);
  highScoresButton.addEventListener("click", goToHighScores);
  
function startQuiz() {
    resetQuiz();
    startButton.disabled = true;
    startTimer();
    showNextQuestion();
}
  
function showNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
    } else {
      endQuiz();
    }
}
  
function showQuestion(question) {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerText = question.question;
    questionContainer.appendChild(questionElement);
  
    question.answers.forEach((answer) => {
      const answerButton = document.createElement("button");
      answerButton.innerText = answer.text;
      answerButton.classList.add("btn");
      if (answer.correct) {
        answerButton.dataset.correct = answer.correct;
      }
      answerButton.addEventListener("click", selectAnswer);
      questionContainer.appendChild(answerButton);
    });
}
  
function resetState() {
    clearQuestion();
    clearResult();
}
  
function clearQuestion() {
    while (questionContainer.firstChild) {
      questionContainer.removeChild(questionContainer.firstChild);
    }
}
  
function clearResult() {
    resultContainer.innerText = "";
}
  
function selectAnswer(e) {
    if (quizCompleted) {
      return; // Prevent answering questions after completing the quiz
    }
  
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
  
    if (correct) {
      score++;
    }
  
    Array.from(questionContainer.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });
  
    currentQuestionIndex++;
    setTimeout(showNextQuestion, 1000); // Delay before showing the next question
}
  
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
}
  
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}
  
function startTimer() {
    timerElement.innerText = formatTime(time);
    timerInterval = setInterval(() => {
      time--;
      if (time < 0) {
        clearInterval(timerInterval);
        endQuiz();
      } else {
        timerElement.innerText = formatTime(time);
      }
    }, 1000);
}
  
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
}
  
function endQuiz() {
    clearQuestion();
    resultContainer.innerText = "You got " + score + " correct!!!";
    startButton.disabled = false;
    quizCompleted = true;
  
    // Retrieve existing scores from local storage or initialize an empty array
    const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
  
    // Create a new score object with the current score and time
    const newScore = { score: score * (time + 1), time: time };
  
    // Add the new score to the array of stored scores
    storedScores.push(newScore);
  
    // Sort the scores in descending order based on score
    storedScores.sort((a, b) => b.score - a.score);
  
    // Store the updated scores back in local storage
    localStorage.setItem("quizScores", JSON.stringify(storedScores));
  
    score = 0; // Reset the score for the next quiz
    time = 300; // Reset the timer
    clearInterval(timerInterval);
    timerElement.innerText = formatTime(time);
}
  
  
function goToHighScores() {
    location.href = "highscores.html";
}
  
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    time = 300;
    quizCompleted = false;
    clearInterval(timerInterval);
    clearQuestion();
    clearResult();
    timerElement.innerText = formatTime(time);
}


