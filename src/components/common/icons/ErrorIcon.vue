<template lang="pug">
v-icon(class="error--text") {{ icon }}
</template>

<script>
export default {
  name: 'ErrorIcon',
  props: {
    outlined: Boolean,
    sharp: Boolean
  },
  computed: {
    icon() {
      return this.$props.outlined ? 'error_outline' : 'error'
    }
  }
}
</script>
