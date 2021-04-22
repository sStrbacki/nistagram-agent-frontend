<template>
<div>
    <b-row class="my-1">
        <b-col>
            <b-form-input :state="nameValid" v-model="form.name" placeholder="Product name"></b-form-input>
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
    <b-row class="my-1">
        <b-col cols="4">
            Upload image:
        </b-col>
        <b-col cols="8">
            <input type="file" ref="image" accept="image/*" @change="uploadImage"/>
        </b-col>
        
    </b-row>
    <b-row align-h="end" align-v="center" class="my-1">
        <b-spinner v-show="uploading"></b-spinner>
        <b-button v-bind:disabled="!formValid" variant="primary" class="mx-2" @click="save()">Save</b-button>
        <b-button class="mr-3" @click="cancel()">Cancel</b-button>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
import api from '../../api/index.js'

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
            uploading: false
        }
    },
    methods: {
        save() {
            if (!this.form.id) this.create();
            else this.update();
        },
        create() {
            axios.post(api.products.root, this.form)
            .then(() => this.$emit('save', this.form));
        },
        update() {
            axios.put(api.products.root + this.form.id, this.form)
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
        },
        uploadImage() {
            this.uploading = true;
            const image = this.$refs.image.files[0];
            const formData = new FormData();
            formData.append('image', image);
            axios.post(
                api.images.root,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.form.imageUrl = api.images.content + response.data;
                    console.log(response.data);
                })
                .catch(() => {
                    this.$notify({
                        group: 'notification',
                        text: 'Error uploading image!',
                        type: 'error'
                    });
                })
                .finally(() => this.uploading = false);
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
            return this.nameValid && this.priceValid && this.quantityValid && !this.uploading
        }
    }
}
</script>