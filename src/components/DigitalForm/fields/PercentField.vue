<template lang="pug">
v-text-field.percent-field(
  class="rounded-lg"
  ref="input"
  outlined
  validate-on-blur
  type="text"
  v-model="modelValue"
  :label="label"
  :value="value"
  :rules="rules"
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
  name: 'PercentField',
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
      type: Number,
      default: null
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
    label() {
      return this.$props.title?.question || this.$props.title
    },
    rules() {
      return [
        v => !!v || this.$t('error.validation.required'),
        v => {
          const percent = +v?.replaceAll('%', '')
          if (percent < 0 || percent > 100) return this.$t('error.validation.invalid-percent')
          return true
        }
      ]
    }
  },
  methods: {
    resetValidate() {
      this.modelValue = this.modelValue?.replaceAll('%', '')
      this.isInvalid = -1 // Reset validate state
    },
    handleInput(value) {
      this.$emit('input', value)
    },
    handleBlur() {
      this.modelValue = this.modelValue ? `${this.modelValue?.replaceAll('%', '')}%` : ''
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
.percent-field {
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
