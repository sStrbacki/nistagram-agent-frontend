<template>
	<div>
		<router-link to="/shopping-cart">Shopping Cart</router-link>
		<div class="d-flex flex-wrap justify-content-between items-wrap">
			<b-col cols="4" v-for="product in products" :key="product.id">
				<catalog-item :item="product"/>
			</b-col>
		</div>
	</div>
</template>

<script>
import CatalogItem from '../components/catalog/CatalogItem'

export default {
    name: 'Catalog',
	computed: {
		products:{
			get() {
				return this.$store.state.catalog.catalog.products
			}
		}
	},
    mounted() {
		this.$store.dispatch('fetchAvailable')
    },
	components: { CatalogItem}
}
</script>

<style scoped>
.items-wrap {
	margin-top: 8em;
}

</style>