import axios from "axios";
import api from '../../api/index'

import {setJwt} from "@/helpers/jwt"
import {setLocalRole, getLocalRole} from "@/helpers/roles"
import {sendLoginRequest} from "@/services/loginService";
import {errorMessage, successMessage} from "@/helpers/notfications";
import router from "@/router";

async function fetchRole(){
    const res = await axios.get(api.users.role);
    setLocalRole(res.data);
}

export default {
    state: {
        login: {
            username: '',
            password: '',
        },
        role: {
            role: ''
        }
    },
    mutations: {
        setLoginUsername(state, value){
            state.login.username = value
        },
        setLoginPassword(state, value){
            state.login.password = value
        },
        setRole(state, value) {
            state.role.role = value;
        }
    },
    getters: {
        role(state) {
          return state.role.role;
        },
        loginUsername(state) {
            return state.login.username;
        },
        loginPassword(state) {
            return state.login.password;
        }
    },
    actions: {
        async login(context){
            try {
                const loginResponse =
                    await sendLoginRequest(context.getters.loginUsername, context.getters.loginPassword);
                successMessage('Login successful.');
                setJwt(loginResponse.headers.authorization);
                await fetchRole();
                await context.commit('setRole', getLocalRole());
                context.dispatch('clearLoginData');
                context.dispatch('postLoginReroute');
            }
            catch (e) {
                errorMessage(e.response.data);
            }
        },
        async postLoginReroute() {
            const name = getLocalRole() === 'ROLE_USER' ? 'Catalog' : 'Products';
            await router.push({name});
        },
        async clearLoginData(context) {
            context.commit('setLoginUsername', '');
            context.commit('setLoginPassword', '');
        }
    }
}
