<template lang="pug">
.box-login
  login-form
</template>

<script>
import { LoginForm } from '@/components/Auth'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.box-login {
  position: relative;
}
</style>
