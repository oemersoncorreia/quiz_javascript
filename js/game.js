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
        question: 'Para você como seria um começo perfeito de projeto Scrum?',
        choice1: 'Possuir um regramento e planejamento rígido e acompanhar tudo de perto nos detalhes',
        choice2: 'O mais importante é ter bons profissionais certificados e acreditar que tudo vai se resolver.',
        choice3: 'Possuir uma equipe multidisciplinar qualificada, integrada e auto organizada',
        choice4: 'O que é Scrum?',
        answer: 3,
    },
    {
        question:
            "Qual dos papéis abaixo faz parte da metodologia Scrum?",
        choice1: "Scrum Master - responsável por facilitar o trabalho da equipe e do Product Owner, servindo como mentor e mediador",
        choice2: "Scrum Owner - Dono do projeto, orientador do sucesso e culpado de tudo se algo der errado.",
        choice3: "Equipe Master - Equipe de testes e verificação final. Dá a partida no projeto e a aprovação final.",
        choice4: "Mestre de Cerimônias - Popularmente conhecido como MC, faz as dailys e demais Cerimônias, sem esquecer de uma boa música para animar.",
        answer: 1,
    },
    {
        question: "Sobre as bases do gerenciamento ágil de projetos com o framework Scrum, marque a opção incorreta.",
        choice1: "Realização de testes regularmente",
        choice2: "Reuniões diárias e Gerenciamento de riscos",
        choice3: "Padrões de qualidade previamente combinados",
        choice4: "Foco no produto bem definido",
        answer: 4,
    },
    {
        question: "Qual a vantagem de adotar o Scrum?",
        choice1: "Maior aderência aos requisitos do cliente",
        choice2: "Não precisar pensar na qualidade do produto",
        choice3: "Maior rigidez e controle para execução de novas funcionalidades",
        choice4: "Entrega única ao final do projeto e sucesso garantido",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../pages/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

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
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
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
    score +=num
    scoreText.innerText = score
}

startGame()
