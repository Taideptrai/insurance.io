<template lang="pug">
.digital-form
  h1(v-if="title") {{ title }}
  //- Initial Assessment Section
  card(v-if="initialSection && initialSection.questions" :title="initialSection.title")
    template(#content)
      form-group(
        :fields="initialSection.questions"
        :name="initialSection.code"
        v-model="sectionData"
        @update:valid="handleUpdateValidate"
      )

  //- Warranty Sections
  template(v-if="warrantySections")
    card(v-for="section in warrantySections" :key="section.code" :title="section.title")
      template(#content)
        form-group(
          :name="section.code"
          :fields="section.fields"
          v-model="sectionData"
          @update:valid="handleUpdateValidate"
        )

  //- Summary Section
  card(v-if="summarySection && summarySection.questions" :title="summarySection.title")
    template(#content)
      form-group(
        :fields="summarySection.questions"
        :name="summarySection.code"
        v-model="sectionData"
        @update:valid="handleUpdateValidate"
      )
</template>

<script>
import { Card } from '@/components/common/card'
import FormGroup from './FormGroup.vue'

export default {
  name: 'DigitalForm',
  components: { Card, FormGroup },
  props: {
    name: { type: String, required: true },
    title: { type: String, default: '' },
    sections: { type: Object, required: true },
    value: {
      type: Object,
      default: () => {
        return {
          initialAssessmentSection: {},
          warrantySections: {},
          summarySection: {}
        }
      }
    }
  },
  data() {
    return {
      valid: false,
      formState: {}
    }
  },
  computed: {
    initialSection() {
      return this.$props.sections?.initialAssessmentSection
    },
    summarySection() {
      return this.$props.sections?.summarySection
    },
    warrantySections() {
      return this.$props.sections?.warrantySections?.map(section => {
        return {
          ...section,
          fields: [
            ...(section.questions || []),
            ...(section.subSections?.map(i => ({ component: 'WarrantySubSection', ...i })) || [])
          ]
        }
      })
    },
    sectionData: {
      get() {
        return this.$props.value || {}
      },
      set(val) {
        this.$emit('input', { ...this.sectionData, ...val })
      }
    }
  },
  methods: {
    handleUpdateValidate(val) {
      this.formState = { ...this.formState, val }
      this.$emit(
        'update:valid',
        Object.values(val).some(v => v)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.digital-form {
  ::v-deep {
    .v-card {
      margin-bottom: 40px;
    }
  }
}
</style>
