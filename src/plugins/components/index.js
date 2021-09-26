import VueDragscroll from 'vue-dragscroll'
import VueSignature from 'vue-signature-pad'
import VueToasted from './vue-toasted'
import VuetifyDialog from './vuetify-dialog'

export default {
  install(Vue) {
    Vue.use(VueToasted)
    Vue.use(VuetifyDialog)
    Vue.use(VueSignature)
    Vue.use(VueDragscroll)
  }
}
