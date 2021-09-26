import Vue from 'vue'

/**
 * Create Vue Event Bus instance.
 * Basically it is a new instance of Vue, just to handle with events.
 * @returns {Vue}
 */
export const eventBus = () => {
  const instance = new Vue()

  return instance
}

/**
 * Trigger event bus event
 * @param {string} event
 * @param  {...any} args
 */
export const triggerEventBus = (event, ...args) => {
  const bus = eventBus()

  bus.$bus.$emit(event, ...args)
}
