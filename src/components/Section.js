export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)
    }

    renderItems() {
        this._items.forEach(item => {
            const card = this._renderer(item);
            this.addItem(card);
        });
    }

    addItem(element){
        this._container.prepend(element);
    }
}