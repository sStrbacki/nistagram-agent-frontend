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
        <ImageInput @imageUrl="imageUrl = $event"></ImageInput>
      </b-col>
    </b-row>
    <b-row align-h="end" align-v="center" class="my-1">
      <b-button variant="primary" class="mx-2" @click="create()">Save</b-button>
    </b-row>
  </div>
</template>

<script>
import ProductInfo from "@/components/products/ProductInfo";
import ImageInput from "@/components/util/ImageInput";

export default {
  name: 'ProductForm',
  components: {ImageInput, ProductInfo},
  props: {
    _name: {},
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
      set(value) {
        console.log('Setter called. Emitting value:', value);
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
  },

}
</script>
