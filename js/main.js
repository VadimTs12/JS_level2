
const API = 'https://raw.githubusercontent.com/VadimTs12/API-products/master/online-shop.json'

class List {
    constructor(url, container) {
        this.url = url;
        this.container = container;
        this.products = [];
        this.allProducts = [];
        this.getProd()
    }

    async getJson() {
        try {
            const result = await fetch(this.url);
            return await result.json();
        } catch (error) {
            console.log(error);
        }
    }

    getProd() {
        this.getJson()
            .then(data => {
                this.products = [...data];
                this.renderList()
            })
    }

    renderList() {
        this.products.forEach(product => {
            this.allProducts.push(new Item(product));
            document.querySelector(this.container).insertAdjacentHTML('beforeend', new Item(product).renderItem())
        })
    }
}

class Item {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;
        this.quantity = product.quantity
    }
    renderItem() {
        return `<div class="product-item">
                <h3>${this.title}</h3>
                <img src="${this.img}"
                <p>${this.price}</p>
                <button class="buy-btn" 
                data-id="${this.id}"
                    data-name="${this.title}"
                    data-price="${this.price}"
                    data-image="${this.img}"
                >Купить</button>
            </div>`
    }
}


class ProductsList extends List {
    constructor(cart, url = API, container = '.products') {
        super(url, container)
        this.cart = cart;
        this._init()
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addProduct(e.target);
            }
        });
    }

}

class CartList extends List {
    constructor(url = API, container = '.cart-block') {
        super(url, container);
        this._clickCart();
    }
    _clickCart() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
            if (e.target.classList.contains('add-btn')) {
                this.addProduct(e.target);
            }
        })

    }
    addProduct(element) {
        this.getJson()
            .then(data => {
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id === productId);
                if (find) {
                    find.quantity++;
                    this._updateCart(find);
                }
                else {
                    this.products = [{
                        id: +element.dataset['id'],
                        title: element.dataset['name'],
                        price: +element.dataset['price'],
                        img: element.dataset['image'],
                        quantity: 1
                    }];
                    this.renderList();
                }
            })
    }
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `$${product.quantity * product.price}`;
    }

    removeProduct(element) {
        this.getJson()
            .then(data => {
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id === productId);
                if (find.quantity > 1) {
                    find.quantity--;
                    this._updateCart(find);
                }
                else {
                    this.allProducts.splice(this.allProducts.indexOf(find), 1);
                    document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                }
            })
    }
    renderList() {
        this.products.map(product => {
            this.allProducts.push(new CartItem(product));
            document.querySelector(this.container).insertAdjacentHTML('beforeend', new CartItem(product).renderItem())
        })
    }

    getSum() {
        let res = this.products.reduce((s, item) => s + item.price, 0);
        document.querySelector(this.container).insertAdjacentHTML('beforeEnd', `
        <div class="summ"><b>Сумма всех товаров: ${res}</b></div>`
        );
    }

}


class CartItem extends Item {
    constructor(product) {
        super(product);
    }
    renderItem() {
        return `<div class="cart-item" data-id="${this.id}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image" data-img="${this.img}">
            <div class="product-desc">
            <p class="product-title">${this.title}</p>
           <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">$${this.price} </p>
        </div>
        </div>
        <div class="right-block">
             <p class="product-price">$${this.quantity * this.price}</p>
             <button class="add-btn" data-id="${this.id}">+</button>
            <button class="del-btn" data-id="${this.id}">-</button>
        </div>
        </div>`
    }
}
let cardList = new CartList()
let products = new ProductsList(cardList)


