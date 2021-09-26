<template lang="pug">
router-view
</template>

<script>
export default {
  name: 'BaseProject',
  created() {
    this.$store.dispatch('project/loadAdvisorInfos')
  }
}
</script>
