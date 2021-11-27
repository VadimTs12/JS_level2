const API = 'https://raw.githubusercontent.com/VadimTs12/API-products/master/online-shop.json' 	

const app = new Vue({
	el: '#app',
	data: {
		url: API,		
		products: [],
		cartItems: [],
		filtered: [],
		userSearch: '',
		showCart: false,
	},

	methods: {
		async getJson(url) {
			try {
				const result = await fetch(url);
				return await result.json();
			} catch (error) {
				return console.log(error);
			}
		},

		filter() {
			let regexp = new RegExp(this.userSearch, 'i');
			this.filtered = this.products.filter(el => regexp.test(el.title));
		},

		addProduct(item) {
			this.getJson(API)
				.then(data => {					
						let find = this.cartItems.find(el => el.id === item.id);
						if (find) {
							find.quantity++;
						} else {
							const prod = Object.assign({ quantity: 1 }, item);//создание нового объекта на основе двух, указанных в параметрах
							this.cartItems.push(prod)
						}
					
				})
		},

		removeProduct(item) {
			this.getJson(API)
				.then(data => {				
						if (item.quantity > 1) {
							item.quantity--;
						} else {
							this.cartItems.splice(this.cartItems.indexOf(item), 1);
						}				
				})
		},

		clearInput() {

		}

	},
	mounted() {
		//Парсим обьект json  в cartItem
		// this.getJson(API)
		// 	.then(data => {
		// 		for (let item of data) {
		// 			this.cartItems.push(item);

		// 		}
		// 	});
		//Парсим обьект json  в product
		this.getJson(API)
			.then(data => {
				for (let item of data) {
					this.products.push(item);
					this.filtered.push(item);
				}
			});
	}
})


