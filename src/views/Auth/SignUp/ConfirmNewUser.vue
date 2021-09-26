<template lang="pug">
.confirm-new-user(class="d-flex justify-center align-center")
  confirm-email
</template>

<script>
import { ConfirmEmail } from '@/components/Auth'
export default {
  name: 'ConfirmNewUser',
  components: {
    ConfirmEmail
  }
}
</script>

<style lang="scss" scoped>
.confirm-new-user {
  position: relative;
  height: 100vh;
  background: $color-primary;
}
</style>
