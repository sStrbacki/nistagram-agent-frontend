import {deleteProductById, getAllProducts, updateProduct} from "@/services/productService";
import {errorMessage, successMessage} from "@/helpers/notfications";
import {deepCopy} from "@/services/general";

export default {
    state: {
        products: {
            products: [],
            editOpened: false,
            editedProduct: undefined
        }
    },
    getters: {
        allProducts(state) {
            return state.products.products;
        },
        editOpened(state) {
            return state.products.editOpened;
        },
        editedProduct(state) {
            return state.products.editedProduct;
        }
    },
    actions: {
        async getAllProducts(context) {
            getAllProducts()
            .then(response => context.commit('allProducts', response.data))
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
        },
        async openEditDialog(context, id) {
            const product = context.getters.allProducts.find(product => product.id === id);
            if (!product)
                errorMessage('Edit failed. No product found with id=' + id);
            else {
                context.commit('editOpened', true);
                context.commit('editedProject', deepCopy(product));
            }
        },
        async closeEditDialog(context) {
            context.commit('editOpened', false);
        },
        async saveEdit(context) {
            const updatedProduct = context.getters.editedProduct;
            updateProduct(updatedProduct.id, updatedProduct)
            .then(() => {
                const allProducts = context.getters.allProducts;
                const index = allProducts.findIndex(product => product.id === updatedProduct.id);
                allProducts.splice(index, 1, updatedProduct);

                successMessage('Update successful.');
            })
            .catch(err => errorMessage(err.response.data));
        }
    },
    mutations: {
        allProducts(state, value) {
            state.products.products = value;
        },
        editOpened(state, bool) {
            state.products.editOpened = bool;
        },
        editedProject(state, value) {
            state.products.editedProduct = value;
        },
        customAccessProduct(state, payload) {
            state.products[payload.obj][payload.field] = payload.value;
        }
    }
}
