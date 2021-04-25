<template>
    <div>
        <div class="d-flex flex-wrap justify-content-between items-wrap mt-5">
			<b-col cols="4" v-for="item in items" :key="item.id">
				<div class="item mb-5 mr-4">
                    <b-col>
                        <catalog-item :item="item.product" :preview="true"/>
                    </b-col>
                </div>
			</b-col>
		</div>
        <b-button variant="success" @click="placeOrder">Confirm Order</b-button>
    </div>
</template>

<script>
import CatalogItem from '../components/catalog/CatalogItem.vue'

export default {
    name: 'ShoppingCart',
    components: { CatalogItem },
    computed: {
        items: {
            get() {
                return this.$store.state.shoppingCart.items;
            }
        }
    },
    mounted() {
        this.$store.dispatch('fetchShoppingCart');
    },
    methods: {
        placeOrder() {
            this.$store.dispatch('placeOrder');
        }
    }
}
</script>

<style scoped>
.item {
    background-color: rgb(224, 220, 220);
    border-radius: 0.5em;
	margin-left: 2em;
    color: rgb(36, 35, 35);
}
</style>