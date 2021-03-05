export default class ListCards {
  constructor(data, card) {
    this.data = data;
    this.Card = card;
    this.list = [];
  }

  createList() {
    this.list = this.data.map((item) => {
      const card = new this.Card(item.title, item.src);

      return card.getHtml();
    });

    return this.list;
  }
}
