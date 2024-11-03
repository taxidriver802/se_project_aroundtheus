export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items; // Array of data items
    this._renderer = renderer; // Function to render a single item
    this._container = document.querySelector(selector); // Container for cards
  }

  // Method to render all items on initial load
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Method to add a single item to the container
  addItem(element) {
    this._container.prepend(element);
  }
}
