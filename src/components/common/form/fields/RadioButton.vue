<template lang="pug">
.radio-group
  v-radio-group(class="mt-0" v-model="choice" :column="false")
    template(v-for="{ value, label } in choices")
      v-radio.mr-6(color="primary" :key="value" :value="value" :label="label")
</template>

<script>
export default {
  name: 'RadioButton',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: [Boolean, String, Number],
      default: null
    },
    choices: {
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
        this.$emit('input', val)
      }
    }
  }
}
</script>
