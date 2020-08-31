// Welcoming user through click prompts
confirm("Are you ready to start your Quiz?");

alert("There will be 5 multiple choice questions.");

alert("Your test will have a time limit of 30 seconds.");

alert("Your score will be kept, so go for top spot! \nPress Ok, then press Start!!");


// Setting constants
const startButton = document.getElementById('start-btn');

const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');

const questionElement = document.getElementById('question');

const answerButtonsElement = document.getElementById('answer-buttons');


// Setting variables
let timerInt;

let secondsLeft = 30;

let shuffledQuestions, currentQuestionIndex

let countRightAnswers= 0;
// This is an attempt to capture the users name to later display in the highScore html
let userName = prompt("What is your name?");


// Event listener added click to start, continue to next question, increase the
// currentQuestionIndex by 1 and run setNextQuestion function
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Create Timer Function calls previous variables and decrements by 1 from 30 to 0
// If secondsLeft is 0, calls clearInterval function on timerInt and calls send Message function
function startTimer ()  {
    timerInt = setInterval(function ()  {
    document.getElementById('timer').textContent = "Time Left: " + secondsLeft;
    secondsLeft--;
    if(secondsLeft === -2)   {
    clearInterval(timerInt);
    sendMessage();
} 
}, 1000);
}

//Below two functions I could not figure out.  They were both functions I was trying to
//create by taking the userName data and then setting it to the highScore in HTML


//function renderLastRegistered()   {
//    
//}

//function setHighScore () {
//   
//}

// Create sendMessage functiion to alert user when timer reaches 0
// Then displays score count
function sendMessage()  {
    alert("Uh Oh! Times up!");
    alert("You scored " + countRightAnswers);
}

// Create function to start the game
// Calls timer, sets start button status to hide in CSS
// Shuffles questions from index
// Sets CSS class on question container to hide
// Calls setNextQuestion function
function startGame() {
    startTimer();
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

// Create function to proceed to next question
// Calls resetState function
// Calls showQuestion function
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Create function to display next question from array
// Changes button text displayed to answer array
// If statement to add score to dataset
// Event listener for button click to call selectAnswer function
// Appends const button to answerButtonsElement
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

// Create function to reset page
// Calls clearStatusClass function on CSS document.body
// While statement to set answer buttons to original state
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild);
    }
}

// Create function for when answer button is clicked
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    if (selectedButton.dataset = correct)   {
        countRightAnswers++;
    }
    document.getElementById('score').textContent = "Score: " + countRightAnswers;
}

// Create function setStatusClass for selection of .body-correct and .body.wrong CSS
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Create function to remove class .body-correct and .body.wrong CSS
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');

}

// Create const array for question and answers index//Index within and index
const questions = [
    {
        question: 'What is and example of a markup language?',
        answers: [
            { text: 'HTML', correct: true },
            { text: 'C++', correct: false },
            { text: 'CSS', correct: false },
            { text: 'Javascript', correct: false },
        ]
    },

    {
        question: 'How do you ask a user a yes/no question in Javascript?',
        answers: [
            { text: 'prompt', correct: false },
            { text: 'confirm', correct: true },
            { text: 'alert', correct: false },
            { text: 'yes/no', correct: false },
        ]
    },

    {
        question: 'How do you commit files to a repository with comments using Git?',
        answers: [
            { text: 'add -A', correct: false },
            { text: 'push', correct: false },
            { text: 'commit -m', correct: true },
            { text: 'status', correct: false },
        ]
    },

    {
        question: 'In CSS, what does the padding element for boxes do?',
        answers: [
            { text: 'Place content', correct: false },
            { text: 'Create a border you can see', correct: false },
            { text: 'Size the area around the content', correct: true },
            { text: 'Size the margin', correct: false },
        ]
    },

    {
        question: 'Which Javascript object creates an array?',
        answers: [
            { text: '()', correct: false },
            { text: 'function', correct: false },
            { text: '[]', correct: true },
            { text: 'let', correct: false },
        ]
    }
]