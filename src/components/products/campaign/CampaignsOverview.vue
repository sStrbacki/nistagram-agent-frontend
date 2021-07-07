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
                    <b-button variant="info" disabled>{{ad.name}}</b-button>
                  </div>
                  <br>
                  <div>
                    <p style="font-style: italic">{{ad.caption}}</p>
                  </div>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>

          <b-row class="mt-3">
            <b-col>
              <p style="font-weight: bold; font-size: 16px;">Campaign type: {{campaign.type}}</p>
              <div v-if="campaign.exposureMoments">
                <p>Campaign duration: Long term</p>
                <p>Start date: {{campaign.startsOn}}</p>
                <p>End date: {{campaign.endsOn}}</p>
                <b-button variant="warning" class="mr-2" v-for="moment in campaign.exposureMoments" :key="moment">
                  {{moment}}
                </b-button>
              </div>
              <div v-else>
                <p>Campaign duration: One time</p>
                <p>Exposure date: {{campaign.exposureMoment}}</p>
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <b-button variant="outline-danger">Targeted audience</b-button>
              <br><br>
              <p>
                Minimum viewer age: {{campaign.targetedGroup.minAge}}
              </p>
              <p>
                Maximum viewer age: {{campaign.targetedGroup.maxAge}}
              </p>
              <p>
                Audience gender: {{campaign.targetedGroup.gender}}
              </p>
            </b-col>
          </b-row>

          <b-row class="text-center">
            <b-col>
              <b-button variant="success">Deploy</b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "CampaignsOverview",
  computed: {
    getAllCampaigns: {
      get() {
        const campaigns = this.$store.getters.allCampaigns;
        console.log('Campaigns overview:', campaigns);
        return campaigns;
      }
    }
  }
}
</script>

<style scoped>

</style>
