export default class StatisticItem {
  constructor(word, translation, category, playClick, trainClick) {
    this.word = word || null;
    this.translation = translation || null;
    this.category = category || null;
    this.trainClick = trainClick;
    this.playClick = playClick;
  }

  getHtml() {
    return `
      <div class="statistic__item">
        <div class="statistic__item_part">
        ${this.clickWord}
          <span class="statistic__item_heading">Word</span>: ${this.word}
        </div>
        <div class="statistic__item_part">
          <span class="statistic__item_heading">Translation</span>: ${this.translation}
        </div>
        <div class="statistic__item_part">
          <span class="statistic__item_heading">Category</span>: ${this.category}
        </div>
        <div class="statistic__item_part">
          <span class="statistic__item_heading">Click in play</span>: ${this.playClick}
        </div>
        <div class="statistic__item_part">
          <span class="statistic__item_heading">Click in train</span>: ${this.trainClick}
        </div>
      </div>
      <hr/>
    `;
  }
}
