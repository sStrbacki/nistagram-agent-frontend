<template>
    <div>
        <div class="d-flex flex-wrap justify-content-between items-wrap mt-5">
			<b-col cols="4" v-for="item in items" :key="item.id">
				<div class="item mb-5 mr-4">
                    <b-col>
                        <catalog-item :item="item.product" :cartItem="toCartItem(item)"/>
                    </b-col>
                </div>
			</b-col>
		</div>
        <b-button v-if="!showShipping" variant="success" @click="showShipping = true">Checkout</b-button>
        <div v-else>
            <b-row class="mb-3" cols="3" align-h="center">
                <b-col>
                    <b-form-input v-model="address" placeholder="Address"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mb-3" cols="3" align-h="center">
                <b-col>
                    <b-form-input v-model="city" placeholder="City"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mb-3" cols="6" align-h="center">
                <b-col>
                    <b-form-input v-model="state" placeholder="State"></b-form-input>
                </b-col>
                <b-col>
                    <b-form-input v-model="zipCode" placeholder="Zip Code"></b-form-input>
                </b-col>
            </b-row>
            <b-button variant="success" @click="placeOrder">Confirm Order</b-button>
        </div>
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
        },
        address: {
            get() {
                return this.$store.state.shoppingCart.shippingAddress.address;
            },
            set(value) {
                this.$store.commit('updateAddress', value);
            }
        },
        city: {
            get() {
                return this.$store.state.shoppingCart.shippingAddress.city;
            },
            set(value) {
                this.$store.commit('updateCity', value);
            }
        },
        state: {
            get() {
                return this.$store.state.shoppingCart.shippingAddress.state;
            },
            set(value) {
                this.$store.commit('updateState', value);
            }
        },
        zipCode: {
            get() {
                return this.$store.state.shoppingCart.shippingAddress.zipCode;
            },
            set(value) {
                this.$store.commit('updateZipCode', value);
            }
        }
    },
    data() {
        return {
            showShipping: false
        };
    },
    mounted() {
        this.$store.dispatch('fetchShoppingCart');
    },
    methods: {
        placeOrder() {
            this.$store.dispatch('placeOrder');
            this.showShipping = false;
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
</style>