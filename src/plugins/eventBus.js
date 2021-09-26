import { eventBus } from '@/core/helpers/eventBus'

/**
 * Add Vue support to event bus.
 * Example: this.$bus.$on / this.$bus.$off / this.$bus.$emit
 * @param {Vue} instance
 */
function install(instance) {
  const bus = eventBus()

  Object.defineProperty(instance.prototype, '$bus', {
    get() {
      return bus
    }
  })
}

export default { install }
