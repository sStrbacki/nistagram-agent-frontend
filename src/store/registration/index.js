import api from '../../api/index'
import axios from 'axios'

export default {
    state: {
        signUpData:{
            email: '',
            fullName: '',
            username: '',
            password: '',
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
        }
    }
}