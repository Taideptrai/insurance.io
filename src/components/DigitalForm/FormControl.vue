<template lang="pug">
.form-control
  template(v-if="isGroupQuestion")
    h4(v-if="field.title" class="color-primary") {{ field.title }}
    h5(v-if="field.titleDetailed") {{ field.titleDetailed }}

    template(v-if="field.questions")
      component(
        v-for="question in field.questions"
        v-bind="question"
        v-show="visibleControl[question.code]"
        :is="question.component"
        :key="question.code"
        :name="question.code"
        :value="objModel[question.code]"
      )

  template(v-else)
    component(v-show="visibleControl[name]" :is="field.component" :name="name" :value="value" v-bind="field")
</template>

<script>
export default {
  name: 'FormControl',
  components: {
    // Asynchronous import to resolve Circular References Between Components issue, please DON'T CHANGE IT
    Date: () => import('./fields/DatePicker.vue'),
    Radio: () => import('./fields/RadioGroup.vue'),
    String: () => import('./fields/StringField.vue'),
    Rating: () => import('./fields/RatingField.vue'),
    Percent: () => import('./fields/PercentField.vue'),
    Currency: () => import('./fields/CurrencyField.vue'),
    PositiveNumber: () => import('./fields/PositiveNumber.vue'),
    BooleanQuestion: () => import('./fields/BooleanQuestion.vue'),
    WarrantyQuestion: () => import('./fields/WarrantyQuestion.vue'),
    WarrantySubSection: () => import('./fields/WarrantySubSection.vue'),
    KeyLegalIssuesQuestion: () => import('./fields/KeyLegalIssuesQuestion.vue')
  },
  props: {
    name: {
      type: String,
      required: true
    },
    field: {
      type: Object,
      default: () => {}
    },
    value: {
      // Can be Object when it's group question
      type: [Object, String, Number, Boolean],
      default: null
    }
  },
  data() {
    return {
      visibleControl: {}
    }
  },
  computed: {
    projectFormData() {
      return this.$store.state.digitalForm.projectFormData
    },
    objModel() {
      return this.$props.value || {}
    },
    isGroupQuestion() {
      return this.$props.field.component === 'GroupQuestion'
    }
  },
  watch: {
    projectFormData() {
      this.updateVisible()
    }
  },
  mounted() {
    this.updateVisible()
  },
  methods: {
    getClassName(question) {
      return question.properties?.classes?.join(' ') || null
    },
    // Make the field visible or not with field's conditions
    async checkVisible(properties) {
      if (!properties?.conditions) return true
      let res = true
      for (const cond of properties.conditions) {
        res = await this.execCondition(cond)
        if (res === false) break
      }
      return res
    },
    getFieldValue(fieldPath) {
      return this.$store.dispatch('digitalForm/getFieldValue', fieldPath)
    },
    async execCondition(cond) {
      const sourceVal = await this.getFieldValue(cond.source)
      const targetVal = cond.value || (await this.getFieldValue(cond.target))

      switch (cond.condition) {
        case 'GT':
          return sourceVal > targetVal
        case 'LT':
          return sourceVal < targetVal
        case 'EQ':
          return sourceVal === targetVal

        default:
          return true
      }
    },
    async updateVisible() {
      const { field, name } = this.$props

      if (field?.questions?.length) {
        for (const q of field.questions) {
          this.visibleControl[q.code] = await this.checkVisible(q.properties)
        }
      }

      this.visibleControl = {
        ...this.visibleControl,
        [name]: await this.checkVisible(field.properties)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-control {
  width: 100%;
}
</style>
