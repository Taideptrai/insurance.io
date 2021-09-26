import '@/assets/scss/main.scss'

import { DateTime, Settings } from 'luxon'
import { EventBusPlugin, VueApolloInstance, VueApolloPlugin, VuetifyInstance, VuetifyPlugin } from '@/plugins'

import App from './App.vue'
import ComponentPlugins from '@/plugins/components'
import { LOCALE } from './core/config'
import Vue from 'vue'
import i18n from './locales'
import router from './router'
import store from './store'

// Luxon config
Settings.defaultLocale = LOCALE
Settings.defaultZoneName = DateTime.local().zoneName

Vue.config.productionTip = false

Vue.use(EventBusPlugin)
Vue.use(VuetifyPlugin)
Vue.use(ComponentPlugins)

Vue.use(VueApolloPlugin)

new Vue({
  router,
  store,
  i18n,
  vuetify: VuetifyInstance,
  apolloProvider: VueApolloInstance,
  render: h => h(App)
}).$mount('#app')
