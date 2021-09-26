<template lang="pug">
.select-field
  v-select(class="rounded-lg" color="primary" item-text="label" outlined v-model="choice" :items="items" :label="title")
</template>

<script>
export default {
  name: 'SelectField',
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
      type: [Boolean, String, Number],
      default: null
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    choice: {
      get() {
        return this.$props.value
      },
      set(val) {
        this.$emit('input', val.value)
      }
    }
  }
}
</script>
