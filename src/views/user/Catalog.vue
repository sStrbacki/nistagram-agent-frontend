<template>
  <div>
    <div class="d-flex flex-wrap justify-content-between items-wrap">
      <b-col cols="4" v-for="product in products" :key="product.id">
        <catalog-item :item="product" @addToCart="addedToCart($event)"/>
      </b-col>
    </div>
  </div>
</template>

<script>
import CatalogItem from '../../components/catalog/CatalogItem'

export default {
  name: 'Catalog',
  components: {CatalogItem},
  computed: {
    products: {
      get() {
        return this.$store.state.catalog.catalog.products
      }
    }
  },
  methods: {
    addedToCart(payload) {
      this.$store.dispatch('addedToCart', payload.id, payload.quantity);
    }
  },
  mounted() {
    this.$store.dispatch('fetchAvailable')
  }
}
</script>

<style scoped>
.items-wrap {
  margin-top: 4em;
}

</style>
