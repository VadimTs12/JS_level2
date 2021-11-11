

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.products = [];
        this.allProducts = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.products = [
            { id: 1, title: 'Notebook', price: 2000, img: 'img/notebook.png' },
            { id: 2, title: 'Mouse', price: 20, img: 'img/mouse.png' },
            { id: 3, title: 'Keyboard', price: 200, img: 'img/keyboard.png' },
            { id: 4, title: 'Gamepad', price: 50, img: 'img/gamepad.png' },
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }
    getSum() {
        let res = this.allProducts.reduce((s, item) => s + item.price, 0);
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML('afterend', `<div class="summ"><b>Сумма всех товаров: ${res}</b></div>`);
    }
}


class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;

    }

    render() {
        return `<div class="product-item">
                <h3>${this.title}</h3>
                <img src="${this.img}"
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list.render();
list.getSum();

class Card {
    add() {}
    remove() {}
    change() {}
    render() {}
}

class ElemCard {
    render() {}
}