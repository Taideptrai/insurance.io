<template lang="pug">
v-text-field.positive-number(
  ref="input"
  outlined
  validate-on-blur
  type="number"
  v-model="modelValue"
  :label="title"
  :value="value"
  :rules="rules"
  :class="className"
  @input="handleInput"
  @focus="resetValidate"
  @blur="handleBlur"
)
  template(#append)
    component(:is="appendIcon" outlined)
</template>

<script>
import { CheckedIcon, ErrorIcon } from '@/components/common/icons'
export default {
  name: 'PositiveNumber',
  components: {
    ErrorIcon,
    CheckedIcon
  },
  props: {
    title: {
      type: String,
      default: () => {}
    },
    value: {
      type: String,
      default: ''
    },
    classes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      icons: ['ErrorIcon', 'CheckedIcon'],
      isInvalid: -1,
      modelValue: null
    }
  },
  computed: {
    appendIcon() {
      if (this.isInvalid === -1) return null
      return this.icons[this.isInvalid]
    },
    rules() {
      return [
        v => !!v || this.$t('error.validation.required'),
        v => v > 0 || this.$t('error.validation.invalid-positive-number')
      ]
    },
    className() {
      if (this.$props.classes.length === 0) return ''
      return this.$props.classes.join(' ') + 'rounded-lg'
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
        this.isInvalid = this.$refs.input?.hasError ? 0 : 1
      })
    },
    formatData(num) {
      return this.formatter.format(parseFloat(num))
    }
  }
}
</script>

<style lang="scss" scoped>
.positive-number {
  ::v-deep {
    .v-label {
      &.v-label--active {
        padding-right: 2px;
        color: #323232;
        font-weight: 500;
        font-size: rem(14px);
        background: #fff;
        transform: translateY(-28px) scale(1);
      }
    }
  }
}
</style>
