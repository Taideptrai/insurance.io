<template lang="pug">
.sign-up
  sign-up-form
</span>
</template>

<script>
import { SignUpForm } from '@/components/Auth'

export default {
  name: 'SignUp',
  components: {
    SignUpForm
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.sign-up {
  position: relative;
  height: 100vh;
  overflow-y: hidden;
}
</style>
