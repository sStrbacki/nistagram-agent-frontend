<template>
  <div>
    <ProductInfo :_name="name" :_price="price" :_quantity="quantity"
      @name="emit('name', $event)"
                 @price="emit('price', $event)"
                 @quantity="emit('quantity', $event)"
    ></ProductInfo>
    <b-row class="my-1">
      <b-col cols="4">
        Upload image:
      </b-col>
      <b-col cols="8">
        <input type="file" ref="image" accept="image/*" @change="uploadImage"/>
      </b-col>
    </b-row>
    <b-row align-h="end" align-v="center" class="my-1">
      <b-button variant="primary" class="mx-2" @click="create()">Save</b-button>
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
    _name: {},
    _imageUrl: {},
    _price: {},
    _quantity: {}
  },
  computed: {
    name() {
      return this._name;
    },
    price() {
      return this._price;
    },
    quantity() {
      return this._quantity;
    },
    imageUrl: {
      get() {
        return this._imageUrl;
      },
      set(value) {
        this.$emit('imageUrl', value);
      }
    },
  },
  methods: {
    create() {
      this.$emit('create');
    },
    emit(code, value) {
      this.$emit(code, value);
    },
    // TODO Move this to it's own component!
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
      .then(response => this.imageUrl = api.images.content + '/' + response.data)
      .catch(() => errorMessage('Error while uploading the image.'))
    }
  },

}
</script>
