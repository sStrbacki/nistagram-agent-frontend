<template>
  <b-container>

    <div v-if="campaignsExist">
      <b-row>
        <b-col>
          <p> Select a campaign </p>
        </b-col>
      </b-row>
      <b-row>
        <b-select v-model="selectedCampaign.name">
          <b-select-option v-for="campaign in allCampaigns" :key="campaign.name" :value="campaign.name">
            {{campaign.name}}
          </b-select-option>
        </b-select>
      </b-row>
    </div>

    <div v-else>
      <b-row>
        <b-col>
          <p>No campaigns exist. Please create a new one below.</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>
            Name
            <b-input type="text" placeholder="Campaign name" v-model="form.name"></b-input>
          </label>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-select :value="form.type" v-model="form.type">
            <b-select-option value="POST">Post campaign</b-select-option>
            <b-select-option value="STORY">Story campaign</b-select-option>
          </b-select>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <label>Target group definition</label>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
            <b-input type="number" placeholder="Minimum viewer age" v-model="form.targetedGroup.minAge"></b-input>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <b-input type="number" placeholder="Maximum viewer age" v-model="form.targetedGroup.maxAge"></b-input>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <b-select :value="form.targetedGroup.gender" v-model="form.targetedGroup.gender">
            <b-select-option value="MALE">Male</b-select-option>
            <b-select-option value="FEMALE">Female</b-select-option>
            <b-select-option value="OTHER">Other</b-select-option>
          </b-select>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col>
          <label>Define campaign duration</label>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-select :value="form.longevity" v-model="form.longevity">
            <b-select-option value="ONE-TERM">One term</b-select-option>
            <b-select-option value="LONG-TERM">Long term</b-select-option>
          </b-select>
        </b-col>
      </b-row>

      <div v-if="form.longevity === 'ONE-TERM'" class="mt-2">
        <b-row>
          <b-col>
            <label>
              Exposure date
              <b-input type="date" placeholder="Date" v-model="form.exposureMoment"></b-input>
            </label>
          </b-col>
        </b-row>
      </div>
      <div v-else class="mt-2">
        <b-row>
          <b-col>
            <label>
              Start
              <b-input type="date" placeholder="Start" v-model="form.startsOn"></b-input>
            </label>
          </b-col>
          <b-col>
            <label>
              End
              <b-input type="date" placeholder="End" v-model="form.endsOn"></b-input>
            </label>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label>
              Type in space-divided hours at which to display your promotion
              <b-input type="text" v-model="form.exposureMomentsBatch"></b-input>
            </label>
          </b-col>
        </b-row>
      </div>

      <b-row style="text-align: center" class="mt-3">
        <b-col>
          <b-button variant="success" @click="createCampaign">Create campaign</b-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "CampaignManager",
  computed: {
    campaignsExist: {
      get() {
        return this.$store.getters.campaignsExist;
      }
    },
    selectedCampaign: {
      get() {
        const selected = this.$store.getters.selectedCampaign;
        if (selected)
          return selected;
        else return {name: 'No selection'}
      },
      set(value) {
        this.$store.dispatch('selectCampaign', value);
      }
    },
    allCampaigns: {
      get() {
        return this.$store.getters.allCampaigns;
      }
    },
    form: {
      get() {
        return this.$store.getters.campaignForm
      }
    }
  },
  methods: {
    createCampaign() {
      this.$store.dispatch('createCampaign');
    }
  }
}
</script>

<style scoped>

</style>
