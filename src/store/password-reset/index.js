import axios from "axios";
import Vue from 'vue'
import api from "@/api";
import router from '../../router/index'

export default {
    state: {
        username: '',
        password: '',
        uuid: '',
        rUuid: ''
    },
    mutations: {
        setUUID(state, value) {
            state.uuid = value;
        },
        setRUUID(state, value) {
            state.rUuid = value;
        },
        setUsername(state, value){
            state.username = value
        },
        updatePasswordReset(state, value){
            state.password = value
        }
    },
    actions: {
        changePassword(context){
            axios.post(
                api.users.passwordReset + context.state.uuid + '&' + context.state.rUuid,
                {
                    newPassword: context.state.password
                }
            )
            .then(() => {
                Vue.notify({
                    group: 'notification',
                    text: "Password successfully changed.",
                    type: 'success'
                })
                router.push('/')
            })
            .catch(err => {
                Vue.notify({
                    group: 'notification',
                    text: err.response.data,
                    type: 'error'
                })
            })
        },
        requestPasswordChange(context){
            axios.get(api.users.requestPasswordReset + context.state.username)
            .then(() => {
                Vue.notify({
                    group: 'notification',
                    text: "Password change requested. Please check your mail.",
                    type: 'success'
                })
                router.push('/')
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