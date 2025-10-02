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

// LOGIN
const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const getPassBtn = document.getElementById('get-pass-btn');
const passSection = document.getElementById('password-section');
const generatedPassEl = document.getElementById('generated-pass');
let generatedPassword = "";
let userAge = 0;

// Generate password when clicking "Get Password"
getPassBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  userAge = parseInt(document.getElementById('age').value);

  if (!email || !userAge) {
    alert("Please enter email and age first!");
    return;
  }

  // generate a 6-char password
  generatedPassword = Math.random().toString(36).slice(-6).toUpperCase();
  generatedPassEl.textContent = generatedPassword;
  passSection.classList.remove('hidden');
});

// Login validation
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const enteredPass = document.getElementById('password').value;

  if (enteredPass === generatedPassword) {
    loginScreen.classList.add('hidden');
    document.querySelector('header').classList.remove('hidden');
  } else {
    document.getElementById('login-error').style.display = "block";
  }
});

// AGE-BASED QUESTIONS
const kidsQuestions = [
  { question: "What color is the sky?", correct_answer: "Blue", incorrect_answers: ["Green","Red","Yellow"] },
  { question: "How many legs does a cat have?", correct_answer: "4", incorrect_answers: ["2","3","5"] },
  { question: "Which animal says 'meow'?", correct_answer: "Cat", incorrect_answers: ["Dog","Cow","Sheep"] },
  { question: "What is 2 + 2?", correct_answer: "4", incorrect_answers: ["3","5","6"] },
  { question: "Which fruit is yellow and curved?", correct_answer: "Banana", incorrect_answers: ["Apple","Mango","Orange"] },
  { question: "How many days are there in a week?", correct_answer: "7", incorrect_answers: ["5","6","8"] },
  { question: "Which shape has 3 sides?", correct_answer: "Triangle", incorrect_answers: ["Square","Circle","Rectangle"] },
  { question: "Which is the fastest land animal?", correct_answer: "Cheetah", incorrect_answers: ["Lion","Horse","Elephant"] },
  { question: "Which planet do we live on?", correct_answer: "Earth", incorrect_answers: ["Mars","Venus","Jupiter"] },
  { question: "What do bees make?", correct_answer: "Honey", incorrect_answers: ["Milk","Sugar","Juice"] },
  { question: "How many months are in a year?", correct_answer: "12", incorrect_answers: ["10","11","13"] },
  { question: "Which animal is known as 'King of the Jungle'?", correct_answer: "Lion", incorrect_answers: ["Tiger","Elephant","Wolf"] },
  { question: "What do you call a baby dog?", correct_answer: "Puppy", incorrect_answers: ["Kitten","Calf","Cub"] },
  { question: "Which vegetable is orange and rabbits love it?", correct_answer: "Carrot", incorrect_answers: ["Potato","Onion","Tomato"] },
  { question: "Which gas do we need to breathe to live?", correct_answer: "Oxygen", incorrect_answers: ["Carbon Dioxide","Nitrogen","Helium"] }
];

const teenQuestions = [
  { question: "Who invented the light bulb?", correct_answer: "Thomas Edison", incorrect_answers: ["Newton","Einstein","Tesla"] },
  { question: "Which gas do humans breathe in?", correct_answer: "Oxygen", incorrect_answers: ["Carbon Dioxide","Nitrogen","Helium"] },
  { question: "Which is the largest planet in our solar system?", correct_answer: "Jupiter", incorrect_answers: ["Earth","Mars","Saturn"] },
  { question: "Who wrote 'Hamlet'?", correct_answer: "William Shakespeare", incorrect_answers: ["Charles Dickens","Mark Twain","Leo Tolstoy"] },
  { question: "What is the chemical symbol for water?", correct_answer: "H₂O", incorrect_answers: ["O₂","H₂","HO₂"] },
  { question: "What is the fastest land animal?", correct_answer: "Cheetah", incorrect_answers: ["Lion","Tiger","Leopard"] },
  { question: "Which continent is known as the 'Dark Continent'?", correct_answer: "Africa", incorrect_answers: ["Asia","South America","Australia"] },
  { question: "How many players are there in a football (soccer) team?", correct_answer: "11", incorrect_answers: ["10","9","12"] },
  { question: "What is the capital of Japan?", correct_answer: "Tokyo", incorrect_answers: ["Beijing","Seoul","Bangkok"] },
  { question: "Which ocean is the largest?", correct_answer: "Pacific Ocean", incorrect_answers: ["Atlantic Ocean","Indian Ocean","Arctic Ocean"] },
  { question: "What is the hardest natural substance?", correct_answer: "Diamond", incorrect_answers: ["Gold","Iron","Platinum"] },
  { question: "Which blood type is known as the universal donor?", correct_answer: "O negative", incorrect_answers: ["A positive","B negative","AB positive"] },
  { question: "Who was the first man to walk on the moon?", correct_answer: "Neil Armstrong", incorrect_answers: ["Buzz Aldrin","Yuri Gagarin","Michael Collins"] },
  { question: "Which instrument has black and white keys?", correct_answer: "Piano", incorrect_answers: ["Guitar","Violin","Flute"] },
  { question: "Which is the smallest prime number?", correct_answer: "2", incorrect_answers: ["1","3","5"] }
];


const adultQuestions = [
  { question: "What is the capital of France?", correct_answer: "Paris", incorrect_answers: ["Lyon","Marseille","Nice"] },
  { question: "Which language is used for styling web pages?", correct_answer: "CSS", incorrect_answers: ["HTML","Python","Java"] },
  { question: "Which of the following is a valid C variable name?", correct_answer: "_student_name", incorrect_answers: ["2nd_number","int","my-variable"] },
  { question: "What is the correct syntax for a switch statement?", correct_answer: "switch (expression) { case value1: ...; break; ... }", incorrect_answers: ["switch (expression) { case value1: ...; case value2: ...; }","switch (expression) { if value1: ...; break; ... }","switch { case expression: ...; break; ... }"] },
  { question: "In C, arrays are passed to functions by:", correct_answer: "Reference", incorrect_answers: ["Value","Copy","A new array is created"] },
  { question: "Which keyword is used to return a value from a function?", correct_answer: "return", incorrect_answers: ["exit","break","continue"] },
  { question: "What does the expression *ptr do, where ptr is a pointer?", correct_answer: "It gets the value stored at the memory address pointed to by ptr.", incorrect_answers: ["It gets the memory address of the variable.","It declares a new pointer.","It assigns a new address to the pointer."] },
  { question: "Which HTML tag is used for images?", correct_answer: "<img>", incorrect_answers: ["<image>","<src>","<picture>"] },
  { question: "Which planet is called the Red Planet?", correct_answer: "Mars", incorrect_answers: ["Venus","Jupiter","Saturn"] },
  { question: "What does API stand for?", correct_answer: "Application Programming Interface", incorrect_answers: ["Applied Programming Interface","Application Program Interaction","App Programming Interface"] },
  { question: "What is the correct way to declare a constant integer PI with a value of 3.14?", correct_answer: "const float PI = 3.14;", incorrect_answers: ["const int PI = 3.14;","#define PI 3.14;","float PI = 3.14;"] },
  { question: "Which standard library function is used to copy one string to another?", correct_answer: "strcpy()", incorrect_answers: ["memcpy()","strcat()","strncpy()"] },
  { question: "To access a member of a structure using a pointer, which operator is used?", correct_answer: "-> (arrow operator)", incorrect_answers: [". (dot operator)",":: (scope resolution operator)","* (dereference operator)"] },
  { question: " Which function is used for dynamic memory allocation in C?", correct_answer: "All of the above", incorrect_answers: ["malloc()","calloc()","realloc()"] },
  { question: "What is the purpose of the fclose() function?", correct_answer: "To close a file that was opened with fopen().", incorrect_answers: ["To delete a file from the disk.","To write content to a file.","To rename a file."] }
];

function getQuestionsByAge() {
  if (userAge < 13) return kidsQuestions;
  if (userAge < 18) return teenQuestions;
  return adultQuestions;
}

// QUIZ VARIABLES
let questions = [];
let current = 0;
let score = 0;
let timer = null;
let timeLeft = 0;
let userAnswers = [];

// Shuffle utility
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
      questions = getQuestionsByAge().slice(0, count);
    }
  } else {
    questions = [];
    while (questions.length < count) {
      questions = questions.concat(getQuestionsByAge().map(q => ({ ...q })));
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
