/* eslint-disable no-underscore-dangle */
export default class Page {
  constructor(imgSrc, text, failscore) {
    this._failscore = failscore;
    this.imgSrc = imgSrc;
    this.text = text;
  }

  get failscore() {
    return this._failscore;
  }

  set failscore(state) {
    this._failscore = state;
  }

  getHtml() {
    return `
    <div class="page">
      <div class="page__img">
        <img src="${this.imgSrc}" alt="${this.imgSrc}"/>
      </div>
      <div class="page__content">
        <div class="page__score">
          Your mistakes: ${this.failscore}
        </div>
        <div class="page__text">
          ${this.text}
        </div>
      </div>
    </div>`;
  }
}
