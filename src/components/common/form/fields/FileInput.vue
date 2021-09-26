<template lang="pug">
v-file-input.rounded-lg(
  :value="value"
  :accept="accept"
  :label="label"
  :multiple="multiple"
  :show-size="showSize"
  :outlined="outlined"
  :readonly="readonly"
  :disabled="disabled"
  dense
  height="48"
  @change="handleChange"
)
  template(#selection="{text}")
    v-chip(small label color="primary") {{ text }}
</template>

<script>
export default {
  name: 'FileInput',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: () => []
    },
    accept: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    showSize: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    handleChange(files) {
      this.$emit('change', files)
    }
  }
}
</script>
