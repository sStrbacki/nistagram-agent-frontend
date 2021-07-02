import {errorMessage, successMessage} from "@/helpers/notfications";
import {getAvailableProducts} from "@/services/productService";
import {findById} from "@/services/general";
import {addToCart} from "@/services/cartService";

export default {
    state: {
        catalog: {
            products: []
        }
    },
    mutations: {
        catalogProducts(state, value) {
            state.catalog.products = value
        },
        reduceQuantityOfCatalogProductById(state, payload) {
            findById(state.catalog.products, payload.productId).quantity -= payload.quantity;
        }
    },
    actions: {
        fetchAvailable(context) {
            getAvailableProducts()
            .then(response => {
                context.commit('catalogProducts', response.data)
            })
            .catch(err => errorMessage(err.response.data));
        },
        addToShoppingCart(context, payload) {
            const productId = payload.productId;
            const quantity = payload.quantity;
            addToCart(productId, quantity)
            .then(() => {
                context.commit('reduceQuantityOfCatalogProductById', {productId, quantity})
                successMessage('Added to cart.');
            });
        },
    },
    getters: {
        catalogProducts(state) {
            return state.catalog.products;
        }
    }
}
