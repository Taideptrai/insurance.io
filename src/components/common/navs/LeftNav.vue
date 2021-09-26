<template lang="pug">
v-navigation-drawer.pb-6(app color="grey lighten-4" mini-variant mini-variant-width="64")
  v-list.pa-0
    v-list-item(:to="home" link)
      v-list-item-icon
        image-field(:src="menuLogo" width="32")
      v-list-item-title ""
    v-list-item.custom-icon(:to="home" link exact :class="isActiveProject")
      v-list-item-icon
        v-icon.material-icons-outlined(size="24" color="accent") dashboard
      v-list-item-title ""
  template(#append)
    .text-center
      router-link.td-none(:to="logout")
        v-icon.material-icons-outlined(size="24" color="darkgrey") exit_to_app
</template>

<script>
import { ImageField } from '@/components/common/fields'
import MenuLogo from '@/assets/img/menu-logo.svg'

export default {
  name: 'LeftNav',
  components: {
    ImageField
  },
  computed: {
    isActiveProject() {
      return (this.$route.name || '').indexOf('project') > -1 ? 'v-list-item--active' : ''
    },
    home() {
      return { name: 'home' }
    },
    logout() {
      return { name: 'auth.logout' }
    },
    menuLogo() {
      return MenuLogo
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item {
  &:before {
    opacity: 0 !important;
  }
  padding: 0 12px;

  &--active {
    &:before {
      opacity: 0 !important;
    }
  }
}

.custom-icon {
  &.v-list-item {
    &--active {
      .v-list-item__icon {
        display: flex;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgb(0 190 217 / 20%);
        border-radius: 8px;
      }
    }
  }
}
</style>
