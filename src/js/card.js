export default class Card {
  constructor(text, imgSrc) {
    this.text = text;
    this.imgSrc = imgSrc;
  }

  getHtml() {
    return `
    <a href="#" class="card card__category card_main" data-title="${this.text}">
      <div class="card__image">
        <img src="${this.imgSrc}" alt="${this.text}">
      </div>
      <div class="card__text">
        <div class="card__title">
          ${this.text}
        </div>
      </div>
    </a>
    `;
  }
}
