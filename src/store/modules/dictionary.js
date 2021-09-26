import { chain, merge } from 'lodash'

import { Dictionary } from '@/core/api'

export default {
  namespaced: true,
  state: {
    dictionaries: {}
  },
  mutations: {
    setDictionaries(state, payload) {
      state.dictionaries = merge(state.dictionaries, payload)
    }
  },
  actions: {
    async init({ commit }) {
      let data = await Dictionary.getCommonDictionaries()
      commit('setDictionaries', data)
    },
    getDictionary({ state }, { dictionary }) {
      return chain(state.dictionaries)
        .get([dictionary, 'edges'])
        .map(({ node }) => ({ label: node.label, value: node.code }))
        .value()
    }
  }
}
