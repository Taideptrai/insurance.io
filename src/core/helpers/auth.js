import { AUTH_COOKIES, TENANT_ID } from '@/core/config'

import { deleteFromCookieStore } from '@/core/helpers/storage'
import store from '@/store'

/**
 * Check if there is an active access token in storage.
 * @returns {boolean}
 */
export async function checkAuthentication() {
  const authToken = store.getters['auth/accessToken']
  const expiresAt = store.getters['auth/expiresAt']
  return Boolean(authToken) && expiresAt > Date.now()
}

export function generateUsername(username) {
  return TENANT_ID ? `${TENANT_ID}-${username}` : username
}

//remove Tenant ID of username
export function getOnlyUsername(username) {
  return username.replace(`${TENANT_ID}-`, '')
}

/**
 * Checks if user is authenticated
 * @returns {boolean}
 */
export function isUserLoggedIn() {
  return !!store.getters['auth/isUserLoggedIn']
}

/**
 * reset (clear) Authentication Tokens
 */
export function resetAuth() {
  Object.values(AUTH_COOKIES).forEach(k => deleteFromCookieStore(k))
}

/**
 * Signout Users and clear state
 */
export function signOut() {
  // TODO: clear Vuex state
  resetAuth()
}
