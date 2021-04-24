import Vue from 'vue'
import Vuex from 'vuex'
import registration from './registration/index'
import login from './login/index'
import catalog from './catalog/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signup: registration,
    login: login,
    catalog: catalog
  }
})
