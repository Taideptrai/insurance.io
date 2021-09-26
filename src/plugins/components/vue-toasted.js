import { APP_NOTIFICATION_DURATION } from '@/core/config'
import Toasted from 'vue-toasted'

export default {
  install(Vue) {
    Vue.use(Toasted, {
      position: 'top-center',
      duration: APP_NOTIFICATION_DURATION, // 5 seconds
      keepOnHover: true,
      iconPack: 'material'
    })
  }
}
