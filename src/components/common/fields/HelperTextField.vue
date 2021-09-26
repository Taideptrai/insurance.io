<template lang="pug">
.helper-text
  span {{ text }}
  v-icon(class="ml-1") {{ icon }}
</template>

<script>
export default {
  name: 'HelperTextField',
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'help_outline'
    }
  }
}
</script>

<style lang="scss" scoped>
.helper-text {
  display: flex;
  align-items: center;
  opacity: 0.5;

  &:hover {
    opacity: 0.75;
  }

  span,
  .v-icon {
    font-size: rem(13px);
    cursor: pointer;
  }
}
</style>
