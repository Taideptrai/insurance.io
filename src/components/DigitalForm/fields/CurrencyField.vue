<template lang="pug">
.currency-field
  v-text-field(
    class="rounded-lg"
    ref="input"
    type="text"
    outlined
    validate-on-blur
    :prefix="prefix"
    :label="title"
    :rules="rules"
    :class="className"
    @focus="resetValidate"
    @blur="handleBlur"
    v-model="modelValue"
  )
    template(#append)
      component(:is="appendIcon" outlined)
</template>

<script>
import { CheckedIcon, ErrorIcon } from '@/components/common/icons'
export default {
  name: 'CurrencyField',
  components: {
    ErrorIcon,
    CheckedIcon
  },
  inject: ['update'],
  props: {
    name: {
      type: String,
      required: true
    },
    properties: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: null
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
      prefix: null,
      changed: false,
      valid: false
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.formatData(this.$props.value).replace('NaN', '')
      },
      set(val) {
        this.changed = true
        this.update(this.$props.name, val)
      }
    },
    appendIcon() {
      if (this.isInvalid === -1) return null
      return this.icons[this.isInvalid]
    },
    formatter() {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: this.$props.properties.currency
      })
    },
    rules() {
      return [
        v => !!v || this.$t('error.validation.required'),
        () => this.valid || this.$t('error.validation.invalid-currency')
      ]
    },
    className() {
      if (this.$props.classes.length === 0) return ''
      return this.$props.classes.join(' ')
    }
  },
  methods: {
    resetValidate() {
      this.isInvalid = -1 // Reset validate state
      if (!this.modelValue) {
        this.prefix = this.$props.properties.currency
      }
    },
    handleBlur() {
      this.prefix = null

      if (this.changed) {
        this.changed = false
        const currencyStr = this.formatData(null).replace('NaN', '')
        const intRegex = /^\d+(?:\.\d{0,2})$/
        let num = this.modelValue.replace(currencyStr, '').replace(',', '')

        if (!num.includes('.')) {
          num = `${num}.00`
        }

        if (intRegex.test(num)) {
          this.valid = true
          this.modelValue = this.formatData(num)
        } else {
          this.valid = false
        }
      }

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
.currency-field {
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
