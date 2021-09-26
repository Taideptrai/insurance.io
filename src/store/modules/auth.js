import { Auth } from '@/core/api'
import { REFRESH_TOKENS_INTERVAL } from '@/core/config'
import { getOnlyUsername } from '@/core/helpers/auth'

export default {
  namespaced: true,
  state: {
    isGuestAccount: true,
    isAuthRequired: false,
    isAuthVerified: false,
    isUserLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    pollingRefresh: null,
    accessTokenRestful: null,
    refreshTokenRestful: null,
    expiresAtRestful: null,
    pollingRefreshRestful: null,
    username: null
  },
  getters: {
    accessToken({ accessToken }) {
      return accessToken
    },
    accessTokenRestful({ accessTokenRestful }) {
      return accessTokenRestful
    },
    refreshToken({ refreshToken }) {
      return refreshToken
    },
    refreshTokenRestful({ refreshTokenRestful }) {
      return refreshTokenRestful
    },
    expiresAt({ expiresAt }) {
      return expiresAt
    },
    expiresAtRestful({ expiresAtRestful }) {
      return expiresAtRestful
    },
    isAuthRequired({ isAuthRequired }) {
      return isAuthRequired
    },
    isAuthVerified({ isAuthVerified }) {
      return isAuthVerified
    },
    isUserLoggedIn({ isUserLoggedIn }) {
      return isUserLoggedIn
    },
    pollingRefresh({ pollingRefresh }) {
      return pollingRefresh
    },
    isGuestAccount({ isGuestAccount }) {
      return isGuestAccount
    },
    username({ username }) {
      return username
    }
  },
  actions: {
    requiresAuth({ commit }, payload) {
      commit('setRequiredAuth', payload)
    },
    async login({ commit, dispatch }, params = {}) {
      const { password, username } = params

      //login with GraphQL
      const { tokenAuth: response } = await Auth.token(username, password)
      const { payload, refreshExpiresIn, refreshToken, token } = response
      commit('setTokens', { token, refreshToken, refreshExpiresIn })

      //get only username
      const onlyUsername = getOnlyUsername(payload.username)
      commit('setUsername', onlyUsername)

      // //login with Restful API
      const { access, refresh } = await Auth.tokenRest(username, password)
      commit('setTokensRestful', { access, refresh })
      dispatch('setAuthVerified')
    },

    async signUp({ commit: _commit }, payload = {}) {
      const { signUp } = await Auth.signUp(payload)
      return signUp
    },
    async confirmEmail({ commit: _commit }, payload = {}) {
      const { confirmEmail } = await Auth.confirmEmail(payload)
      return confirmEmail
    },

    logout({ commit }) {
      commit('clearTokens')
    },
    async toggleUserLoggedIn({ commit }, payload) {
      commit('setUserLoggedIn', payload)
    },
    async refreshTokens({ commit, dispatch, getters }, force = false) {
      const expiresAt = Number(getters.expiresAt)
      const currentRefreshToken = getters.refreshToken
      if (!currentRefreshToken || (expiresAt > Date.now() && !force)) {
        return
      }
      const { refreshToken: response } = await Auth.refreshTokens(currentRefreshToken)
      const { refreshExpiresIn, refreshToken, token } = response
      commit('setTokens', { refreshExpiresIn, refreshToken, token })

      dispatch('setAuthVerified')
    },
    async refreshTokensRestful({ commit, dispatch, getters }, force = false) {
      const expiresAt = Number(getters.expiresAtRestful)
      const currentRefreshTokenRestful = getters.refreshTokenRestful
      if (!currentRefreshTokenRestful || (expiresAt > Date.now() && !force)) {
        return
      }

      const responseRestful = await Auth.refreshTokensRestful(currentRefreshTokenRestful)
      const { access, refresh } = responseRestful
      commit('setTokensRestful', { access, refresh })

      dispatch('setAuthVerified')
    },
    async verify({ dispatch, state }) {
      if (!state.accessToken) {
        return
      }

      await Auth.verifyToken(state.accessToken)
      dispatch('setAuthVerified')
    },
    setAuthVerified({ commit, dispatch }) {
      commit('setAuthVerified', true)

      dispatch('togglePollingRefresh', true)
      // Init - refresh dictionary store after each time AuthVerified
      dispatch('dictionary/init', null, { root: true })
    },
    togglePollingRefresh({ commit, dispatch, getters }, payload) {
      let polling = null
      if (payload) {
        // calculate polling time to refresh JWT tokens automatically
        // timer will be set to (Time to expire + 5%)

        const expiration = (getters.expiresAt - Date.now()) / 1000 //seconds
        const pollingTime = expiration + Math.round(expiration * 0.05)
        polling = setTimeout(() => {
          dispatch('refreshTokens')
          dispatch('refreshTokensRestful')
        }, pollingTime)
      }

      commit('setpollingRefresh', polling)
    },
    async resetPassword({ commit: _commit }, payload) {
      const { passwordReset } = await Auth.resetPassword(payload)
      return passwordReset
    },
    async changePassword({ commit: _commit }, payload) {
      const { passwordChange } = await Auth.changePassword(payload)
      return passwordChange
    }
  },
  mutations: {
    setTokens(state, { refreshExpiresIn, refreshToken, token }) {
      const expiresInSecs = Number(refreshExpiresIn) || REFRESH_TOKENS_INTERVAL
      const expiresAt = expiresInSecs * 1000

      state.isUserLoggedIn = true
      state.accessToken = token
      state.expiresAt = expiresAt
      state.refreshToken = refreshToken
    },
    setTokensRestful(state, { access, refresh }) {
      const expiresInSecs = Math.floor(Number(REFRESH_TOKENS_INTERVAL))
      const expiresAt = Date.now() + expiresInSecs * 1000

      state.accessTokenRestful = access
      state.expiresAtRestful = expiresAt
      state.refreshTokenRestful = refresh
    },

    clearTokens(state) {
      // signOut()
      clearTimeout(state.pollingRefresh)

      state.isUserLoggedIn = false
      state.isAuthVerified = false

      state.accessToken = null
      state.refreshToken = null
      state.expiresAt = null
      state.pollingRefresh = null

      state.accessTokenRestful = null
      state.refreshTokenRestful = null
    },
    setUserLoggedIn(state, flag) {
      state.isUserLoggedIn = flag
    },
    setRequiredAuth(state, flag) {
      state.isAuthRequired = flag
    },
    setAuthVerified(state, flag) {
      state.isAuthVerified = flag
    },
    setpollingRefresh(state, timer) {
      if (!timer) {
        clearTimeout(state.pollingRefresh)
      }

      state.pollingRefresh = timer
    },
    setUsername(state, username) {
      state.username = username
    }
  }
}
