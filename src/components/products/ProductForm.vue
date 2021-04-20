<template>
<div>
    <b-row class="my-1">
        <b-col>
            <b-form-input :state="nameValid" v-model="form.name" placeholder="Product name"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="my-1">
        <b-col cols="4">
            Upload image:
        </b-col>
        <b-col cols="8">
            <b-form-input v-model="form.imageUrl" placeholder="Image URL"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="my-1">
        <b-col>
            <b-form-input :state="priceValid" v-model="form.price" placeholder="Price"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="my-1">
        <b-col>
            <b-form-input :state="quantityValid" v-model="form.quantity" placeholder="Quantity"></b-form-input>
        </b-col>
    </b-row>
    <b-row align-h="end" class="my-1">
        <b-button v-bind:disabled="!formValid" variant="primary" class="mx-2" @click="save()">Save</b-button>
        <b-button class="mr-3" @click="cancel()">Cancel</b-button>
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
            },
            errors: {}
        }
    },
    methods: {
        save() {
            if (!this.form.id) this.create();
            else this.update();
        },
        create() {
            axios.post('http://localhost:8080/api/products', this.form)
            .then(() => this.$emit('save', this.form));
        },
        update() {
            axios.put('http://localhost:8080/api/products/' + this.form.id, this.form)
            .then(() => this.$emit('save', this.form));
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
    },
    computed: {
        nameValid: function () {
            if (this.form.name === '') return false;
            if (!this.form.name) return null;
            return true;
        },
        priceValid: function () {
            if (this.form.price === '') return false;
            if (!this.form.price) return null;
            return !isNaN(this.form.price);
        },
        quantityValid: function () {
            if (this.form.quantity === '') return false;
            if (!this.form.quantity) return null;
            return Number.isInteger(+this.form.quantity) && this.form.quantity >= 0;
        },
        formValid: function () {
            return this.nameValid && this.priceValid && this.quantityValid
        }
    }
}
</script>