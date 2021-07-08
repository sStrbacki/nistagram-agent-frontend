import {findByCustomFieldValue} from "@/services/general";
import {errorMessage, successMessage} from "@/helpers/notfications";
import {deployLongTerm, deployOneTerm, getExistingCampaigns} from "@/services/campaignService";

export default {
    state: {
        campaign: {
            campaigns: [
                // {name: 'Sex campaign'}, {name: 'NGMI Campaign'}
            ],
            existingCampaigns: [],
            selectedCampaign: undefined,
            campaignModalOpened: false,
            promotedProduct: undefined,
            campaignForm: undefined,
            additionalCampaignRequested: false,
            adCaption: undefined
        }
    },
    actions: {
        openPromotion(context, product) {
            context.commit('campaignModalOpened', true);
            context.commit('promotedProduct', product);
            context.commit('resetForm');
        },
        selectCampaign(context, campaignName) {
            const foundCampaign = findByCustomFieldValue(context.getters.allCampaigns, 'name', campaignName);
            console.log('Found campaign named', campaignName, foundCampaign);
            context.commit('selectedCampaign', foundCampaign);
        },
        createCampaign(context) {
            const form = context.getters.campaignForm;
            const sameNameCampaign = findByCustomFieldValue(context.getters.allCampaigns, 'name', form.name);
            if (sameNameCampaign) {
                errorMessage('Campaign with the name ' + form.name + ' already exists');
                return;
            }
            const campaign = {
                name: form.name,
                type: form.type,
                targetedGroup: form.targetedGroup,
                advertisements: []
            };
            if (form.longevity === 'ONE-TERM')
                campaign['exposureMoment'] = form.exposureMoment;
            else if (form.longevity === 'LONG-TERM') {
                campaign['startsOn'] = form.startsOn;
                campaign['endsOn'] = form.endsOn;
                campaign['exposureMoments'] = [];
                form.exposureMomentsBatch.split(' ')
                    .forEach(token => {
                        campaign['exposureMoments'].push(token + ':00:00');
                    })
            }

            context.commit('addCampaign', campaign);
            context.commit('resetForm');
            context.commit('additionalCampaignRequested', false);
        },
        requestAdditionalCampaign(context) {
            context.commit('additionalCampaignRequested', true);
        },
        addProductToCampaign(context) {
            if (context.getters.currentProductAlreadyInCampaign) return;
            const ad = {
                id: context.getters.promotedProduct.id,
                name: context.getters.promotedProduct.name,
                mediaUrl: context.getters.promotedProduct.imageUrl,
                caption: context.getters.adCaption,
                websiteUrl: 'localhost:4000'
            };
            context.getters.selectedCampaign.advertisements.push(ad);
            successMessage(context.getters.promotedProduct.name + ' added to campaign ' + context.getters.selectedCampaign.name);
            context.commit('resetStateVariables');
        },
        async deployCampaign(context, campaign) {
            const func = campaign.exposureMoments ? deployLongTerm : deployOneTerm;
            func(campaign)
            .then(() => {
              context.commit('removeCampaignByName', campaign.name);
              successMessage('Success');
            })
            .catch(error => console.error(error.response.data));
        },
        async loadExistingCampaigns(context) {
            getExistingCampaigns()
            .then(response => context.commit('existingCampaigns', response.data))
            .catch(error => console.error(error.response.data));
        }
    },
    getters: {
        campaignModalOpened: state => state.campaign.campaignModalOpened,
        promotedProduct: state => state.campaign.promotedProduct,
        allCampaigns: state => state.campaign.campaigns,
        selectedCampaign: state => state.campaign.selectedCampaign,
        campaignForm: state => state.campaign.campaignForm,
        adCaption: state => state.campaign.adCaption,
        existingCampaigns: state => state.campaign.existingCampaigns,

        additionalCampaignRequested: state => state.campaign.additionalCampaignRequested,

        /** Query getters */
        campaignsExist: state => state.campaign.campaigns.length !== 0,
        selectedCampaignProduct: state => state.campaign.promotedProduct,
        selectedCampaignProducts(state) {
            const products = [];
            state.campaign.selectedCampaign.advertisements
                .forEach(ad => {
                    products.push({
                        name: ad.name,
                        id: ad.id
                    });
                });
            return products;
        },
        currentProductAlreadyInCampaign(state) {
            return state.campaign.selectedCampaign.advertisements
                .find(ad => ad.id === state.campaign.promotedProduct.id) !== undefined;
        },
    },
    mutations: {
        campaignModalOpened(state, value) {
            state.campaign.campaignModalOpened = value;
        },
        promotedProduct(state, value) {
            state.campaign.promotedProduct = value;
        },
        selectedCampaign(state, value) {
            state.campaign.selectedCampaign = value;
        },
        campaignForm(state, value) {
            state.campaign.campaignForm = value;
        },
        addCampaign(state, value) {
            state.campaign.campaigns.push(value);
        },
        additionalCampaignRequested(state, value) {
            state.campaign.additionalCampaignRequested = value;
        },
        adCaption(state, value) {
            state.campaign.adCaption = value;
        },
        existingCampaigns(state, value) {
            state.campaign.existingCampaigns = value
        },

        /** Logic */
        removeCampaignByName(state, campaignName) {
          state.campaign.campaigns.splice(
              state.campaign.campaigns.findIndex(campaign => campaign.name === campaignName),
              1
          );
        },
        resetForm(state) {
            state.campaign.campaignForm = {
                longevity: 'ONE-TERM',
                name: '',
                type: 'POST',
                targetedGroup: {
                    minAge: undefined,
                    maxAge: undefined,
                    gender: undefined
                },
                advertisements: [],

                /** One-term field */
                exposureMoment: undefined,

                /** Long term fields */
                exposureMoments: [],
                startsOn: undefined,
                endsOn: undefined,
                exposureMomentsBatch: undefined
            }
        },
        resetStateVariables(state) {
            state.campaign.adCaption = undefined;
            state.campaign.additionalCampaignRequested = false;
            state.campaign.promotedProduct = undefined;
            state.campaign.selectedCampaign = undefined;
            state.campaign.campaignModalOpened = false;
        }
    }
}
