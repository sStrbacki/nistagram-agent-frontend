<template>
    <div>
        <b-row cols="1" align-h="center" class="mt-2">
            <b-form-input 
            type="password" 
            :state="secure" 
            placeholder="Password" 
            v-model="password">
            </b-form-input>
        </b-row>

        <transition name="fade">
            <div v-if="password != '' ">
                <b-row cols="1" align-h="center" class="mt-2" >
                    <b-form-input 
                    type="password"
                    placeholder="Confirm Password" 
                    v-model="passwordConfirmation" 
                    :state="passwordsMatch"
                    >
                    </b-form-input>
                </b-row>

                <transition name="fade">
                    <div v-if="!secure">
                        <b-row class="mt-2">
                            <label>Your password should contain: </label>
                        </b-row>

                        <b-row cols="1" >
                            <b-list-group>
                                <b-list-group-item v-bind:class="{ satisfied: !tooShort }">
                                    At least 10 characters
                                </b-list-group-item>

                                <b-list-group-item v-bind:class="{ satisfied: containsUpperLetter }">
                                    At least one uppercase letter
                                </b-list-group-item>

                                <b-list-group-item v-bind:class="{ satisfied: containsLowerLetter }">
                                    At least one lowercase letter
                                </b-list-group-item>

                                <b-list-group-item v-bind:class="{ satisfied: containsDigit }">
                                    At least one digit
                                </b-list-group-item>

                                <b-list-group-item v-bind:class="{ satisfied: containsSpecCharacter }">
                                    At least one special character
                                </b-list-group-item>
                            </b-list-group>
                        </b-row>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'PasswordField',
    data: function(){
        return {
            password:'',
            passwordConfirmation:''
        }
    },
    watch:{
        password: function(){
            this.updatePassword()
        },
        passwordConfirmation: function(){
            this.updatePassword()
        }
    },
    computed:{
        secure: function(){
            if ( this.password === "" )
                return null
            return !this.tooShort && this.containsUpperLetter && this.containsLowerLetter &&
            this.containsSpecCharacter && this.containsDigit
        },
        tooShort: function(){
            return this.password.length < 10
        },
        containsUpperLetter: function(){
            return (/^(?=.*[A-Z])/).test(this.password)
        },
        containsLowerLetter: function(){
            return (/^(?=.*[a-z])/).test(this.password)
        },
        containsDigit: function(){
            return (/^(?=.*\d)/).test(this.password)
        },
        containsSpecCharacter: function(){
            return (/\W+/).test(this.password)
        },
        passwordsMatch:function(){
            return this.password === this.passwordConfirmation
        }
    },
    methods:{
        updatePassword(){
            if(this.secure && this.passwordsMatch)
                this.$store.commit('updatePassword', this.password)
            else
                this.$store.commit('updatePassword', '')
        }
    }
}
</script>
 
<style scoped>
.satisfied{
    text-decoration: line-through;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>