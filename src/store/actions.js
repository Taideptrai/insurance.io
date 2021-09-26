export default {
  clear({ commit }) {
    const clearMutations = Object.keys(this._mutations).filter(m => m.endsWith('/clear'))

    clearMutations.forEach(m => commit(m))
  },
  setLoading({ commit }, payload) {
    commit(payload ? 'startLoading' : 'stopLoading')
  },
  toggleSidebar({ commit }, payload) {
    commit('setSidebarVisibility', payload)
  },
  setTitle({ commit }, payload) {
    commit('setTitle', payload)
  },
  setBackRouter({ commit }, payload) {
    commit('setBackRouter', payload)
  }
}
