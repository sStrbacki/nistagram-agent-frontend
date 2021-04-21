import api from '../../api/index'
import axios from 'axios'
import Vue from 'vue'

export default {
    state: {
        signUpData: {
            email: '',
            fullName: '',
            username: '',
            password: '',
        },
        registrationOutcome: {
            successful: undefined,
            message: undefined
        }
    },
    mutations: {
        updateEmail(state, value){
            state.signUpData.email = value
        },
        updateFullname(state, value){
            state.signUpData.fullName = value
        },
        updateUsername(state, value){
            state.signUpData.username = value
        },
        updatePassword(state, value){
            state.signUpData.password = value
        }
    },
    actions: {
        register(context){
            axios.post(api.users.root, context.state.signUpData)
            .then(res => {
                Vue.notify({
                    group: 'notification',
                    text: res.data,
                    type: 'success'
                })
            })
            .catch( err => {
                console.log(err.response.data)
                Vue.notify({
                    group: 'notification',
                    text: err.response.data,
                    type: 'error'
                })
            } )
        }
    }
}