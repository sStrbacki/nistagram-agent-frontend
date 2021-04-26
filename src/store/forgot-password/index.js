import axios from "axios";
import Vue from "vue";
import api from "@/api";

export default {
    state: {
        data:{
            username: '',
        }
    },
    mutations: {
        updateUsername(state, value){
            state.data.username = value
        },
    },
    actions: {
        requestPasswordChange(context){
            axios.get(api.users.requestPasswordReset + context.state.data.username)
            .then(() => {
                Vue.notify({
                    group: 'notification',
                    text: "Password change requested. Please check your mail.",
                    type: 'success'
                })
            })
            .catch(err => {
                let errMsg = '';
                if (err.response.status > 500) {
                    errMsg = "Server error occurred";
                }
                else {
                    errMsg = "That username does not exist."
                }
                Vue.notify({
                    group: 'notification',
                    text: errMsg,
                    type: 'error'
                })
            });
        }
    }
}