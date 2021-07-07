<template>
  <b-container>

    <div v-if="campaignsExist && !additionalCampaignRequested">
      <b-row>
        <b-col>
          <b-img width="100%" height="100%" :src="selectedCampaignProduct.imageUrl"></b-img>
        </b-col>
        <b-col class="text-right align-baseline">
          <h5>Product to be added</h5>
          <b-button variant="warning" disabled>{{selectedCampaignProduct.name}}</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <label> Select a campaign </label>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-select v-model="selectedCampaign">
            <b-select-option v-for="campaign in allCampaigns" :key="campaign.name" :value="campaign.name">
              {{campaign.name}}
            </b-select-option>
          </b-select>
        </b-col>
      </b-row>
      <div v-if="selectedCampaign.toLowerCase() !== 'no selection'">
        <b-row class="mt-2">
          <b-col>
            <label style="width: 100%">
              Enter a caption for the advertisement
              <b-input type="text" placeholder="Caption" v-model="caption" style="width: 100%"></b-input>
            </label>
          </b-col>
        </b-row>
        <b-row v-if="selectedCampaignProducts.length > 0">
          <b-col>
            <label>
              Products which are already in this campaign
            </label>
            <b-list-group>
              <b-list-group-item v-for="product in selectedCampaignProducts" :key="product.id">
                <p>{{product.name}}</p>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p style="color: darkred" v-if="currentProductAlreadyInCampaign">
              This product has already been added to this campaign!
            </p>
          </b-col>
        </b-row>
      </div>

      <div style="margin-top: 50px; text-align: center;">
        <b-row>
          <b-col>
            <b-button variant="success" @click="addProductToCampaign">Add product to campaign</b-button>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <b-button variant="info" @click="requestAdditionalCampaign">Add another campaign</b-button>
          </b-col>
        </b-row>
      </div>

    </div>

    <div v-else>
      <b-row>
        <b-col>
          <p>Let's create a campaign.</p>
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
          <label>Gender</label>
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
    additionalCampaignRequested: {
      get() {
        return this.$store.getters.additionalCampaignRequested;
      }
    },
    selectedCampaign: {
      get() {
        const selected = this.$store.getters.selectedCampaign;
        if (selected)
          return selected.name;
        else return "No selection";
      },
      set(value) {
        console.log('Setting Selected campaign to', value);
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
    },
    caption: {
      get() {
        return this.$store.getters.adCaption;
      },
      set(value) {
        this.$store.commit('adCaption', value);
      }
    },
    selectedCampaignProducts: {
      get() {
        return this.$store.getters.selectedCampaignProducts;
      }
    },
    currentProductAlreadyInCampaign() {
      return this.$store.getters.currentProductAlreadyInCampaign;
    },
    selectedCampaignProduct() {
      return this.$store.getters.selectedCampaignProduct;
    }
  },
  methods: {
    createCampaign() {
      this.$store.dispatch('createCampaign');
    },
    requestAdditionalCampaign() {
      this.$store.dispatch('requestAdditionalCampaign');
    },
    addProductToCampaign() {
      this.$store.dispatch('addProductToCampaign');
    }
  }
}
</script>

<style scoped>

</style>
