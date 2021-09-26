<template lang="pug">
.switch-field
  v-switch(class="mt-0 mb-1" color="primary" :class="{ active: switchValue === true }" :label="title" v-model="switchValue")
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    switchValue: {
      get() {
        return this.$props.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
