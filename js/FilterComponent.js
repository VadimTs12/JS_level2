Vue.component('filtered', {
	template: `
	<div class="search__form">
                <form action="" class="search-form" id="#form" @submit.prevent="$root.filter">
                    
						  <input type="text" placeholder="Search..." class="search-field" v-model="$root.userSearch">
						  <button type="submit" class="btn-search"> <i class="fas fa-search"></i></button>
                    <div class="search"></div>
                    <div class="searchClose"></div>
                </form>
            </div>
	`
})