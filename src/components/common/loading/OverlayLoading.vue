<template lang="pug">
.overlay-loading
  v-overlay(:value="isLoading" :z-index="10")
    v-progress-circular(:size="50" color="accent" indeterminate)
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OverlayLoading',
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>
