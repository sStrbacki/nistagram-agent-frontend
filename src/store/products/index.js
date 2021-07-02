import {deleteProductById, getAllProducts} from "@/services/productService";
import {errorMessage, successMessage} from "@/helpers/notfications";

export default {
    state: {
        products: {
            products: []
        }
    },
    getters: {
        allProducts(state) {
            return state.products.products;
        }
    },
    actions: {
        async getAllProducts(context) {
            getAllProducts()
            .then(response => context.commit('setAllProducts', response.data))
            .catch(err => errorMessage(err.response.data));
        },
        async deleteProductById(context, id) {
            const products = context.getters.allProducts;
            const index = products.findIndex(product => product.id === id);
            if (index === -1)
                errorMessage('Product with id=${id} not found')
            else {
                deleteProductById(id)
                .then(() => {
                    products.splice(index, 1);
                    successMessage('Delete successful.');
                })
                .catch(err => errorMessage(err.response.data));
            }
        }
    },
    mutations: {
        setAllProducts(state, value) {
            state.products.products = value;
        }
    }
}
