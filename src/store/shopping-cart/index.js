import api from '../../api/index';
import axios from 'axios';
import {getCartItems, removeFromCart} from "@/services/cartService";
import {errorMessage, successMessage} from "@/helpers/notfications";
import {deleteById} from "@/services/general";

export default {
    state: {
        cart: {
            items: [],
        },
        shippingAddress: {
            address: null,
            city: null,
            state: null,
            zipCode: null
        }
    },
    getters: {
        shoppingCartItems(state) {
            return state.cart.items;
        },
        fullShippingAddress(state) {
            return state.cart.shippingAddress;
        }
    },
    mutations: {
        setCartItems(state, value) {
            state.cart.items = value;
        },
        removeCartItemById(state, itemId) {
            deleteById(state.cart.items, itemId);
        },
        resetItems(state) {
            state.cart.items = [];
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
            state.shippingAddress.address = null;
            state.shippingAddress.city = null;
            state.shippingAddress.state = null;
            state.shippingAddress.zipCode = null;
        },

    },
    actions: {
        fetchShoppingCart(context) {
            getCartItems()
            .then((response) => {
                context.commit('setCartItems', response.data);
            })
        },
        placeOrder(context) {
            axios.post(api.invoices.root, context.getters.fullShippingAddress)
            .then(() => {
                successMessage('Order placed')
                context.commit('resetItems');
                context.commit('resetShippingAddress');
            })
            .catch(error => errorMessage(error.response.data));
        },
        removeFromShoppingCart(context, shoppingCartItemId) {
            removeFromCart(shoppingCartItemId)
            .then(() => {
                context.commit('removeCartItemById', shoppingCartItemId);
                successMessage('Removed from cart.');
            })
            .catch(err => {
                console.log(err);
                errorMessage(err.response.data);
            });
        }
    }
}
