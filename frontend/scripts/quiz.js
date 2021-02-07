const playButton = document.getElementById('play-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

playButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
    header.classList.add('hide')
    playButton.classList.add('hide')
    questionCounter = 0
    score = 0
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    playButton.innerText = 'Restart'
    playButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'You should begin eating your meal...',
    answers: [
      { text: 'As soon as you are seated', correct: false },
      { text: 'When everyone has been served', correct: true },
      { text: 'When you are served', correct: false },
      { text: 'After everyone else has eaten first', correct: false }
    ]
  },
  {
    question: 'A correct thank-you note should have...',
    answers: [
      { text: 'At least two sentences', correct: true },
      { text: 'Just the words thank you', correct: false },
      { text: 'A minimum of two pages', correct: false },
      { text: 'Just buy a card with thank-you on it', correct: false }
    ]
  },
  {
    question: 'After the knife and fork has been used, keep them...',
    answers: [
      { text: 'On the table', correct: false },
      { text: 'Either on the plate or table', correct: false },
      { text: 'On the plate', correct: true },
      { text: 'Hand them to waitress', correct: false }
    ]
  },
  {
    question: 'When bread is served at the meal...',
    answers: [
      { text: 'Break off a small piece and butter it', correct: true },
      { text: 'Butter a whole piece at a time', correct: false },
      { text: 'Cut it in half and butter it', correct: false },
      { text: 'Make a butter sandwich', correct: false }
    ]
  },
  {
    question: 'Impressions are made within the first ______ upon meeting someone',
    answers: [
      { text: '7 seconds', correct: true },
      { text: '60 minutes', correct: false },
      { text: '30 seconds', correct: false },
      { text: '2 hours', correct: false }
    ]
  }
]