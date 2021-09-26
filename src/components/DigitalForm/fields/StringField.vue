<template lang="pug">
component.string-field(
  :is="componentName"
  :name="name"
  :title="title"
  v-bind="properties"
  :value="value"
  @input="handleInput"
)
</template>

<script>
import { AutocompleteField } from '@/components/common/form/fields'
import TextField from './TextField.vue'

export default {
  name: 'StringField',
  components: {
    TextField,
    AutocompleteField
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    properties: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    componentName() {
      switch (this.$props.properties?.dictionaryName) {
        case 'Country':
        case 'Currency':
          return 'AutocompleteField'

        default:
          return 'TextField'
      }
    }
  },
  methods: {
    handleInput(val) {
      this.$emit('input', { [this.$props.code]: val })
    }
  }
}
</script>
