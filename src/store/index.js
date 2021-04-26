import Vue from 'vue'
import Vuex from 'vuex'
import registration from './registration/index'
import login from './login/index'
import forgot from './forgot-password/index'
import passwordReset from './password-reset/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signup: registration,
    login: login,
    forgotPassword: forgot,
    passwordReset: passwordReset
  }
})
