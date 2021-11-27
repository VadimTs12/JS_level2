Vue.component('products', {
	props: ['products'],
	template: `<div class="products">
						<product v-for="product of products" :product="product" :key="product.id">	
						</product>              
            	</div>
	
	`
});
Vue.component('product', {
	props: ['product'],
	template: `
	  <div class="product-item" >
                     <h3><a href="#">{{product.title}}</a></h3>
                    <a href="#"><img :src="product.img" alt="Some img"></a>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" 
						  @click="$parent.$emit('add-product', product)"                
						  >Купить</button>
      </div>
	`
})

