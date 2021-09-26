import { API_HOST, ENVIRONMENT, SECURE_HOST } from '@/core/config'

/**
 * Retrive API URL
 * @returns {string}
 */
export function getAPIHost() {
  return `http${SECURE_HOST ? 's' : ''}://${API_HOST}`
}

/**
 * Retrive API URL
 * @returns {string}
 */
export function getFile(url) {
  return `http${SECURE_HOST ? 's' : ''}://${API_HOST}/media/${url}`
}

/**
 * Check if environment is "development"
 * @returns {boolean}
 */
export function isDevelopment() {
  return ENVIRONMENT === 'development'
}

/**
 * Check if environment is "production"
 * @returns {boolean}
 */
export function isProduction() {
  return ENVIRONMENT === 'production'
}

export function isTest() {
  return ENVIRONMENT === 'test'
}
