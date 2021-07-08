<template>
  <b-container style="text-align: left" class="ml-5 mt-5">
    <div>
      <b-col cols="6" v-for="campaign in getAllCampaigns" :key="campaign.name">
        <div style="background-color: white; color: black;
        border-radius: 5px; margin-bottom: 20px; padding-left: 15px; padding-right: 15px; padding-top: 15px; padding-bottom: 15px">
          <b-row>
            <b-col>
              <b-button variant="warning">{{campaign.name}}</b-button>
            </b-col>
          </b-row>
          <br>
          <b-list-group>
            <b-list-group-item v-for="ad in campaign.advertisements" :key="ad.id">
              <b-row>
                <b-col>
                  <b-img width="100%" height="100%" :src="ad.mediaUrl"></b-img>
                </b-col>
                <b-col>
                  <div>
                    <p style="font-style: italic">{{ad.caption}}</p>
                  </div>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>

          <b-row class="mt-3">
            <b-col>
              <b-button variant="danger">Created on {{new Date(campaign.createdOn).toLocaleDateString()}}</b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </div>
  </b-container>
</template>
<script>
export default {
  name: "ExistingCampaigns",
  computed: {
    getAllCampaigns() {
      return this.$store.getters.existingCampaigns;
    }
  },
  mounted() {
    this.$store.dispatch('loadExistingCampaigns');
  }
}
</script>

<style scoped>

</style>
