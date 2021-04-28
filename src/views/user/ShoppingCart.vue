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
        <b-button v-if="!showShipping" variant="success" @click="showShipping = true">Checkout</b-button>
        <div v-else>
            <b-row class="mb-3" cols="3" align-h="center">
                <b-col>
                    <b-form-input :state="addressValid" v-model="address" placeholder="Address"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mb-3" cols="3" align-h="center">
                <b-col>
                    <b-form-input :state="cityValid" v-model="city" placeholder="City"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mb-3" cols="6" align-h="center">
                <b-col>
                    <b-form-input :state="stateValid" v-model="state" placeholder="State"></b-form-input>
                </b-col>
                <b-col>
                    <b-form-input :state="zipCodeValid" v-model="zipCode" placeholder="Zip Code"></b-form-input>
                </b-col>
            </b-row>
            <b-button :disabled="!formValid" variant="success" @click="placeOrder">Confirm Order</b-button>
        </div>
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
        },
        addressValid() {
            return this.notEmpty(this.address);
        },
        cityValid() {
            return this.notEmpty(this.city);
        },
        stateValid() {
            return this.notEmpty(this.state);
        },
        zipCodeValid() {
            return this.notEmpty(this.zipCode) && /^\d+$/.test(this.zipCode);
        },
        formValid() {
            return this.zipCodeValid && this.stateValid && this.stateValid && this.cityValid && this.addressValid;
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
        },
        notEmpty(field) {
            if (field === '') return false;
            if (!field) return null;
            return true;
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