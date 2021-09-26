import Vue from 'vue'

export function toastedError(message) {
  Vue.toasted.error(message, {
    icon: 'error'
  })
}

export function toastedSuccess(message) {
  Vue.toasted.success(message, {
    icon: 'check'
  })
}
