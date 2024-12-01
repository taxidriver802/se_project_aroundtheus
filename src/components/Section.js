export default class Section {
  constructor({ items, renderer }, selector, domElements, generateCard) {
    this._items = items; // Array of data items
    this._renderer = renderer; // Function to render a single item
    this._container = document.querySelector(selector); // Container for cards
    this.domElements = domElements;
    this.generateCard = generateCard;
  }

  // Method to render all items on initial load
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Method to add a single item to the container
  addItem(element) {
    this._container.append(element);
  }
}
