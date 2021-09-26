import VuetifyDialog from 'vuetify-dialog'
import vuetify from '@/plugins/vuetify'

export default {
  install(Vue) {
    Vue.use(VuetifyDialog, {
      context: {
        vuetify
      },
      info: {
        icon: false,
        spacer: true,
        class: 'confirm-dialog'
      }
    })
  }
}
