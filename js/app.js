const questionNumber = document.querySelector('.question-number')
const questionText = document.querySelector('.question-text')
const optionContainer = document.querySelector('.option-container')
const answersIndicatorContainer = document.querySelector('.answers-indicator')
const homeBox = document.querySelector('.home-box')
const quizBox = document.querySelector('.quiz-box')
const resultBox = document.querySelector('.result-box')
const questionLimit = 5 //if you want all question: 'questionLimit = quiz.length'

let questionCounter = 0
let currentQuestion
let availableQuestions = []
let availableOptions = []
let correctAnswers = 0
let attempt = 0

// push the questions into availableQuestions array
function setAvailableQuestions() {
    const totalQuestions = quiz.length
    for (let i = 0; i < totalQuestions; i++) {
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion() {
    //   set question number
    questionNumber.innerHTML =
        'Question ' + (questionCounter + 1) + ' of ' + questionLimit

    // set question text
    // get random question
    const questionIndex =
        availableQuestions[
            Math.floor(Math.random() * availableQuestions.length)
        ]

    currentQuestion = questionIndex
    questionText.innerHTML = currentQuestion.q

    // get the position of questionIndex from availableQuestions array
    const index1 = availableQuestions.indexOf(questionIndex)
    // removequestionIndex from availableQuestions array, so the question does not repeat
    availableQuestions.splice(index1, 1)
    // show question with image if img property exists
    if (currentQuestion.hasOwnProperty('img')) {
        const img = document.createElement('img')
        img.src = currentQuestion.img
        questionText.appendChild(img)
    }

    // set options
    // get length of options array
    const optionLen = currentQuestion.options.length
    // push options into availableOptions array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
    }

    optionContainer.innerHTML = ''

    let animationDelay = 0.15
    // create options in HTML
    for (let i = 0; i < optionLen; i++) {
        // random option
        const optionIndex =
            availableOptions[
                Math.floor(Math.random() * availableOptions.length)
            ]

        // get the position of optionIndex from availableOptions array
        const index2 = availableOptions.indexOf(optionIndex)
        //  remove the optionIndex from availableOptions array
        //  so that option does not repeat
        availableOptions.splice(index2, 1)
        const option = document.createElement('div')
        option.innerHTML = currentQuestion.options[optionIndex]
        option.id = optionIndex
        option.style.animationDelay = animationDelay + 's'
        animationDelay = animationDelay + 0.15
        option.className = 'option'
        optionContainer.appendChild(option)
        option.setAttribute('onclick', 'getResult(this)')
    }

    questionCounter++
}

// get result of current attempt
function getResult(element) {
    const id = parseInt(element.id)
    // get the answer by comparing the id of clecked option
    if (id === currentQuestion.answer) {
        // set the green color to the correct option
        element.classList.add('correct')
        // add the indicator to correct mark
        updateAnswerIndicator('correct')
        correctAnswers++
    } else {
        // set the red color to the wrong option
        element.classList.add('wrong')
        // add the indicator to wrong mark
        updateAnswerIndicator('wrong')

        // if the answer is incorect, show the correct option
        // by adding green color the correct option
        const optionLen = optionContainer.children.length
        for (let i = 0; i < optionLen; i++) {
            if (
                parseInt(optionContainer.children[i].id) ===
                currentQuestion.answer
            ) {
                optionContainer.children[i].classList.add('correct')
            }
        }
    }

    attempt++
    unclickableOptions()
}

// make all options unclickable once the user select an option
// (restrict the user to change the answer)
function unclickableOptions() {
    const optionLen = optionContainer.children.length
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add('already-answered')
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = ''
    const totalQuestions = questionLimit
    for (let i = 0; i < totalQuestions; i++) {
        const indicator = document.createElement('div')
        answersIndicatorContainer.appendChild(indicator)
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(
        markType
    )
}

function next() {
    if (questionCounter === questionLimit) {
        quizOver()
    } else {
        getNewQuestion()
    }
}

function quizOver() {
    // hide quiz box
    quizBox.classList.add('hide')
    // show results box
    resultBox.classList.remove('hide')
    quizResult()
}

// get the quiz results
function quizResult() {
    resultBox.querySelector('.total-questions').innerHTML = questionLimit
    resultBox.querySelector('.total-attempts').innerHTML = attempt
    resultBox.querySelector('.total-correct').innerHTML = correctAnswers
    resultBox.querySelector('.total-wrong').innerHTML = attempt - correctAnswers
    const percentage = (correctAnswers / questionLimit) * 100
    resultBox.querySelector('.percentage').innerHTML =
        percentage.toFixed() + '%'
    resultBox.querySelector('.total-score').innerHTML =
        correctAnswers + ' / ' + questionLimit
}

function resetQuiz() {
    questionCounter = 0
    attempt = 0
    correctAnswers = 0
    availableQuestions = []
}

function tryAgain() {
    // hide results box
    resultBox.classList.add('hide')
    // show the quizBox
    quizBox.classList.remove('hide')
    resetQuiz()
    startQuiz()
}

function goHome() {
    // hide results box
    resultBox.classList.add('hide')
    // show home box
    homeBox.classList.remove('hide')
    resetQuiz()
}

// ########## starting point ###########

function startQuiz() {
    // hide home box
    homeBox.classList.add('hide')
    // show home box
    quizBox.classList.remove('hide')

    // first we will set all questions in availableQuestions array
    setAvailableQuestions()
    // second we will call getNewQuestion function
    getNewQuestion()
    // create indicator of answers
    answersIndicator()
}

window.onload = function () {
    homeBox.querySelector('.total-questions').innerHTML = questionLimit
}
