<template lang="pug">
.warranty-question
  h4(v-if="title" class="color-primary") {{ title }}

  template(v-if="booleanTitle")
    h5 {{ booleanTitle }}
    radio-button(name="choice" v-model="radioModel" :choices="choices")

  template(v-if="hasRatingQuestion")
    h5(v-if="ratingTitle") {{ ratingTitle }}
    helper-text-field(v-if="ratingHelperText" v-bind="ratingHelperText")
    rating-field(name="rating" v-model="ratingModel")
</template>

<script>
import { RadioButton, RatingField } from '@/components/common/form/fields'

import { HelperTextField } from '@/components/common/fields'
import { isNumber } from 'lodash'

export default {
  name: 'WarrantyQuestion',
  components: {
    RadioButton,
    RatingField,
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
    booleanTitle: {
      type: String,
      default: ''
    },
    ratingTitle: {
      type: String,
      default: ''
    },
    booleanProperties: {
      type: Object,
      default: () => {}
    },
    ratingProperties: {
      type: Object,
      default: () => {}
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
  data() {
    return {
      choices: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ],
      ratingHelperText: {
        text: '(1 being the lowest and 5 being the highest)',
        list: []
      }
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
    ratingModel: {
      get() {
        return this.$props.value?.rating || null
      },
      set(val) {
        this.update(this.$props.name, { ...this.$props.value, rating: val })
      }
    },
    hasRatingQuestion() {
      return this.$props.ratingProperties && this.$props.ratingTitle
    },
    hasChildQuestions() {
      return this.$props.questions?.length
    }
  },
  mounted() {
    this.$store
      .dispatch('dictionary/getDictionary', { dictionary: this.$props.ratingProperties.dictionaryName })
      .then(res => (this.ratingHelperText.list = res))
  }
}
</script>
