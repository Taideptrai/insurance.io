<template lang="pug">
.create-new-pass(:style="bg")
  verify(@verify="handleHadVerify" v-if="!isVerify")
  .create-new-pass__form
    create-password-form(v-if="isVerify")
</template>

<script>
import { CreatePasswordForm } from '@/components/Auth'
import ForgotPassBackground from '@/assets/img/backgrounds/login-background.svg'
import { ImageField } from '@/components/common/fields'
import { Verify } from '@/components/Auth'

export default {
  name: 'CreateNewPass',
  components: {
    ImageField,
    Verify,
    CreatePasswordForm
  },
  data() {
    return {
      bg: { backgroundImage: `url(${ForgotPassBackground})` },
      isVerify: false,
      userInfo: {}
    }
  },
  computed: {
    backgroundLogo() {
      return ForgotPassBackground
    }
  },
  methods: {
    handleHadVerify(val) {
      this.isVerify = val
    }
  }
}
</script>

<style lang="scss" scoped>
.create-new-pass {
  position: relative;
  height: 100vh;
  padding-top: 50px;
  padding-left: 10%;
  background: $color-primary;
  background-repeat: no-repeat;
  background-position: 100% 80px;

  &__form {
    padding-top: 200px;
  }
}
</style>
