<template lang="pug">
v-text-field.text-field-static(
  class="rounded-lg"
  outlined
  validate-on-blur
  :ref="name"
  :name="name"
  :type="type"
  :placeholder="placeholder"
  :label="label"
  :value="value"
  :rules="rules"
  :readonly="readonly"
  :disabled="disabled"
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
  name: 'TextFieldStatic',
  components: {
    ErrorIcon,
    CheckedIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
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
    return {
      icons: ['ErrorIcon', 'CheckedIcon'],
      isInvalid: -1
    }
  },
  computed: {
    appendIcon() {
      if (this.isInvalid === -1) {
        return null
      }

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
