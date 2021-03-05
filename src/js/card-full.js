import Card from "./card";

export default class CardFull extends Card {
  click = 0;
  constructor(word, image, translation, app) {
    super();
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.app = app;
  }

  getHtml() {
    return `
    <div class="card card__full" data-title="${this.word}">
      <div class="card__wrapper">
        <div class="card__item card__item_front">
          <div class="card__image">
            <img src="${this.image}" alt="${this.word}">
          </div>
          <button class="card__btn">&#187;</button>
          <div class="card__text">
            <div class="card__title">
              ${this.word}
            </div>
          </div>
        </div>
        <div class="card__item card__item_back">
          <div class="card__image">
            <img src="${this.image}" alt="${this.word}">
          </div>
          <div class="card__text">
            <div class="card__title">
              ${this.translation}
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
