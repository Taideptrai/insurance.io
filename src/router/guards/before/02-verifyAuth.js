import store from '@/store'
import { t } from '@/core/helpers/i18n'

/**
 * Navigation guard to verify user authentication.
 * @param {Object} to
 * @param {Object} from
 * @param {Function} next
 * @returns {Function} Next route
 */
export default async function vertifyAuth(_to, _from, next) {
  if (!store.getters['auth/isAuthRequired'] || store.getters['auth/isAuthVerified']) {
    return next()
  }

  try {
    await store.dispatch('auth/verify')
  } catch (err) {
    const { status = null } = err?.response || {}

    store.dispatch('alert/error', t(status === 401 ? 'error.auth.validate-error' : 'error.general'))
    next({ name: 'auth.logout' })
  }
  next()
}
