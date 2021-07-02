import {createNewProduct, deleteProductById, getAllProducts, updateProduct} from "@/services/productService";
import {errorMessage, successMessage} from "@/helpers/notfications";
import {deepCopy} from "@/services/general";

export default {
    state: {
        products: {
            products: [],
            editOpened: false,
            editedProduct: undefined,
            newProduct: {
                name: undefined,
                price: undefined,
                quantity: undefined,
                imageUrl: undefined
            }
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
        },
        newProduct(state) {
            return state.products.newProduct;
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
        },
        async createNewProduct(context) {
            console.log('Sending new product:', context.getters.newProduct);
            createNewProduct(context.getters.newProduct)
            .then(response => {
                context.commit('addNewProduct', response.data);
                successMessage('Product added successfully.');
                context.dispatch('resetNewProduct');
            })
            .catch(err => errorMessage(err.response.data));
        },
        resetNewProduct(context) {
            context.commit('updateNewProductField', {field:'name', value: undefined});
            context.commit('updateNewProductField', {field:'price', value: undefined});
            context.commit('updateNewProductField', {field:'quantity', value: undefined});
            context.commit('updateNewProductField', {field:'imageUrl', value: ''});
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
        addNewProduct(state, value) {
            state.products.products.push(value);
        },
        updateNewProductField(state, payload) {
            const field = payload.field;
            state.products.newProduct[field] = payload.value;
        },
    }
}
