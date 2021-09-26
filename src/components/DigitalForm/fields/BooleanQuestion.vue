<template lang="pug">
.boolean-question
  switch-button(v-if="isSwitcher" v-model="modelValue" name="choice" :title="title")
  template(v-else)
    h5(v-if="title" :class="className") {{ title }}
    radio-button(class="mt-0" v-model="modelValue" name="choice" :choices="choices")
</template>

<script>
import { RadioButton, SwitchButton } from '@/components/common/form/fields'

import { HelperTextField } from '@/components/common/fields'
import { isNumber } from 'lodash'

export default {
  name: 'BooleanQuestion',
  components: {
    RadioButton,
    SwitchButton,
    HelperTextField
  },
  inject: ['update'],
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    classes: {
      type: Array,
      default: () => []
    },
    properties: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: null
    }
  },
  data() {
    return {
      choices: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ]
    }
  },
  computed: {
    modelValue: {
      get() {
        // For case value is zero number
        return isNumber(this.$props.value?.choice) ? this.$props.value?.choice : null
      },
      set(val) {
        this.update(this.$props.name, { choice: val })
      }
    },
    className() {
      return this.$props.classes?.join(' ') || null
    },
    dictionaryName() {
      return this.$props.properties?.dictionaryName || null
    },
    isSwitcher() {
      return this.dictionaryName === 'switcher'
    }
  },
  mounted() {
    this.isSwitcher || (this.dictionaryName && this.getChoices())
  },
  methods: {
    async getChoices() {
      this.choices = await this.$store.dispatch('dictionary/getDictionary', { dictionary: this.dictionaryName })
    }
  }
}
</script>
<style lang="scss" scoped>
.boolean-question {
  h5 {
    margin-bottom: 16px;
    margin-bottom: 7px;
    color: #323232;
    font-weight: 500;
    font-size: rem(14px);

    &.title-primary {
      color: $color-primary;
      font-size: rem(16px);
    }
  }

  ::v-deep {
    .v-label {
      color: #323232;
      font-size: rem(14px);
    }

    .v-radio {
      margin-right: 40px !important;
    }

    .v-input--selection-controls__input {
      width: 26px;
      height: 26px;

      .v-icon {
        font-size: 26px;
      }
    }

    .v-input--switch {
      .v-input--selection-controls__input {
        margin-right: 40px;
      }

      label {
        font-size: rem(14px);
        letter-spacing: 0;
        text-align: left;
      }

      &.v-input--is-label-active {
        label {
          color: $color-primary;
        }
      }
    }
  }
}
</style>
