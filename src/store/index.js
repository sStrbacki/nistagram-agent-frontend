import Vue from 'vue'
import Vuex from 'vuex'
import signup from './registration/index'
import login from './login/index'
import passwordReset from './password-reset/index'
import catalog from './catalog/index'
import shoppingCart from './shopping-cart/index'
import products from './products/index'
import campaign from './campaign/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signup,
    login,
    passwordReset,
    catalog,
    shoppingCart,
    products,
    campaign
  }
})
