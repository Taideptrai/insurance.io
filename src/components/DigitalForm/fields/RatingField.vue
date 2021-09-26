<template lang="pug">
.rating-field
  h5(v-if="title" :class="className") {{ title }}
  helper-text-field(v-if="ratingHelperText" v-bind="ratingHelperText")
  rating.mt-0(v-model="ratingModel" name="rating")
</template>

<script>
import FormControl from '../FormControl.vue'
import { HelperTextField } from '@/components/common/fields'
import { RatingField as Rating } from '@/components/common/form/fields'

export default {
  name: 'RatingField',
  components: {
    Rating,
    HelperTextField,
    FormControl
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
    properties: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    },
    classes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ratingHelperText: {
        text: '(1 being the lowest and 5 being the highest)',
        list: []
      }
    }
  },
  computed: {
    className() {
      return this.$props.classes?.join(' ') || ''
    },
    ratingModel: {
      get() {
        return this.$props.value?.rating || null
      },
      set(val) {
        this.update(this.$props.name, { rating: val })
      }
    }
  },
  mounted() {
    this.$store
      .dispatch('dictionary/getDictionary', { dictionary: this.$props.properties.dictionaryName })
      .then(res => {
        this.ratingHelperText.list = res
      })
  }
}
</script>

<style lang="scss" scoped>
.rating-field {
  h5 {
    margin-bottom: 7px;
    color: #323232;
    font-weight: 500;
    font-size: rem(14px);

    &.title-primary {
      color: $color-primary;
      font-size: rem(16px);
    }
  }

  .rating {
    margin-top: 16px;
    margin-bottom: 16px;
  }
}
</style>
