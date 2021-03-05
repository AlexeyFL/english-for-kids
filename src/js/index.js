import "../css/style.css";
import "../css/style.scss";

import ListCards from "./list-cards";
import ListCardsFull from "./list-cards-full";
import CardFull from "./card-full";
import StatisticPage from "./statistic-page";
import Card from "./card";
import data from "./data";
import Page from "./page";

class App {
  location = "";
  stars = [];
  mainContainer = document.createElement("div");
  audioArr = [];
  _play = false;
  _repeatAudio = "";
  _fail = 0;
  _clickPlay = 0;
  _clickTrain = 0;
  clickWord = "";
  constructor(app) {
    this.app = app;
  }

  get clickPlay() {
    return this._clickPlay;
  }

  set clickPlay(state) {
    this._clickPlay = state;
  }

  get clickTrain() {
    return this._clickTrain;
  }

  set clickTrain(state) {
    this._clickTrain = state;
  }

  set play(state) {
    this._play = state;
  }

  get play() {
    return this._play;
  }

  get repeatAudio() {
    return this._repeatAudio;
  }

  set repeatAudio(state) {
    this._repeatAudio = state;
  }

  get fail() {
    return this._fail;
  }

  set fail(state) {
    this._fail = state;
  }

  init() {
    this.createCardsPage(mainPage.createList().join(""));
    // append main page
    this.app.append(this.mainContainer);
    this.mainContainer.className = "main-container main-page";
    this.location = window.location.href;
  }

  createCardsPage(cards) {
    this.mainContainer.innerHTML = cards;
  }
}
const app = new App(document.getElementById("app"));
const mainPage = new ListCards(data[0], Card);
const actionA = new ListCardsFull(data[1], CardFull);
const actionB = new ListCardsFull(data[2], CardFull);
const actionC = new ListCardsFull(data[3], CardFull);
const actionD = new ListCardsFull(data[4], CardFull);
const animalA = new ListCardsFull(data[5], CardFull);
const animalB = new ListCardsFull(data[6], CardFull);
const emotions = new ListCardsFull(data[7], CardFull);
const clothes = new ListCardsFull(data[8], CardFull);
const statistic = new StatisticPage(data, app.clickPlay, app.clickTrain);
const heading = document.querySelector(".heading");

app.init();

// create start button
function createStartButton() {
  const main = document.getElementById("app");
  const startBtn = document.createElement("button");
  startBtn.textContent = "Start game";
  startBtn.className = "start";

  const repeatBtn = document.createElement("button");
  repeatBtn.innerHTML = "&orarr;";
  repeatBtn.className = "start repeat";

  main.appendChild(startBtn);
  main.appendChild(repeatBtn);
}
createStartButton();

// create stars
function createStars(result) {
  const success = `<span class="stars__star stars__star_success" style="color:#ffba00;font-size: 50px">&#9733;</span>`;
  const fail = `<span class="stars__star stars__star_fail" style="color:#ffba00;font-size: 50px">&#9734;</span>`;
  if (result) {
    app.stars.push(success);
  } else {
    app.stars.push(fail);
  }
  if (app.stars.length > 20) {
    app.stars.shift();
  }
}

// add star
function addStar() {
  const starsContainer = document.querySelector(".stars");
  starsContainer.innerHTML = app.stars.join("");
}

// add remove main page class
function removeContainerClass() {
  const mainContainer = document.querySelector(".main-container");
  document.addEventListener("click", () => {
    const cardFull = document.querySelector(".card");
    const statistic = document.querySelector(".statistic");
    const body = document.querySelector("body");

    // remove main page class if category page
    if (cardFull) {
      if (cardFull.classList.contains("card__full")) {
        mainContainer.classList.remove("main-page");
      } else {
        mainContainer.classList.add("main-page");
      }
    }

    // remove main page class if statistic page
    if (statistic) {
      mainContainer.classList.remove("main-page");
      body.classList.add("statistic-body");
    } else {
      body.classList.remove("statistic-body");
    }
  });
}
removeContainerClass();

// switcher playmode && activate start btn
function playMode() {
  const switcher = document.getElementById("switcher-check");
  const startBtn = document.querySelector(".start");
  const repeatBtn = document.querySelector(".repeat");

  switcher.addEventListener("click", () => {
    if (switcher.checked) {
      app.play = true;
      // add active in start && repeat btn
      startBtn.classList.add("active");
      repeatBtn.classList.remove("active");
    } else {
      app.play = false;
      // remove active in start && repeat btn
      startBtn.classList.remove("active");
      repeatBtn.classList.remove("active");

      // clear audio arr
      app.audioArr = [];
      // clear repeat audio
      app.repeatAudio = "";
    }
    toggleCardActive();
  });

  // check if play mode add or remove play class
  document.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");

    if (app.play) {
      cards.forEach((item) => {
        item.classList.add("play");
      });
    } else {
      cards.forEach((item) => {
        item.classList.remove("play");
      });
    }
  });
}
playMode();

// count click
function countOfClick() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card__full");
    if (card && app.play) {
      const cardWord = card.dataset.title;
      app.clickWord = cardWord;
      app.clickTrain += 1;
    }
    if (card && !app.play) {
      const cardWord = card.dataset.title;
      app.clickWord = cardWord;
      app.clickPlay += 1;
    }
  });
}
countOfClick();

function addCategoryTitle(title) {
  heading.textContent = title;
}

// switch category
function switchCaregory() {
  const categories = document.querySelectorAll(".card_main");
  const container = document.querySelector(".main-container");

  categories.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      switch (item.dataset.title) {
        case "Action (set A)":
          addCategoryTitle("Action (set A)");
          container.innerHTML = actionA.createList().join("");
          window.location.hash = "action-a";
          break;
        case "Action (set B)":
          addCategoryTitle("Action (set B)");
          container.innerHTML = actionB.createList().join("");
          window.location.hash = "action-b";
          break;
        case "Action (set C)":
          addCategoryTitle("Action (set C)");
          container.innerHTML = actionC.createList().join("");
          window.location.hash = "action-c";
          break;
        case "Action (set D)":
          addCategoryTitle("Action (set D)");
          container.innerHTML = actionD.createList().join("");
          window.location.hash = "action-d";
          break;
        case "Animal (set A)":
          addCategoryTitle("Animal (set A)");
          container.innerHTML = animalA.createList().join("");
          window.location.hash = "animal-a";
          break;
        case "Animal (set B)":
          addCategoryTitle("Animal (set B)");
          container.innerHTML = animalB.createList().join("");
          window.location.hash = "animal-b";
          break;
        case "Emotions":
          addCategoryTitle("Emotions");
          container.innerHTML = emotions.createList().join("");
          window.location.hash = "emotions";
          break;
        case "Clothes":
          addCategoryTitle("Clothes");
          container.innerHTML = clothes.createList().join("");
          window.location.hash = "clothes";
          break;
        default:
          addCategoryTitle("English for kids");
          container.innerHTML = mainPage.createList().join("");
      }
    });
  });
}
switchCaregory();

// toggle card to play mode
function toggleCardActive() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    if (app.play) {
      card.classList.add("play");
    } else {
      card.classList.remove("play");
    }
  });
}
toggleCardActive();

// switch menu
function switchMenu() {
  const menuLink = document.querySelectorAll(".menu__link");
  const container = document.querySelector(".main-container");

  menuLink.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      switch (link.dataset.title) {
        case "main":
          addCategoryTitle("English for kids");
          container.innerHTML = mainPage.createList().join("");
          setTimeout(switchCaregory, 100);
          toggleCardActive();
          window.location.hash = "main";
          break;
        case "actionA":
          addCategoryTitle("Action (set A)");
          container.innerHTML = actionA.createList().join("");
          window.location.hash = "action-a";
          break;
        case "actionB":
          addCategoryTitle("Action (set B)");
          container.innerHTML = actionB.createList().join("");
          window.location.hash = "action-b";
          break;
        case "actionC":
          addCategoryTitle("Action (set C)");
          container.innerHTML = actionC.createList().join("");
          window.location.hash = "action-c";
          break;
        case "actionD":
          addCategoryTitle("Action (set D)");
          container.innerHTML = actionD.createList().join("");
          window.location.hash = "action-d";
          break;
        case "animalA":
          addCategoryTitle("Animal (set A)");
          container.innerHTML = animalA.createList().join("");
          window.location.hash = "animal-a";
          break;
        case "animalB":
          addCategoryTitle("Animal (set B)");
          container.innerHTML = animalB.createList().join("");
          window.location.hash = "animal-b";
          break;
        case "emotions":
          addCategoryTitle("Emotions");
          container.innerHTML = emotions.createList().join("");
          window.location.hash = "emotions";
          break;
        case "clothes":
          addCategoryTitle("Clothes");
          container.innerHTML = clothes.createList().join("");
          window.location.hash = "clothes";
          break;
        case "statistic":
          addCategoryTitle("Statistic");
          container.innerHTML = statistic.getHtml();
          window.location.hash = "statistic";
          break;
        default:
          container.innerHTML = mainPage.createList().join("");
      }
    });
  });
}
switchMenu();

function removeReverseCard() {
  this.classList.remove("flip");
  this.removeEventListener("mouseleave", removeReverseCard);
}

// flip card func
function flipCard() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".card__btn")) {
      const card = e.target.closest(".card");
      card.classList.add("flip");
      card.addEventListener("mouseleave", removeReverseCard);
    }
  });
}
flipCard();

// play audio func
function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
  audio.playbackRate = 1.6;
}

// play word by click
function playWord() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".card__full") && !e.target.classList.contains("card__btn")) {
      const cardData = e.target.closest(".card__full").dataset.title;
      if (!app.play) {
        playAudio(`assets/audio/${cardData}.mp3`);
      }
    }
  });
}
playWord();

// shuffle array https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array) {
  const arrayLength = array.length;
  const newArr = array;
  for (let i = arrayLength - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
}

// get page audio
function getCurrentPageAudio() {
  const startBtn = document.querySelector(".start");
  const repeatBtn = document.querySelector(".repeat");

  startBtn.addEventListener("click", function () {
    const cards = document.querySelectorAll(".card");

    // get all page audio word
    cards.forEach((card) => {
      app.audioArr.push(card.dataset.title);
    });

    // shuffle audio array
    shuffle(app.audioArr);

    // set repeat audio
    const [repeatWord] = app.audioArr;
    app.repeatAudio = repeatWord;
    // play first word when start
    playAudio(`assets/audio/${app.repeatAudio}.mp3`);

    this.classList.remove("active");
    repeatBtn.classList.add("active");

    // play card success
    playCard();
  });

  // play repeat word
  repeatBtn.addEventListener("click", () => {
    playAudio(`assets/audio/${app.repeatAudio}.mp3`);
  });
}
getCurrentPageAudio();

// play card
function playCard() {
  const container = document.querySelector(".main-container");
  const repeatBtn = document.querySelector(".repeat");
  const starsContainer = document.querySelector(".stars");

  function reloadPage() {
    window.history.pushState(null, null, app.location);
    window.location.href = app.location;
    window.location.reload();
  }

  function hideElems() {
    repeatBtn.classList.remove("active");
    starsContainer.style.display = "none";
  }

  document.addEventListener("click", (e) => {
    const cardFull = e.target.closest(".card__full");

    // add disable class if success
    if (cardFull && app.play && cardFull.dataset.title === app.repeatAudio) {
      playAudio(`assets/audio/success.mp3`);
      cardFull.classList.add("disable");
      // add success star
      createStars(true);
      addStar();
      app.audioArr = app.audioArr.filter((item) => {
        return item !== cardFull.dataset.title;
      });

      // win page open
      if (!app.audioArr.length) {
        if (app.fail) {
          app.repeatAudio = "";
          setTimeout(() => {
            const containerContext = new Page("assets/images/fail.svg", "You losed the game!", app.fail).getHtml();
            container.innerHTML = containerContext;
          }, 900);
          playAudio(`assets/audio/losepage.mp3`);
          hideElems();
          setTimeout(() => {
            reloadPage();
          }, 3000);
        } else {
          app.repeatAudio = "";
          setTimeout(() => {
            container.innerHTML = new Page("assets/images/win.svg", "You win!", app.fail).getHtml();
          }, 900);
          playAudio(`assets/audio/winpage.mp3`);
          hideElems();
          setTimeout(() => {
            reloadPage();
          }, 3000);
        }
      }
      const [repeatWord] = app.audioArr;
      app.repeatAudio = repeatWord;
      setTimeout(() => playAudio(`assets/audio/${app.repeatAudio}.mp3`), 2000);
    } else if (cardFull && app.play && cardFull.dataset.title !== app.repeatAudio) {
      playAudio(`assets/audio/wrong.mp3`);
      app.fail += 1;
      // add fail star
      createStars(false);
      addStar();
    }
  });
}

// open close menu
function openCloseMenu() {
  const burger = document.querySelector(".burger");
  const close = document.querySelector(".close");
  const nav = document.querySelector(".nav");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  close.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
  });

  document.addEventListener("click", (e) => {
    if (nav.classList.contains("active") && !e.target.classList.contains("burger")) {
      nav.classList.remove("active");
    }
  });
}
openCloseMenu();

export default App;
