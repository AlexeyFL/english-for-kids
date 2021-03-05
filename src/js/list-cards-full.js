import ListCards from "./list-cards";

export default class ListCardsFull extends ListCards {
  constructor(data, card) {
    super();
    this.data = data;
    this.Card = card;
    this.list = [];
  }

  createList() {
    this.list = this.data.map((item) => {
      const card = new this.Card(item.word, item.image, item.translation);

      return card.getHtml();
    });

    return this.list;
  }
}
