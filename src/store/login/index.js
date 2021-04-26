import axios from "axios";
import {setJwt} from "@/helpers/jwt";
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
            let axiosConfig = {
                url: "https://localhost:4000/api/auth/login",
                data: {
                    "username": context.state.loginData.username,
                    "password": context.state.loginData.password
                },
                method: "POST"
            };

            axios.request(axiosConfig)
            .then(response => {
                let jwt = response.headers.authorization;
                setJwt(jwt)
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