import {getCartItems, removeFromCart} from "@/services/cartService";
import {errorMessage, successMessage} from "@/helpers/notfications";
import {deleteById} from "@/services/general";

export default {
    state: {
        cart: {
            items: [],
        },
    },
    getters: {
        cartItems(state) {
            return state.cart.items;
        },
    },
    mutations: {
        cartItems(state, value) {
            state.cart.items = value;
        },
        removeCartItemById(state, itemId) {
            deleteById(state.cart.items, itemId);
        },
    },
    actions: {
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
