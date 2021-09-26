export default {
  namespaced: true,
  state: {
    type: null,
    message: null
  },
  getters: {
    hasAlert({ message, type }) {
      return !!type && !!message
    },
    type({ type }) {
      return type
    },
    message({ message }) {
      return message
    }
  },
  actions: {
    success({ commit }, message) {
      commit('set', { type: 'success', message })
    },
    error({ commit }, message) {
      commit('set', { type: 'error', message })
    },
    clear({ commit }) {
      commit('clear')
    }
  },
  mutations: {
    set(state, { message, type }) {
      state.message = null
      // setTimeout needed to animate when message changes, as per MD spec snackbars should't stack, but instead close and reopen.
      // https://github.com/vuetifyjs/vuetify/issues/2384
      setTimeout(() => {
        state.message = message
        state.type = type
      }, 250)
    },
    clear(state) {
      state.type = null
      state.message = null
    }
  }
}
