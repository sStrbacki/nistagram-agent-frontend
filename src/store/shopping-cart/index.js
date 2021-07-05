import {checkout, getCartItems, removeFromCart} from "@/services/cartService";
import {errorMessage, successMessage} from "@/helpers/notfications";
import {deleteById} from "@/services/general";
import router from "@/router";

export default {
    state: {
        cart: {
            items: [],
        },
        checkout: {
            delivery: {
                addressLine: '',
                city: '',
                postalCode: undefined,
                country: ''
            }
        }
    },
    getters: {
        cartItems(state) {
            return state.cart.items;
        },
        deliveryAddress: state => state.checkout.delivery,
        addressLine: state => state.checkout.delivery.addressLine,
        city: state => state.checkout.delivery.city,
        postalCode: state => state.checkout.delivery.postalCode,
        country: state => state.checkout.delivery.country,
    },
    mutations: {
        cartItems(state, value) {
            state.cart.items = value;
        },
        removeCartItemById(state, itemId) {
            deleteById(state.cart.items, itemId);
        },
        addressLine: (state, value) => state.checkout.delivery.addressLine = value,
        city: (state, value) => state.checkout.delivery.city = value,
        postalCode: (state, value) => state.checkout.delivery.postalCode = value,
        country: (state, value) => state.checkout.delivery.country = value,
    },
    actions: {
        finishCheckout(context) {
            if (context.getters.cartItems.length === 0) {
                errorMessage('Your cart is empty.');
                return;
            }
            checkout(context.getters.deliveryAddress)
            .then(() => {
                successMessage('Checkout successful.');
                router.push({name: 'Catalog'});
            })
            .catch(err => errorMessage(err.response.data));
        },
        fetchShoppingCart(context) {
            getCartItems()
            .then((response) => {
                context.commit('cartItems', response.data);
            })
        },
        removeFromShoppingCart(context, shoppingCartItemId) {
            removeFromCart(shoppingCartItemId)
            .then(() => {
                context.commit('removeCartItemById', shoppingCartItemId);
                successMessage('Removed from cart.');
            })
            .catch(err => {
                errorMessage(err.response.data);
            });
        }
    }
}
