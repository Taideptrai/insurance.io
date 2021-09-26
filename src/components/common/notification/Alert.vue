<template lang="pug">
.alert(@click="handleClose" v-if="hasAlert")
  v-snackbar(ref="component" top :value="hasAlert" :color="type" multi-line @input="handleClose")
    v-icon {{ icon }}
    span.alert__message {{ message }}
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Alert',
  computed: {
    ...mapGetters('alert', ['type', 'message', 'hasAlert']),
    icon() {
      return this.type == 'success' ? 'done' : 'error_outline'
    }
  },
  methods: {
    async handleClose() {
      await this.$nextTick()
      this.$store.dispatch('alert/clear')
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  position: relative;

  .alert__message {
    position: absolute;
    top: 23px;
    left: 50px;
  }
}
</style>
