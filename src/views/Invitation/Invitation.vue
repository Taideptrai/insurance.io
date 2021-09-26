<template lang="pug">
.invitation(:style="bg")
  create-new-user
</span>
</template>

<script>
import { CreateNewUser } from '@/components/Invitation'
import ImgBackground from '@/assets/img/backgrounds/login-background-image.svg'

export default {
  name: 'Invitation',
  components: {
    CreateNewUser
  },
  data() {
    return {
      bg: { backgroundImage: `url(${ImgBackground})` },
      dialog: false
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.invitation {
  position: relative;
  height: 100vh;
  padding-top: 137px;
  padding-left: 160px;
  overflow-y: hidden;
  color: $color-dark-grey;
  background: $color-primary;
  background-repeat: no-repeat;
  background-position: right 80px;
}
</style>
