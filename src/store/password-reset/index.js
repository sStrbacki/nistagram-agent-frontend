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
                api.users.passwordReset + context.state.uuid + '&' + context.state.rUuid,
                {
                        newPassword: context.rootState.signup.signUpData.password
                     }
            )
            .then(() => {
                Vue.notify({
                    group: 'notification',
                    text: "Password successfully changed.",
                    type: 'success'
                })
            })
            .catch(err => {
                Vue.notify({
                    group: 'notification',
                    text: err.response.data,
                    type: 'error'
                })
            })
        }
    }
}