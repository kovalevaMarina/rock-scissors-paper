let container = document.querySelector(".container");

const createElement = (tag, nameClass, text = undefined) => {
  let elem = document.createElement(tag);
  elem.className = nameClass;
  if (text) elem.innerHTML = text;
  return elem;
};

let field = createElement("div", "field");
let title = createElement("h1", "title", "Rock, paper, scissors");
let game = createElement("div", "game-field");
let resultText = createElement("h3", "result-text", "Game go! Make a choice.");
let reset = createElement("button", "btn-reset", "Reset Game");
let userField = createElement("div", "user-field");
let computerField = createElement("div", "computer-field");
let vsText = createElement("p", "vs-text", "VS");
let userTitle = createElement("h2", "title-h2", "You");
let computerTitle = createElement("h2", "title-h2", "Computer");

container.prepend(field);
field.prepend(title);
field.append(game);
field.append(resultText);
container.append(reset);
game.prepend(userField);
game.append(computerField);
userField.after(vsText);
userField.prepend(userTitle);
computerField.prepend(computerTitle);

store = {
  countElem: 3,
  userResultChoice: "",
  computerResultChoice: "",
  scoreCountUser: 0,
  scoreCountComputer: 0,
  disabled: false,
};

const createBtns = (field) => {
  for (let i = 0; i < store.countElem; i++) {
    let btnsElem = createElement("button", "btn-elem");
    field.append(btnsElem);
  }
};

const addClassesToBtn = (elem, index) => {
  let imgName;
  switch (index) {
    case 0:
      elem.classList.add("paper");
      elem.setAttribute("data-id", "paper");
      imgName = "paper";
      break;
    case 1:
      elem.classList.add("rock");
      elem.setAttribute("data-id", "rock");
      imgName = "rock";
      break;
    case 2:
      elem.classList.add("scissors");
      elem.setAttribute("data-id", "scissors");
      imgName = "scissors";
      break;
  }
  elem.style.cssText = `
    background-image: url("./img/${imgName}.png");
  `;
};

// генерация кнопок выбора для игрока
createBtns(userField);

let btnsElemUser = userField.querySelectorAll(".btn-elem");
btnsElemUser.forEach(addClassesToBtn);

// генерация кнопок выбора для компьютера
createBtns(computerField);

let btnsElemComputer = computerField.querySelectorAll(".btn-elem");
btnsElemComputer.forEach(addClassesToBtn);

// генерация поля набраных очков
let scoreUser = createElement(
  "div",
  "score-field",
  `Score: ${store.scoreCountUser}`
);
userField.append(scoreUser);

let scoreComputer = createElement(
  "div",
  "score-field",
  `Score: ${store.scoreCountComputer}`
);
computerField.append(scoreComputer);

let allButtons = document.querySelectorAll(".btn-elem");

// выбор игрока
const choiceUser = (e) => {
  if (store.disabled) return;
  let targetUser = e.target;
  store.userResultChoice = targetUser.dataset.id;
  allButtons.forEach((element) => {
    element.classList.remove("green", "red");
  });
  targetUser.classList.add("green");
  choiceComputer();
};

let getUserBtn = () => {
  return userField.querySelector(`[data-id=${store.userResultChoice}]`);
};

// выбор компьютера
let choiceComputer = () => {
  store.disabled = true;
  let randomIndex = Math.floor(Math.random() * 3);
  let randomId = ["paper", "rock", "scissors"][randomIndex];
  computerField.classList.add("anim");
  setTimeout(() => {
    computerField.classList.remove("anim");
    store.computerResultChoice = randomId;
    gameOver();
  }, 3000);
};

let getComputerBtn = () => {
  return computerField.querySelector(`[data-id=${store.computerResultChoice}]`);
};

// сравнение результатов
let gameOver = () => {
  store.disabled = false;
  let result = store.userResultChoice + store.computerResultChoice;
  switch (result) {
    case "paperpaper":
    case "rockrock":
    case "scissorsscissors":
      getComputerBtn().classList.add("green");
      resultText.innerHTML = "Tie! Try again.";
      break;
    case "paperrock":
    case "rockscissors":
    case "scissorspaper":
      resultText.innerHTML = "Congratulations! You are a Winner!";
      getComputerBtn().classList.add("red");
      store.scoreCountUser++;
      scoreUser.innerHTML = `Score: ${store.scoreCountUser}`;
      break;
    case "rockpaper":
    case "scissorsrock":
    case "paperscissors":
      resultText.innerHTML = "Sorry... You lost!";
      getUserBtn().classList.add("red");
      getUserBtn().classList.remove("green");
      getComputerBtn().classList.add("green");
      store.scoreCountComputer++;
      scoreComputer.innerHTML = `Score: ${store.scoreCountComputer}`;
      break;
  }
};

// сброс игры
let resetGame = () => {
  store.disabled = false;
  (store.scoreCountUser = 0),
    (store.scoreCountComputer = 0),
    (scoreUser.innerHTML = `Score: ${store.scoreCountUser}`);
  scoreComputer.innerHTML = `Score: ${store.scoreCountComputer}`;
  resultText.innerHTML = "Game go! Make a choice.";
  allButtons.forEach((element) => {
    element.classList.remove("green", "red");
  });
};

// события
btnsElemUser.forEach((btn) => {
  btn.addEventListener("click", choiceUser);
});

let resetBtn = document.querySelector(".btn-reset");
resetBtn.addEventListener("click", resetGame);
