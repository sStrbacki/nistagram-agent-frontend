<template>
  <div>
    <div class="d-flex flex-wrap justify-content-between items-wrap">
      <b-col cols="4" v-for="cartItem in cartItems" :key="cartItem.id">
        <div class="item mb-5 mr-4">
          <b-col>
            <catalog-item :item="cartItem.product" :cartItem="trimProduct(cartItem)"/>
          </b-col>
        </div>
      </b-col>
    </div>
    <div>
      <b-row>
        <b-col>
          <b-button class="btn-success" @click="checkout">Checkout</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import CatalogItem from '../../components/catalog/CatalogItem'
import {deepCopy} from "@/services/general";
import {errorMessage} from "@/helpers/notfications";

export default {
  name: 'ShoppingCart',
  components: {CatalogItem},
  computed: {
    cartItems: {
      get() {
        return this.$store.getters.cartItems;
      }
    },
  },
  mounted() {
    this.$store.dispatch('fetchShoppingCart');
  },
  methods: {
    checkout() {
      if (this.$store.getters.cartItems.length === 0)
        errorMessage('Your cart is empty.');
      else
        this.$router.push({name: 'Checkout'});
    },
    trimProduct(item) {
      const cartItem = deepCopy(item);
      cartItem.product = undefined;
      return cartItem;
    },
  }
}
</script>

<style scoped>
.item {
  background-color: rgb(224, 220, 220);
  border-radius: 0.5em;
  margin-left: 2em;
  color: rgb(36, 35, 35);
}

.items-wrap {
  margin-top: 4em;
}
</style>
