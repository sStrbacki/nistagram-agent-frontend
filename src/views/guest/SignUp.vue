<template>
    <b-container>
        <b-row cols="2" align-h="center">
            <div class="reg-form" >
                <b-row align-h="center" class="mb-4"> 
                    <h1>Create Account</h1>
                </b-row>

                <b-row cols="1" align-h="center">
                    <b-form-input placeholder="Email" :state="emailValid" v-model="email"></b-form-input>
                </b-row>

                <b-row cols="1" align-h="center" class="mt-2">
                    <b-form-input placeholder="Full Name" :state="fullNameValid" v-model="fullName"></b-form-input>
                </b-row>

                <b-row cols="1" align-h="center" class="mt-2">
                    <b-form-input placeholder="Username" :state="usernameValid" v-model="username"></b-form-input>
                </b-row>

               <password-field type="signup"></password-field>

                <b-row cols="1" align-h="center" class="mt-4">
                    <b-button :disabled="!dataValid" @click="register"> Sing up </b-button>
                </b-row>

                <b-row align-h="end">
                    Already have an account?
                    <b-link class="ml-1" :to="{ name: 'Login' }">Sign in</b-link>
                </b-row>

            </div>
        </b-row>
    </b-container>
</template>

<script>

import PasswordField from '../../components/sign-up/PasswordField'

export default {
    name : 'SignUp',
    components:{ PasswordField },
    computed: {
        email: {
            get(){
                return this.$store.state.signup.signUpData.email
            },
            set(value){
                this.$store.commit('updateEmail',value)
            }
        },
        password: {
            get(){
                return this.$store.state.signup.signUpData.password
            }
        },
        fullName:{
            get(){
                return this.$store.state.signup.signUpData.fullName
            },
            set(value){
                this.$store.commit('updateFullname',value)
            }
        },
        username:{
            get(){
                return this.$store.state.signup.signUpData.username
            },
            set(value){
                this.$store.commit('updateUsername',value)
            }
        },
        emailValid: function(){
            if(this.email === '')
                return null
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            return re.test(this.email)
        },
        fullNameValid: function(){
            if(this.fullName === '')
                return null
            return (/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/).test(this.fullName)
        },
        usernameValid: function(){
            if(this.username === '')
                return null
            return (/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/).test(this.username)
        },
        passwordValid: function(){
            return this.$store.state.signup.signUpData.password !== ''
        },
        dataValid:function(){
            return this.emailValid && this.fullNameValid && this.usernameValid && this.passwordValid
        }
    },
    methods:{
        register:function(){
            this.$store.dispatch('register')
        }
    }
}
</script>

<style scoped>
.reg-form{
    margin-top: 5em;
    color: rgb(36, 35, 35);
    background-color: rgb(224, 220, 220);
    padding: 3em;
    border-radius: 6px;
    box-shadow: 5px 5px 10px #1d1d1d;
}
.notif-text {
    margin-top: 0.3em;
}
.sub-notif-text {
    margin-left: 2.5em;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>