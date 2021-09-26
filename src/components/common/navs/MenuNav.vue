<template lang="pug">
v-app-bar.appbar.app-container(color="#fcfcfc" app flat elevate-on-scroll prominent)
  .d-flex.align-start.flex-column
    .link
      router-link.td-none(:to="backRouter.router" v-if="backRouter.router")
        v-icon.mr-2(size="13px" color="accent" v-if="backRouter.title && backRouter.title.length > 0") west
        span.link.darkgrey--text {{ backRouter.title }}
    h1.mytitle.accent--text {{ title }}
  v-spacer
  v-badge.mr-6(content="14" color="accent" overlap size="10px")
    v-icon.material-icons-outlined notifications
  v-avatar.avatar-rounded(size="40px")
    img(:src="emptyAvatar" alt="emptyAvatar")
</template>

<script>
import EmptyAvatar from '@/assets/img/empty-avatar.svg'
import { mapGetters } from 'vuex'

export default {
  name: 'MenuNav',
  computed: {
    emptyAvatar() {
      return EmptyAvatar
    },
    home() {
      return { name: 'home' }
    },
    ...mapGetters(['title', 'backRouter'])
  }
}
</script>

<style lang="scss" scoped>
.appbar {
  ::v-deep {
    .v-toolbar__content {
      align-items: center !important;
      padding: 0;
    }
  }
}

.link {
  font-size: 12px;
  letter-spacing: 0;
}

.mytitle {
  font-size: 32px;
  line-height: 40px;
}

.avatar-rounded {
  border-radius: 12px;
}
</style>
