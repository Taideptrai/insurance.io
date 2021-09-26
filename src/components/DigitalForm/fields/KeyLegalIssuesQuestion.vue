<template lang="pug">
.key-legal-issues-question
  h4(v-if="title") {{ title }}

  h5 {{ booleanTitle }}
  radio-button(name="choice" v-model="radioModel" :choices="choices")

  template(v-if="showTextArea")
    h5 {{ textAreaTitle }}
    v-textarea(ref="textArea" auto-grow v-model="textModel" :rules="rules")
</template>

<script>
import { RadioButton } from '@/components/common/form/fields'
import { isNumber } from 'lodash'

export default {
  name: 'KeyLegalIssuesQuestion',
  components: {
    RadioButton
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
    booleanTitle: {
      type: String,
      default: ''
    },
    booleanProperties: {
      type: Object,
      default: () => {}
    },
    textAreaTitle: {
      type: String,
      default: ''
    },
    value: {
      type: [Object],
      default: () => {}
    }
  },
  data() {
    return {
      choices: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ],
      rules: [],
      showTextArea: false
    }
  },
  computed: {
    radioModel: {
      get() {
        // For case value is zero number
        return isNumber(this.$props.value?.choice) ? this.$props.value?.choice : null
      },
      set(val) {
        this.update(this.$props.name, { ...this.$props.value, choice: val })
      }
    },
    textModel: {
      get() {
        return this.$props.value?.value || null
      },
      set(val) {
        this.update(this.$props.name, { ...this.$props.value, value: val })
      }
    }
  },
  watch: {
    radioModel(val) {
      if (val) {
        this.showTextArea = true
        this.rules = [v => !!v || this.$t('error.validation.required')]
        this.$nextTick(() => this.$refs.textArea.focus())
      } else {
        this.showTextArea = false
        this.rules = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.key-legal-issues-question {
  width: 100%;

  .v-textarea {
    padding: 12px 16px 0;
    background: #fff;
    border: 1px solid #dedede;
    border-radius: 8px;

    &.error--text {
      border-color: $color-error;
    }

    ::v-deep {
      .v-input__slot {
        margin-bottom: 0;

        &:before,
        &:after {
          content: unset;
        }
      }
    }
  }
}
</style>
