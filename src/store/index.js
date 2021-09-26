import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    sidebarVisible: false,
    uploadProgress: 0,
    title: '',
    backRouter: {
      router: {},
      title: ''
    }
  },
  getters,
  mutations,
  actions,
  modules
})
