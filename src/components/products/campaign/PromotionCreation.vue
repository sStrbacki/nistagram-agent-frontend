<template>
  <b-container>

  </b-container>
</template>

<script>
export default {
  name: "PromotionCreation",
  props: {
    promotedProduct: Object
  },
  data() {
    return {
      dCampaignType: 'one-term'
    }
  },
  computed: {
    campaignType: {
      get() {
        return this.dCampaignType;
      },
      set(value) {
        console.log('Setting CT to', value);
        this.dCampaignType = value;
      }
    }
  }
}
</script>

<style scoped>

</style>
