Vue.component('cart', {
	props: ['cartItems', 'visibility'],
	template: `
		     <div class="cart-block" v-show="visibility">
                    <p v-if="!$root.cartItems.length">Корзина пуста</p>
                    <cart-item v-for="item of cartItems" :key="item.id" :cart-item="item"></cart-item>
                </div>
	`
});

Vue.component('cart-item', {
props: ['cartItem'],
template: `
<div class="cart-item" >
                        <div class="product-bio">
                            <img :src="cartItem.img" alt="Some img">
                            <div class="product-desc">
                                <div class="product-title">{{ cartItem.title }}</div>
                                <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                                <div class="product-single-price">$ {{ cartItem.price }} </div>
                            </div>
                        </div>
                        <div class="right-block">
                            <div class="product-price">{{ cartItem.quantity * cartItem.price }}</div>
                            <button class="add-btn" @click="$root.addProduct(cartItem)">+</button>
                            <button class="del-btn" @click="$root.removeProduct(cartItem)">-</button>
                        </div>
                    </div>
`
})