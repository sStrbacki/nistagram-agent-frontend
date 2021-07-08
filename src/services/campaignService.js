import axios from "axios";
import api from "@/api";

export function getExistingCampaigns() {
    return axios.get(api.campaign.root);
}

export function deployOneTerm(campaign) {
    return axios.post(api.campaign.oneTerm, campaign);
}

export function deployLongTerm(campaign) {
    return axios.post(api.campaign.longTerm, campaign);
}
