<template>
  <b-row class="item mb-5 mr-4" v-if="item.quantity != 0">
    <b-col>
      <b-row align-h="center">
        <img v-bind:src="item.imageUrl" class="item-image">
      </b-row>
    </b-col>
    <b-col class="">
      <b-row align-h="center" class="item-name">
        {{ item.name }}
      </b-row>
      <b-row align-h="center" class="item-price;" style="font-weight: bolder; color: green;">
        {{ item.price }}$
      </b-row>
      <b-row align-h="center" class="mt-4" cols="6" align-v="center">
        Qty:
        <b-col class="p-0">
          <b-button v-if="!cartItem" class="btn-danger" @click="decrease" :disabled="!availableDecrease">
            <b-icon icon="dash"></b-icon>
          </b-button>
        </b-col>
        <b-col>
          <div v-if="!cartItem" class="quantity">{{ quantity }}</div>
          <div v-else class="quantity">{{ cartItem.quantity }}</div>
        </b-col>
        <b-col class="p-0">
          <b-button v-if="!cartItem" class="btn-success" @click="increase" :disabled="!availableIncrease">
            <b-icon icon="plus"></b-icon>
          </b-button>
        </b-col>
        <b-col>
          <b-button v-if="!cartItem" class="btn-info" size="sm" @click="addToShoppingCart" :disabled="!quantity">
            <b-icon icon="cart-plus"></b-icon>
          </b-button>
          <b-button variant="danger" v-else size="sm" @click="removeFromShoppingCart">
            <b-icon icon="trash"></b-icon>
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'CatalogItem',
  props: {
    item: Object,
    cartItem: Object
  },
  data() {
    return {
      quantity: 0
    }
  },
  computed: {
    availableIncrease() {
      return this.quantity < this.item.quantity;
    },
    availableDecrease() {
      return this.quantity > 0;
    },
  },
  methods: {
    increase() {
      this.quantity += 1;
    },
    decrease() {
      this.quantity -= 1;
    },
    addToShoppingCart() {
      this.$store.dispatch(
          'addToShoppingCart',
          {
            productId: this.item.id,
            quantity: this.quantity
          }
      )
      .then(() => this.quantity = 0);
    },
    removeFromShoppingCart() {
      this.$store.dispatch('removeFromShoppingCart', this.cartItem.id);
    }
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

.item-image {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 10em;
  height: 10em;
  overflow: hidden;
  border-radius: 90%;
  object-fit: cover;
}

.item-info {
  margin-top: 5%;
}

.item-name {
  margin-top: 5%;
  font-size: 200%;
}

.item-price {
  font-size: 120%;
  font-weight: bold;
  color: rgb(129, 127, 127)
}

.btn .b-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.btn .b-icon:last-child {
  margin-right: 0;
}

.btn-quantity-control {
  transition: 0.5s;
  cursor: pointer;
}

.btn-quantity-control:hover {
  transition: 0.4s;
  background: rgb(146, 144, 144) !important;
  border-radius: .2em;
}

</style>
