import { APP_ID } from '@/core/config'
import { kebab } from 'case'

/**
 * Storage Main Class, other storages should extends it
 */
export default class Storage {
  /**
   * Storage key Prefix
   * @returns {string}
   */
  static get prefix() {
    return kebab(APP_ID)
  }

  // ABSTRACT METHODS

  /**
   * Retrieve item from Storage
   * @abstract
   * @param {string} _key
   * @return {*}
   */
  async get(_key) {
    throw new TypeError('Do not call abstract method get from child.')
  }
  /**
   * Set item to Storage
   * @abstract
   * @param {string} _key
   * @param {*}
   */
  async set(_key, _value) {
    throw new TypeError('Do not call abstract method set from child.')
  }
  /**
   * Remove item from Storage
   * @abstract
   * @param {string} _key
   */
  async delete(_key) {
    throw new TypeError('Do not call abstract method delete from child.')
  }

  // DEFAULT METHODS

  /**
   * Generate a key entry, using a prefix
   * @param {string} key
   */
  key(key) {
    return `${this.prefix ? `${this.prefix}.` : ''}${key}`
  }
}
