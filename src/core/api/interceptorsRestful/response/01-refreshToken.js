import API from '@/core/api/main'
import router from '@/router'
import store from '@/store'
import { t } from '@/core/helpers/i18n'

const BLACKLIST = ['/spa/token/', '/spa/token/verify/', '/spa/token/refresh/']

export default [
  response => response,
  async function (err) {
    const { code = null } = err?.response.data || {}
    if (code === 'token_not_valid') {
      const { config } = err
      const { __isRetryRequest, url } = config

      if (!BLACKLIST.includes(url)) {
        if (!__isRetryRequest) {
          const instance = new API()

          await store.dispatch('auth/refreshTokensRestful', true)
          await store.dispatch('auth/refreshTokens', true)
          const newConfig = { ...config, __isRetryRequest: true }
          return setTimeout(() => instance.requestRest(newConfig), 300)
        }

        store.dispatch('alert/error', t('error.auth.not-valid'))

        return router.push({ name: 'auth.logout' })
      } else {
        router.push({ name: 'auth.logout' })
      }
    }

    return Promise.reject(err)
  }
]
