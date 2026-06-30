// Dom Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

 const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Nigeria", correct: false},
            { text: "Paris", correct: true},
            { text: "Berlin", correct: false},
            { text: "Aba", correct: false},
        ],
    },
    {
        question: "Which planet is known as the Dwarf Planet",
        answers:[
            { text: "Venus", correct:false},
            { text: "Mars", correct:false},
            { text: "Pluto", correct:true},
            { text: "Jupiter", correct:false},
        ],
    },
    {
        question: "Which of these Longest River in Africa?",
        answers:[
            { text: "Nile", correct:true},
            { text: "Niger", correct:false},
            { text: "Benue", correct:false},
            { text: "Imo", correct:false},
        ],
    },
    {
        question: "Which of these is Not a programming language",
        answers:[
            { text: "C++", correct:false},
            { text: "Javascript", correct:false},
            { text: "HTML", correct:false},
            { text: "Monkey'delufe", correct:true},
        ],
    },
    {
        question: "What is the chemical symbol for gold",
        answers:[
            { text: "Br", correct:false},
            { text: "N", correct:false},
            { text: "Au", correct:true},
            { text: "H2O", correct:false},
        ],
    },
 ];

 //Quiz State Vars
 let currentQuestionIndex = 0;
 let score = 0;
 let answersDisabled = false;

 totalQuestionsSpan.textContent = quizQuestions.length;
 maxScoreSpan.textContent = quizQuestions.length;

 //event listeners

 startButton.addEventListener("click",startQuiz);
 restartButton.addEventListener("click",restartQuiz);

 function startQuiz(){
   //reset vars
   currentQuestionIndex = 0;
   score = 0;
   scoreSpan.textContent = 0;

   startScreen.classList.remove("active");
   quizScreen.classList.add("active");

   showQuestion();
 };

 function showQuestion() {
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent =  [currentQuestionIndex / quizQuestions.length] * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question;

    // todo: explain this in a second
    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click",selectAnswer);

        answerContainer.appendChild(button);
    });
    
 };

 function selectAnswer(event){
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach((button) =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        } else if (button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout( () => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length) {
          showQuestion();
        } else {
            showResults();
        }
    }, 1000);
 }

 function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100

    if (percentage === 100) {
        resultMessage.textContent = "Good! Keep it going!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great! is that your best"
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good! try harder next time"
    } else if (percentage >= 40) {
        resultMessage.textContent = "bad! try taking a break"
    }else {
        resultMessage.textContent = "poor! take your studies serious"
    }
} 



 function restartQuiz(){
   resultScreen.classList.remove("active");

   startQuiz();
 }