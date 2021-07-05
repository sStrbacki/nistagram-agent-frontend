<template>
  <b-container>
    <b-form class="mt-5 w-50" style="margin: 0 auto; text-align: left;">
      <b-form-group
          invalid-feedback="Incorrect address line."
          label="Address">
        <b-form-input
            type="text"
            placeholder="Address"
            v-model="addressLine"
            :state="vAddressLine"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
          label="City">
        <b-form-input
            type="text"
            placeholder="City"
            v-model="city"
            :state="vCity"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
          label="Country">
        <b-form-input
            type="text"
            placeholder="Country"
            v-model="country"
            :state="vCountry"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
          label="Postal code">
        <b-form-input
            type="text"
            placeholder="Postal code"
            v-model="postalCode"
            :state="vPostalCode"
        >
        </b-form-input>
      </b-form-group>
    </b-form>
    <b-row>
      <b-col>
        <b-button class="btn-success mt-3" @click="submit">Finish order</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {stringMatchesRegex} from "@/services/general";

export default {
  name: "Checkout",
  computed: {
    addressLine: {
      get() {
        return this.$store.getters.addressLine;
      },
      set(value) {
        this.$store.commit('addressLine', value);
      }
    },
    city: {
      get() {
        return this.$store.getters.city;
      },
      set(value) {
        this.$store.commit('city', value);
      }
    },
    postalCode: {
      get() {
        return this.$store.getters.postalCode;
      },
      set(value) {
        this.$store.commit('postalCode', value);
      }
    },
    country: {
      get() {
        return this.$store.getters.country;
      },
      set(value) {
        this.$store.commit('country', value);
      }
    },
    vAddressLine() {
      if (this.addressLine)
        return stringMatchesRegex(this.addressLine, this.regexAddressLine)
      return null;
    },
    vCity() {
      if (this.city)
        return stringMatchesRegex(this.city, this.regexCity);
      return null;
    },
    vPostalCode() {
      if (this.postalCode)
        return stringMatchesRegex(this.postalCode, this.regexPostalCode);
      return null;
    },
    vCountry() {
      if (this.country)
        return stringMatchesRegex(this.country, this.regexCountry);
      return null;
    }
  },
  data() {
    return {
      regexAddressLine: undefined,
      regexCity: undefined,
      regexPostalCode: undefined,
      regexCountry: undefined
    }
  },
  beforeMount() {
    this.regexAddressLine = /[A-Z][a-z A-Z]* [0-9]+[a-z]*/;
    this.regexCity = new RegExp('[A-Z][a-z A-Z]*');
    this.regexPostalCode = new RegExp('[1-9][0-9]+');
    this.regexCountry = new RegExp('[A-Z][a-z A-Z]*');
  },
  methods: {
    submit() {
      this.$store.dispatch('finishCheckout');
    },
  }
}
</script>

<style scoped>

</style>
