<template lang="pug">
.loading(class="text-center my-10")
  v-progress-circular(:size="size" :width="width" :color="color" :indeterminate="indeterminate")
</template>

<script>
export default {
  name: 'DefaultLoading',
  props: {
    size: {
      type: Number,
      default: 40
    },
    width: {
      type: Number,
      default: 4
    },
    indeterminate: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'accent'
    }
  }
}
</script>
