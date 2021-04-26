<template>
    <div>
        <div class="d-flex flex-wrap justify-content-between items-wrap">
			<b-col cols="4" v-for="item in items" :key="item.id">
				<div class="item mb-5 mr-4">
                    <b-col>
                        <catalog-item :item="item.product" :cartItem="toCartItem(item)"/>
                    </b-col>
                </div>
			</b-col>
		</div>
        <b-button variant="success" @click="placeOrder">Confirm Order</b-button>
    </div>
</template>

<script>
import CatalogItem from '../../components/catalog/CatalogItem'

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
        },
        toCartItem(item) {
            return {
                id: item.id,
                quantity: item.quantity
            }
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
.items-wrap {
	margin-top: 4em;
}
</style>