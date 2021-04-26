import axios from "axios";
import Vue from "vue";
import api from "@/api";

export default {
    state: {
        uuid: '',
        rUuid: ''
    },
    mutations: {
        setUUID(state, value) {
            state.uuid = value;
        },
        setRUUID(state, value) {
            state.rUuid = value;
        }
    },
    actions: {
        changePassword(context){
            axios.post(
                api.users.resetPassword + context.state.uuid + '&' + context.state.rUuid,
                {
                        newPassword: "Nikola021!+"
                     }
            )
            .then(() => {
                Vue.notify({
                    group: 'notification',
                    text: "Password successfully changed.",
                    type: 'success'
                })
            })
            .catch(err => alert(err.response.data))
        }
    }
}