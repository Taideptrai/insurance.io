<template lang="pug">
v-app.app
  left-nav(v-if="isUserLoggedIn")
  menu-nav(v-if="isUserLoggedIn")
  v-main.main-bg
    .app-container(:class="hasMargin")
      router-view
  global-alert
  overlay-loading
</template>

<script>
import { LeftNav, MenuNav } from '@/components/common/navs'

import { Alert } from '@/components/common/notification'
import { OverlayLoading } from '@/components/common/loading'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    MenuNav,
    LeftNav,
    GlobalAlert: Alert,
    OverlayLoading
  },
  data: function () {
    return {
      visibilityObserver: null,
      authPolling: null
    }
  },
  computed: {
    ...mapGetters('auth', ['isUserLoggedIn']),
    hasMargin() {
      return this.isUserLoggedIn ? '' : 'ma-0'
    }
  },
  created() {
    this.visibilityObserver = () => {
      const { hidden } = document
      this.$store.dispatch('auth/togglePollingRefresh', !hidden)
    }
    document.addEventListener('visibilitychange', this.visibilityObserver, false)
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.visibilityObserver)
  }
}
</script>

<style lang="scss" scoped>
.main-bg {
  background: $color-background;
}
</style>
