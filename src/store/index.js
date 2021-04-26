import Vue from 'vue'
import Vuex from 'vuex'
import registration from './registration/index'
import login from './login/index'
import forgot from './forgot-password/index'
import passwordReset from './password-reset/index'
import catalog from './catalog/index'
import shoppingCart from './shopping-cart/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signup: registration,
    login: login,
    forgotPassword: forgot,
    passwordReset: passwordReset,
    catalog: catalog,
    shoppingCart: shoppingCart
  }
})
