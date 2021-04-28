import api from '../../api/index';
import axios from 'axios';
import Vue from 'vue';

export default {
    state: {
        items: [],
        shippingAddress: {
            address: '',
            city: '',
            state: '',
            zipCode: ''
        }
    },
    mutations: {
        setItems(state, value) {
            state.items = value;
        },
        removeItem(state, itemId) {
            state.items = state.items.filter(item => item.id !== itemId);
        },
        updateAddress(state, value) {
            state.shippingAddress.address = value;
        },
        updateCity(state, value) {
            state.shippingAddress.city = value;
        },
        updateState(state, value) {
            state.shippingAddress.state = value;
        },
        updateZipCode(state, value) {
            state.shippingAddress.zipCode = value;
        },
        resetShippingAddress(state) {
            state.shippingAddress.address = '';
            state.shippingAddress.city = '';
            state.shippingAddress.state = '';
            state.shippingAddress.zipCode = '';
        },
        resetItems(state) {
            state.items = [];
        }
    },
    actions: {
        fetchShoppingCart(context) {
            axios.get(api.shoppingCart.root)
            .then((response) => {
                context.commit('setItems', response.data);
            })
        },
        placeOrder(context) {
            const invoiceRequest = {
                shippingAddress: context.state.shippingAddress
            }
            axios.post(api.invoices.root, invoiceRequest)
            .then(response => {
                Vue.notify({
                    group: 'notification',
                    text: response.data,
                    type: 'success'
                });
                context.commit('resetItems');
                context.commit('resetShippingAddress');
            })
            .catch(error => {
                console.log(error.response.data);
                Vue.notify({
                    group: 'notification',
                    text: error.response.data,
                    type: 'error'
                });
            });
        },
        removeFromShoppingCart(context, shoppingCartItemId) {
            axios.delete(api.shoppingCart.root + shoppingCartItemId)
            .then(() => {
                Vue.notify({
                    group: 'notification',
                    text: "Product successfully removed from your shopping cart!",
                    type: 'success'
                });
            });
        }
    }
}