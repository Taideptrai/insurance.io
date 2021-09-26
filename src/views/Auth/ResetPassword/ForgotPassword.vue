<template lang="pug">
.forgot-password(:style="bg")
  forgot-pass(v-if="!isSentEmail" @sent-email="handleEmailSent")
  check-email(v-if="isSentEmail")
</template>

<script>
import { CheckEmail } from '@/components/Auth'
import ForgotPassBackground from '@/assets/img/backgrounds/forgot-pass-background.svg'
import { ForgotPassWordForm } from '@/components/Auth'
import { ImageField } from '@/components/common/fields'
export default {
  name: 'ForgotPassword',
  components: {
    ImageField,
    'forgot-pass': ForgotPassWordForm,
    CheckEmail
  },
  data() {
    return {
      bg: { backgroundImage: `url(${ForgotPassBackground})` },
      isSentEmail: false
    }
  },
  computed: {
    backgroundLogo() {
      return ForgotPassBackground
    }
  },
  methods: {
    handleEmailSent(val) {
      this.isSentEmail = val
    }
  }
}
</script>

<style lang="scss" scoped>
.forgot-password {
  position: relative;
  height: 100vh;
  padding-top: 224px;
  padding-right: 10%;
  background: $color-primary;
  background-repeat: no-repeat;
  background-position: 0 80px;
}
</style>
