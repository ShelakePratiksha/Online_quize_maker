let quizzes = [];
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function addQuestion() {
    const questionsDiv = document.getElementById('questions');
    const questionCount = questionsDiv.children.length + 1;
    const questionHtml = `
        <div>
            <input type="text" placeholder="Question ${questionCount}" required>
            <input type="text" placeholder="Option A" required>
            <input type="text" placeholder="Option B" required>
            <input type="text" placeholder="Option C" required>
            <input type="text" placeholder="Option D" required>
            <input type="text" placeholder="Correct Answer" required>
        </div>`;
    questionsDiv.insertAdjacentHTML('beforeend', questionHtml);
}

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const quizTitle = this.querySelector('input[type="text"]').value;
    const questions = Array.from(this.querySelectorAll('div')).map(q => {
        const inputs = q.querySelectorAll('input');
        return {
            question: inputs[0].value,
            options: [inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value],
            answer: inputs[5].value
        };
    });
    quizzes.push({ title: quizTitle, questions });
    showSection('quizListing');
    displayQuizzes();
});

function displayQuizzes() {
    const quizList = document.getElementById('quizList');
    quizList.innerHTML = '';
    quizzes.forEach((quiz, index) => {
        const quizItem = document.createElement('div');
        quizItem.innerHTML = `<strong>${quiz.title}</strong> <button onclick="takeQuiz(${index})">Take Quiz</button>`;
        quizList.appendChild(quizItem);
    });
}

function takeQuiz(quizIndex) {
    currentQuiz = quizzes[quizIndex];
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length) {
        const question = currentQuiz.questions[currentQuestionIndex];
        const questionDiv = document.getElementById('currentQuestion');
        questionDiv.innerHTML = `
            <h3>${question.question}</h3>
            <div>
                ${question.options.map((opt, index) => `
                    <label>
                        <input type="radio" name="answer" value="${opt}"> ${opt}
                    </label><br>
                `).join('')}
            </div>`;
        showSection('quizTaking');
    } else {
        showResults();
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === currentQuiz.questions[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        showQuestion();
    } else {
        alert('Please select an answer.');
    }
}

function showResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `Your score is ${score} out of ${currentQuiz.questions.length}.`;
    showSection('quizResults');
}
