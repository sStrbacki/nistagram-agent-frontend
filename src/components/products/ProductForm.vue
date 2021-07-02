<template>
<div>
    <ProductInfo></ProductInfo>
    <b-row class="my-1">
      <b-col cols="4">
        Upload image:
      </b-col>
      <b-col cols="8">
        <input type="file" ref="image" accept="image/*" @change="uploadImage"/>
      </b-col>
    </b-row>
    <b-row align-h="end" align-v="center" class="my-1">
        <b-button variant="primary" class="mx-2" @click="save()">Save</b-button>
        <b-button class="mr-3" @click="cancel()">Cancel</b-button>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
import api from '../../api/index.js'
import ProductInfo from "@/components/products/ProductInfo";
import {createImageFormData} from "@/services/fileService";
import {errorMessage} from "@/helpers/notfications";

export default {
  name: 'ProductForm',
  components: {ProductInfo},
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
            .then(response => {
              console.log(response.data);
              this.$emit('save', this.form);
            });
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
          const formData = createImageFormData(this.$refs.image.files[0]);
          axios.post(
              api.images.root,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
          .then(response => this.form.imageUrl = api.images.content + '/' + response.data)
          .catch(() => errorMessage('Error while uploading the image.'))
        }
    },

}
</script>
