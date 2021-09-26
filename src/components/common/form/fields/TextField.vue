<template lang="pug">
.text-field
  v-text-field(
    :name="name"
    outlined
    flat
    v-on="on"
    v-bind="bind"
    :value="value"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :rules="rules"
    :color="color"
    :hide-details="hideDetails"
    :readonly="readonly"
    @input="debounceInput"
    @blur="handleBlur"
    v-if="debounceTime > 0"
  )
    v-icon.material-icons-outlined(size="16px" height="100%" slot="prepend-inner" v-if="icon !== ''") {{ icon }}
    v-icon.material-icons-outlined(slot="append" size="16px" height="100%" v-if="appendIcon !== ''") {{ appendIcon }}
  v-text-field(
    :name="name"
    outlined
    flat
    v-on="on"
    v-bind="bind"
    :class="`${this.rules.length > 0 ? 'has-rule' : ''}`"
    :value="value"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :rules="rules"
    :color="color"
    :hide-details="hideDetails"
    :readonly="readonly"
    @input="handleInput"
    @blur="handleBlur"
    v-if="debounceTime === 0"
  )
    v-icon.material-icons-outlined(size="16px" height="100%" slot="prepend-inner" v-if="icon !== ''") {{ icon }}
    v-icon.material-icons-outlined(slot="append" size="16px" height="100%" v-if="appendIcon !== ''") {{ appendIcon }}
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'TextField',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'accent'
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: [Boolean, String],
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: ''
    },
    appendIcon: {
      type: String,
      default: ''
    },
    bind: {
      type: Object,
      default: null
    },
    on: {
      type: Object,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    debounceTime: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.debounceInput = debounce(v => {
      this.$emit('input', v)
    }, this.debounceTime)
  },
  methods: {
    handleInput(v) {
      this.$emit('input', v)
    },
    handleBlur() {
      this.$emit('blur')
    }
  }
}
</script>

<style lang="scss" scoped>
.text-field {
  ::v-deep {
    input,
    label {
      font-size: $input-font-size !important;
    }

    .v-input__prepend-inner,
    .v-input__append-inner {
      align-self: center;
      height: 100%;
      margin-top: 0 !important;

      .v-input__icon,
      .v-icon {
        width: 16px;
        min-width: 16px;
        height: 16px;
      }
    }

    .v-input__slot {
      min-height: 48px;
      border-radius: 8px;

      .v-label {
        top: 14px;
      }
    }
  }

  .has-rule {
    &.v-input--is-dirty:not(.error--text) {
      ::v-deep {
        .v-input__append-inner {
          .v-icon {
            color: $color-success;
            caret-color: $color-success;
          }
        }
      }
    }
  }
}
</style>
