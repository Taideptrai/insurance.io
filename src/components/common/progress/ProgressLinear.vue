<template lang="pug">
v-progress-linear(:value="value" :color="color" :background-color="backroundColor" :height="height")
  span.text(:class="{ 'white--text': value == '100' }") {{ value }} %
</template>

<script>
export default {
  name: 'ProgressLinear',
  props: {
    value: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    backroundColor: {
      type: String,
      default: '#F5F5F5'
    },
    height: {
      type: String,
      default: '19'
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  color: $color-dark-grey-1;
  font-size: 12px;
}
</style>
