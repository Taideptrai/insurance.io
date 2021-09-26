<template lang="pug">
.warranty-sub-section
  h4(v-if="title" class="color-primary") {{ title }}
  h5(v-if="titleDetailed") {{ titleDetailed }}

  template(v-if="hasChildQuestions")
    warranty-question(
      v-for="question in questions"
      :value="modelValue[question.code]"
      :key="question.code"
      :name="question.code"
      v-bind="question"
    )
</template>

<script>
import WarrantyQuestion from './WarrantyQuestion.vue'

export default {
  name: 'WarrantySubSection',
  components: {
    WarrantyQuestion
  },
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    titleDetailed: {
      type: String,
      default: ''
    },
    questions: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.$props.value || {}
      }
    },
    className() {
      return ''
    },
    hasChildQuestions() {
      return this.$props.questions?.length
    }
  }
}
</script>
