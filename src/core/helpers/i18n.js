import i18n from '@/locales'

/**
 * Localize the locale message of key.
 * @param {string} key
 */
export function t(key) {
  return i18n.t(key)
}

/**
 * Pluralization of a locale message
 * @see https://kazupon.github.io/vue-i18n/guide/pluralization.html
 * @param {string} key
 * @param {string|number} choice
 * @param {string|number|Array|Object=null} values
 * @return {string}
 */
export function tc(key, choice, values = null) {
  return i18n.tc(key, choice, values)
}

/**
 * Check whether key exists. In Vue instance,
 * If not specified component locale messages, check with global locale messages.
 * @param {string} key
 * @return {boolean}
 */
export function te(key) {
  return !!i18n.te(key)
}

// TODO: add other vue-i18n methods
