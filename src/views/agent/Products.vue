<template>
    <b-container>
        <b-row cols="2" align-h="center">
            <div class="product-form">
                <b-row align-h="center">
                    <h1>Add product</h1>
                </b-row>
                <b-row align-h="center">
                    <product-form></product-form>
                </b-row>
            </div>
        </b-row>
        <div class="d-flex flex-wrap justify-content-between mt-3">
            <b-col cols="4" v-for="product in products" :key="product.id">
                <div v-if="product.id !== editId" class="product m-1 py-1">
                    <b-row align-h="center">
                        <img v-bind:src="product.imageUrl" class="product-image">
                    </b-row>
                    <b-row align-h="center">
                        {{product.name}}
                    </b-row>
                    <b-row align-h="center">
                        {{product.price}}
                    </b-row>
                    <b-row align-h="center">
                        {{product.quantity}}
                    </b-row>
                    <b-row align-h="end">
                        <b-button size="sm" variant="primary" class="mx-2" @click="editId = product.id">Edit</b-button>
                        <b-button size="sm" variant="danger" class="mr-4" @click="remove(product.id)">Delete</b-button>
                    </b-row>
                </div>
                <div v-else class="product m-1 p-1">
                    <product-form
                        :id="product.id"
                        :name="product.name"
                        :imageUrl="product.imageUrl"
                        :price="product.price"
                        :quantity="product.quantity"
                        @cancel="editId = 0"
                        @save="save"></product-form>
                </div>
            </b-col>
        </div>
    </b-container>
</template>

<script>
import ProductForm from '../../components/products/ProductForm';
import axios from 'axios';
import api from '../../api/index.js';

export default {
    components: { ProductForm },
    data() {
        return {
            products: [],
            editId: 0
        }
    },
    mounted() {
        axios.get(api.products.root)
        .then(response => this.products = response.data);
    },
    methods: {
        save(form) {
            const index = this.products.findIndex(p => p.id === form.id);
            this.products[index] = form;
            this.editId = 0;
        },
        remove(id) {
            axios.delete(api.products.root + id)
            .then(() => {
                const index = this.products.findIndex(p => p.id === id);
                this.products.splice(index, 1);
            })
        }
    }
}
</script>

<style scoped>
.product-form {
    margin-top: 5em;
    color: rgb(36, 35, 35);
    background-color: rgb(224, 220, 220);
    padding: 3em;
    border-radius: 6px;
    box-shadow: 5px 5px 10px #1d1d1d;
}

.product {
    background-color: rgb(224, 220, 220);
    border-radius: 6px;
    color: rgb(36, 35, 35);
}
.product-image {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 200px;
    height: 200px;
    border-radius: 90%;
    object-fit: cover; 
}

img {
    max-height: 25vh;
}
</style>