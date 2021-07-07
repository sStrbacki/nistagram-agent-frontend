import {findByCustomFieldValue} from "@/services/general";

export default {
    state: {
        campaign: {
            campaigns: [
                // {name: 'Sex campaign'}, {name: 'NGMI Campaign'}
            ],
            selectedCampaign: undefined,
            campaignModalOpened: false,
            promotedProduct: undefined,
            campaignForm: undefined
        }
    },
    actions: {
        openPromotion(context, product) {
            context.commit('campaignModalOpened', true);
            context.commit('promotedProduct', product);
            context.commit('resetForm');
        },
        selectCampaign(context, campaignName) {
            context.commit(
                'selectedCampaign',
                findByCustomFieldValue(context.getters.allCampaigns, 'name', campaignName));
        },
        createCampaign(context) {
            alert(context.getters.campaignForm.startsOn);
            context.commit('resetForm');
        }
    },
    getters: {
        campaignModalOpened: state => state.campaign.campaignModalOpened,
        promotedProduct: state => state.campaign.promotedProduct,
        allCampaigns: state => state.campaign.campaigns,
        selectedCampaign: state => state.campaign.selectedCampaign,
        campaignForm: state => state.campaign.campaignForm,

        /** Query getters */
        campaignsExist: state => state.campaign.campaigns.length !== 0,
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
                exposureMoments: [],
                startsOn: undefined,
                endsOn: undefined,
                exposureMoment: undefined,
                exposureMomentsBatch: undefined
            }
        }
    }
}
