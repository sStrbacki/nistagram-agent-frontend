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
        register(){
            //TODO : send HTTP Post to the server
            console.log('REGISTERED')
        }
    }
}