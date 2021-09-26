<template lang="pug">
.logout
</template>

<script>
export default {
  name: 'Logout',
  created() {
    this.$store.dispatch('auth/logout')
    this.$store.dispatch('clear')
    this.$store.dispatch('setTitle', '')
    this.$store.dispatch('setBackRouter', {})
    this.$router.push({ name: 'auth' })
  }
}
</script>
