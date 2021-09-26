<template lang="pug">
v-text-field.text-field(
  outlined
  validate-on-blur
  class="rounded-lg"
  :ref="name"
  :name="name"
  :label="title"
  :value="value"
  @input="handleInput"
  @blur="handleBlur"
  @focus="resetValidate"
)
  template(#append)
    component(:is="appendIcon" outlined)
</template>

<script>
import { CheckedIcon, ErrorIcon } from '@/components/common/icons'
export default {
  name: 'TextField',
  components: {
    ErrorIcon,
    CheckedIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      icons: ['ErrorIcon', 'CheckedIcon'],
      isInvalid: -1
    }
  },
  computed: {
    name() {
      return this.$props.code || ''
    },
    appendIcon() {
      if (this.isInvalid === -1) return null
      return this.icons[this.isInvalid]
    }
  },
  methods: {
    resetValidate() {
      this.isInvalid = -1 // Reset validate state
    },
    handleInput(value) {
      this.$emit('input', value)
    },
    handleBlur() {
      // Wait for validate frist
      this.$nextTick(() => {
        this.isInvalid = this.$refs[this.name]?.hasError ? 0 : 1
      })
    }
  }
}
</script>
