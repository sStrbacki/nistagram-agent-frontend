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
            const form = context.getters.campaignForm;
            const campaign = {
                name: form.name,
                type: form.type,
                targetedGroup: form.targetedGroup,
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
        addCampaign(state, value) {
            state.campaign.campaigns.push(value);
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
        }
    }
}
