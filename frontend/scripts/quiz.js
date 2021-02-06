const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'You should begin eating your meal...',
        choice1: 'As soon as you are seated',
        choice2: 'When everyone has been served',
        choice3: 'When you are served',
        choice4: 'After everyone else has eaten first',
        answer: 2,
    },
    {
        question: "A correct thank-you note should have...",
        choice1: "At least two sentences",
        choice2: "Just the words thank you",
        choice3: "A minimum of two pages",
        choice4: "Just buy a card with thank-you on it",
        answer: 1,
    },
    {
        question: "After the knife and fork has been used, keep them...?",
        choice1: "On the table",
        choice2: "Either on the plate or table",
        choice3: "On the plate",
        choice4: "Hand them to waitress",
        answer: 3,
    },
    {
        question: "When bread is served at the meal....",
        choice1: "Break off a small piece and butter it",
        choice2: "Butter a whole piece at a time",
        choice3: "Cut it in half and butter it",
        choice4: "Make a butter sandwich",
        answer: 1,
    },
    {
        question: "Impressions are made within the first ______ upon meeting someone",
        choice1: "7 seconds",
        choice2: "60 minutes",
        choice3: "30 seconds",
        choice4: "2 hours",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('results.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()

