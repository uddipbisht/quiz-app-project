const startBtn = document.getElementById('start-btn');
const questionCountEl = document.getElementById('question-count');
const timePerQuestionEl = document.getElementById('time-per-question');
const sourceEl = document.getElementById('question-source');

const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answersList = document.getElementById('answers');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');
const timerEl = document.getElementById('timer');
const nextBtn = document.getElementById('next-btn');
const quitBtn = document.getElementById('quit-btn');
const scoreText = document.getElementById('score-text');
const reviewBtn = document.getElementById('review-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewList = document.getElementById('review-list');

let questions = [];
let current = 0;
let score = 0;
let timer = null;
let timeLeft = 0;
let userAnswers = [];

const sampleQuestions = [
  { question: "What is the capital of France?", correct_answer: "Paris", incorrect_answers: ["Lyon","Marseille","Nice"] },
  { question: "Which language is used for styling web pages?", correct_answer: "CSS", incorrect_answers: ["HTML","Python","Java"] },
  { question: "Which HTML tag is used for images?", correct_answer: "<img>", incorrect_answers: ["<image>","<src>","<picture>"] },
  { question: "Which planet is called the Red Planet?", correct_answer: "Mars", incorrect_answers: ["Venus","Jupiter","Saturn"] },
  { question: "What does API stand for?", correct_answer: "Application Programming Interface", incorrect_answers: ["Applied Programming Interface","Application Program Interaction","App Programming Interface"] }
];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
quitBtn.addEventListener('click', endQuiz);
restartBtn.addEventListener('click', () => location.reload());
reviewBtn.addEventListener('click', showReview);

async function startQuiz() {
  const count = parseInt(questionCountEl.value, 10);
  totalEl.textContent = count;
  current = 0;
  score = 0;
  userAnswers = [];

  if (sourceEl.value === "opentdb") {
    try {
      questions = await fetchOpenTDB(count);
    } catch {
      questions = sampleQuestions.slice(0, count);
    }
  } else {
    questions = [];
    while (questions.length < count) {
      questions = questions.concat(sampleQuestions.map(q => ({ ...q })));
    }
    questions = questions.slice(0, count);
  }

  shuffle(questions);
  quizScreen.classList.remove('hidden');
  resultScreen.classList.add('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  currentEl.textContent = current + 1;
  questionText.innerHTML = q.question;

  const choices = [q.correct_answer, ...q.incorrect_answers];
  shuffle(choices);

  answersList.innerHTML = '';
  for (const choice of choices) {
    const li = document.createElement('li');
    li.tabIndex = 0;
    li.textContent = decodeHtml(choice);
    li.addEventListener('click', () => selectAnswer(li, choice));
    li.addEventListener('keypress', (e) => { if (e.key === 'Enter') selectAnswer(li, choice); });
    answersList.appendChild(li);
  }

  timeLeft = parseInt(timePerQuestionEl.value, 10);
  timerEl.textContent = timeLeft + 's';
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft + 's';
    if (timeLeft <= 0) {
      clearInterval(timer);
      markNoAnswer();
    }
  }, 1000);

  nextBtn.classList.add('hidden');
}

function selectAnswer(li, choice) {
  if (li.classList.contains('disabled')) return;
  clearInterval(timer);
  const q = questions[current];
  const correct = q.correct_answer === choice;

  Array.from(answersList.children).forEach(item => {
    item.classList.add('disabled');
    if (item.textContent === decodeHtml(q.correct_answer)) item.classList.add('correct');
    if (item.textContent === decodeHtml(choice) && !correct) item.classList.add('wrong');
  });

  if (correct) score++;
  userAnswers.push({ q: q.question, selected: choice, correct: q.correct_answer });
  nextBtn.classList.remove('hidden');
}

function markNoAnswer() {
  const q = questions[current];
  Array.from(answersList.children).forEach(item => {
    item.classList.add('disabled');
    if (item.textContent === decodeHtml(q.correct_answer)) item.classList.add('correct');
  });
  userAnswers.push({ q: q.question, selected: null, correct: q.correct_answer });
  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

function endQuiz() {
  clearInterval(timer);
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreText.textContent = `You scored ${score} / ${questions.length}`;
}

function showReview() {
  reviewList.classList.remove('hidden');
  reviewList.innerHTML = '';
  userAnswers.forEach((a, idx) => {
    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `<strong>Q${idx + 1}.</strong> ${a.q}<br>
      <strong>Your answer:</strong> ${a.selected === null ? '<em>None</em>' : decodeHtml(a.selected)}<br>
      <strong>Correct:</strong> ${decodeHtml(a.correct)}`;
    reviewList.appendChild(div);
  });
}

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

async function fetchOpenTDB(amount = 10) {
  const url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results.map(r => ({
    question: r.question,
    correct_answer: r.correct_answer,
    incorrect_answers: r.incorrect_answers
  }));
}
