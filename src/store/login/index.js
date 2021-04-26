import axios from "axios";
import { setJwt } from "../../helpers/jwt"
import api from '../../api/index'
import Vue from "vue";

export default {
    state: {
        loginData:{
            username: '',
            password: '',
        }
    },
    mutations: {
        updateUsername(state, value){
            state.loginData.username = value
        },
        updatePassword(state, value){
            state.loginData.password = value
        }
    },
    actions: {
        login(context){
            axios.post(api.auth.login, context.state.loginData)
            .then(response => {
                setJwt(response.headers.authorization)
            })
            .catch(err => {
                Vue.notify({
                    group: 'notification',
                    text: err.response.data,
                    type: 'error'
                })
            });
        }
    }
}