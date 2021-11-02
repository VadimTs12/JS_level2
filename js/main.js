const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'img/notebook.png'},
    { id: 2, title: 'Mouse', price: 20, img: 'img/mouse.png'},
    { id: 3, title: 'Keyboard', price: 200, img: 'img/keyboard.png'},
    { id: 4, title: 'Gamepad', price: 50, img: 'img/gamepad.png'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (title, price, img) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <img src="${img}"
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    document.querySelector('.products').innerHTML  = list.map(item => renderProduct(item.title,item.price, item.img)).join('');    
};

renderPage(products);