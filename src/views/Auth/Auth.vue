<template lang="pug">
v-container.auth(class="pa-0" fluid)
  router-view
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style lang="scss" scoped>
.auth {
  position: relative;
}
</style>
