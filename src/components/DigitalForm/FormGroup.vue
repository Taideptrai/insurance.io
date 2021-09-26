<template lang="pug">
v-form.form-group(v-model="valid")
  v-row
    form-control(
      class="form-control"
      v-for="field in fields"
      :value="isGroupQuestion(field) ? moduleValue : moduleValue[field.code]"
      :class="getClassName(field)"
      :key="field.code"
      :name="field.code"
      :field="field"
    )
</template>

<script>
import FormControl from './FormControl.vue'
import { set } from 'lodash'

export default {
  name: 'FormGroup',
  components: {
    FormControl
  },
  provide() {
    return {
      update: this.update
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: null,
      valid: null
    }
  },
  computed: {
    moduleValue() {
      return this.$props.value || {}
    }
  },
  watch: {
    moduleValue(val) {
      this.formData = val
    },
    valid(val) {
      this.$emit('update:valid', { [this.$props.name]: val })
    }
  },
  methods: {
    getClassName(field) {
      let classes = field.properties?.classes?.join(' ') || ''
      return classes.includes('col-') ? classes : `${classes} col-12`
    },
    isGroupQuestion(field) {
      return ['GroupQuestion', 'WarrantySubSection'].includes(field.component)
    },
    update(field, val) {
      this.formData = set(this.formData, field.split('.'), val)
      this.$emit('input', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-control {
  padding: 0 12px;
}
</style>
