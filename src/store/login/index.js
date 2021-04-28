import axios from "axios";
import router from '../../router/index'
import api from '../../api/index'
import Vue from "vue";

import { setJwt } from "../../helpers/jwt"
import { setRole, getRole } from "../../helpers/roles"

async function fetchRole(){
    const res = await axios.get(api.users.role);
    setRole(res.data);
}
function reroute(){
    if(getRole() === "ROLE_USER")
        router.push({ name: 'Catalog' })
    else if(getRole() === "ROLE_ADMIN")
        router.push({ name: 'Products' })

}
export default {
    state: {
        loginData:{
            username: '',
            password: '',
        }
    },
    mutations: {
        updateLoginUsername(state, value){
            state.loginData.username = value
        },
        updateLoginPassword(state, value){
            state.loginData.password = value
        },
        clearLoginData(state){
            state.loginData.username = ""
            state.loginData.password = ""
        }
    },
    actions: {
        login(context){
            axios.post(api.auth.login, context.state.loginData)
            .then(response => {
                setJwt(response.headers.authorization)
                fetchRole().then(()=>{
                    reroute()
                    context.commit('clearLoginData')
                })
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