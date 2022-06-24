let container = document.querySelector(".container");

let field = document.createElement("div");
field.className = "field";

let title = document.createElement("h1");
title.className = "title";
title.innerHTML = "Rock, paper, scissors";

let game = document.createElement("div");
game.className = "game-field";

let resultText = document.createElement("h3");
resultText.className = "result-text";
resultText.innerHTML = "Go! Make a choice.";

let reset = document.createElement("button");
reset.className = "btn-reset";
reset.innerHTML = "Reset game";

let userField = document.createElement("div");
userField.className = "user-field";

let computerField = document.createElement("div");
computerField.className = "computer-field";

container.prepend(field);
field.prepend(title);
field.append(game);
field.append(resultText);
container.append(reset);
game.prepend(userField);
game.append(computerField);

store = {
  countElem: 3,
};

const createBtns = (field) => {
  for (let i = 0; i < store.countElem; i++) {
    let btnsElem = document.createElement("button");
    btnsElem.className = "btn-elem";
    field.prepend(btnsElem);
  }
};

const addClassesToBtn = (elem, index) => {
  let imgName;
  switch (index) {
    case 0:
      elem.classList.add("paper");
      imgName = "paper";
      break;
    case 1:
      elem.classList.add("rock");
      imgName = "rock";
      break;
    case 2:
      elem.classList.add("scissors");
      imgName = "scissors";
      break;
  }
  elem.style.cssText = `
    background: url("../img/${imgName}.png") center no-repeat;
  `;
};

// кнопки выбора для игрока
createBtns(userField);

let btnsElemUser = userField.querySelectorAll(".btn-elem");
btnsElemUser.forEach(addClassesToBtn);

// кнопки выбора для компьютера
createBtns(computerField);

let btnsElemComputer = computerField.querySelectorAll(".btn-elem");
btnsElemComputer.forEach(addClassesToBtn);
