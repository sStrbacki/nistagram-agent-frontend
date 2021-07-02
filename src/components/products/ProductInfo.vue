<template>
  <b-container>
    <b-row class="my-1">
      <b-col>
        <b-form-input :state="nameValid" v-model="name" placeholder="Product name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col>
        <b-form-input :state="priceValid" v-model="price" placeholder="Price" type="number"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col>
        <b-form-input :state="quantityValid" v-model="quantity" placeholder="Quantity"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ProductInfo",
  props: {
    _name: {},
    _price: {},
    _quantity: {}
  },
  computed: {
    name: {
      get() {
        return this._name;
      },
      set(value) {
        this.$emit('name', value);
      }
    },
    price: {
      get() {
        return this._price;
      },
      set(value) {
        this.$emit('price', value);
      }
    },
    quantity: {
      get() {
        return this._quantity;
      },
      set(value) {
        this.$emit('quantity', value);
      }
    },
    nameValid: function () {
      if (this.name === '') return false;
      if (!this.name) return null;
      return true;
    },
    priceValid: function () {
      if (!this.price) return null
      if (this.price === 0) return null;
      return this.price > 0;
    },
    quantityValid: function () {
      if (!this.quantity) return null;
      if (this.quantity === 0) return null;
      return this.quantity > 0;
    },
  }
}
</script>

<style scoped>

</style>
