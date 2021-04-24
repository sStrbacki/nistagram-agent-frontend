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
            axios.post(
                "https://localhost:4000/api/auth/login",
                {
                    "username": context.state.loginData.username,
                    "password": context.state.loginData.password
                }
            )
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