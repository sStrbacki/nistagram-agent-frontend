import Vue from 'vue'
import Vuex from 'vuex'
import registration from './registration/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signup: registration
  }
})
