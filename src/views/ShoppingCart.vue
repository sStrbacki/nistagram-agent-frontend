<template>
    <div>
        <div v-for="item in items" :key="item.id">
            {{item}}
        </div>
        <b-button variant="success" @click="placeOrder">Confirm Order</b-button>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCart',
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