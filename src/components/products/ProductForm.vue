<template>
<div>
    <b-row class="my-1">
        <b-col>
            <b-form-input v-model="form.name" placeholder="Product name"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="my-1">
        <b-col>
            Upload image:
        </b-col>
        <b-col>
            <b-form-input v-model="form.imageUrl" placeholder="Image URL"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="my-1">
        <b-col>
            <b-form-input v-model="form.price" placeholder="Price"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="my-1">
        <b-col>
            <b-form-input v-model="form.quantity" placeholder="Quantity"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="my-1">
        <b-col>
            <b-button variant="primary" class="mx-2" @click="save()">Save</b-button>
            <b-button class="mx-2" @click="cancel()">Cancel</b-button>
        </b-col>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductForm',
    props: {
        id: Number,
        name: String,
        imageUrl: String,
        price: Number,
        quantity: Number
    },
    data() {
        return {
            form: {
                id: this.id,
                name: this.name,
                imageUrl: this.imageUrl,
                price: this.price,
                quantity: this.quantity
            }
        }
    },
    methods: {
        save() {
            if (!this.form.id) this.create();
            else this.update();
        },
        create() {
            axios.post('http://localhost:8080/api/products', this.form);
        },
        update() {
            axios.put('http://localhost:8080/api/products/' + this.form.id, this.form);
        },
        cancel() {
            this.reset();
            this.$emit('cancel');
        },
        reset() {
            this.form = {
                id: this.id,
                name: this.name,
                imageUrl: this.imageUrl,
                price: this.price,
                quantity: this.quantity
            }
        }
    }
}
</script>