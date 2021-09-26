<template lang="pug">
.rating-field
  v-rating(hover ripple :value="value")
    template(#item="props")
      v-chip(
        @click="() => handleChange(props)"
        :color="props.isFilled ? 'primary' : 'white'"
        :class="`rounded-pill mr-3 py-6 px-${(props.index * 3 || 1) + 4}`"
      ) {{ props.index + 1 }}
</template>

<script>
export default {
  name: 'RatingField',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      default: null
    }
  },
  methods: {
    handleChange(props) {
      props.click()
      this.$emit('input', props.index + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.rating-field {
  .v-rating {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .rounded-pill {
    &.white {
      border: 1px solid #dedede !important;
    }

    &.primary {
      border: 1px solid;
    }
  }
}
</style>
