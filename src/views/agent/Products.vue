<template>
  <b-container>
    <b-row cols="2" align-h="center">
      <div class="product-form">
        <b-row align-h="center">
          <h1>Add product</h1>
        </b-row>
        <b-row align-h="center">
          <product-form
              :_name="newProduct.name"
              :_price="newProduct.price"
              :_quantity="newProduct.quantity"
              @create="addProduct"
              @name="updateNewProductField('name', $event)"
              @price="updateNewProductField('price', $event)"
              @quantity="updateNewProductField('quantity', $event)"
              @imageUrl="updateNewProductField('imageUrl', $event)"
          >
          </product-form>
        </b-row>
      </div>
    </b-row>
    <div class="d-flex flex-wrap justify-content-between mt-3">
      <b-col cols="4" v-for="product in products" :key="product.id">
        <div class="product m-1 py-1">
          <b-row align-h="center">
            <img v-bind:src="product.imageUrl" class="product-image" alt="Product image">
          </b-row>
          <b-row align-h="center">
            {{ product.name }}
          </b-row>
          <b-row align-h="center">
            {{ product.price }}
          </b-row>
          <b-row align-h="center">
            {{ product.quantity }}
          </b-row>
          <b-row align-h="end" class="mt-3">
            <b-button size="sm" variant="success" v-b-modal:promote-product-modal @click="openPromotion(product)">Promote</b-button>

            <b-button size="sm" variant="primary" class="mx-2" v-b-modal:edit-product-modal
                      @click="openEdit(product.id)">Edit</b-button>

            <b-button size="sm" variant="danger" class="mr-4" @click="remove(product.id)">Delete</b-button>
          </b-row>
        </div>
      </b-col>
    </div>
    <div>
      <b-modal v-if="editOpened" id="edit-product-modal"
               @cancel="closeEdit"
               @ok="saveEdit">
        <product-info
            :_name="editedProduct.name"
            :_price="editedProduct.price"
            :_quantity="editedProduct.quantity"
            @name="editedProduct.name = $event"
            @price="editedProduct.price = $event"
            @quantity="editedProduct.quantity = $event"
        >
        </product-info>
      </b-modal>

      <b-modal v-if="campaignOpened" id="promote-product-modal" ok-only ok-title="Cancel" ok-variant="secondary">
        <CampaignManager></CampaignManager>
      </b-modal>
    </div>

  </b-container>
</template>

<script>
import ProductForm from '../../components/products/ProductForm';
import ProductInfo from "@/components/products/ProductInfo";
import CampaignManager from "@/components/products/campaign/CampaignManager";

export default {
  components: {CampaignManager, ProductInfo, ProductForm},
  computed: {
    products: {
      get() {
        return this.$store.getters.allProducts;
      }
    },
    editOpened: {
      get() {
        return this.$store.getters.editOpened;
      }
    },
    campaignOpened: {
      get() {
        return this.$store.getters.campaignModalOpened;
      }
    },
    editedProduct: {
      get() {
        return this.$store.getters.editedProduct;
      }
    },
    newProduct: {
      get() {
        return this.$store.getters.newProduct;
      }
    }
  },
  mounted() {
    this.$store.dispatch('getAllProducts');
  },
  methods: {
    saveEdit() {
      this.$store.dispatch('saveEdit');
    },
    addProduct() {
      this.$store.dispatch('createNewProduct');
    },
    remove(id) {
      this.$store.dispatch('deleteProductById', id);
    },
    openEdit(id) {
      this.$store.dispatch('openEditDialog', id);
    },
    closeEdit() {
      this.$store.dispatch('closeEditDialog');
    },
    updateNewProductField(field, value) {
      this.$store.commit('updateNewProductField', {field, value});
    },
    openPromotion(product) {
      this.$store.dispatch('openPromotion', product);
    }
  }
}
</script>

<style scoped>
.product-form {
  margin-top: 5em;
  color: rgb(36, 35, 35);
  background-color: rgb(224, 220, 220);
  padding: 3em;
  border-radius: 6px;
  box-shadow: 5px 5px 10px #1d1d1d;
}

.product {
  background-color: rgb(224, 220, 220);
  border-radius: 6px;
  color: rgb(36, 35, 35);
}

.product-image {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 200px;
  height: 200px;
  border-radius: 90%;
  object-fit: cover;
}

img {
  max-height: 25vh;
}
</style>
