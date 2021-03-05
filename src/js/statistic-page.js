import StatisticItem from "./statistic-item";

class StatisticPage {
  categories = [];
  constructor(dataList, clickPlay, clickTrain) {
    this.dataList = dataList;
    this.clickTrain = clickTrain;
    this.clickPlay = clickPlay;
  }

  createCategory() {
    this.categories = this.dataList.slice(1).map((category) => {
      return category.map((item) => {
        return new StatisticItem(item.word, item.translation, item.category, this.clickPlay, this.clickTrain).getHtml();
      });
    });
  }

  getHtml() {
    this.createCategory();
    return `
    <div class="statistic">
      <h3 clss="statistic__heading">Statistics</h3>
      <div class="statistic__content">
        ${this.categories.join("")}
      </div>
    </div>`;
  }
}

export default StatisticPage;
