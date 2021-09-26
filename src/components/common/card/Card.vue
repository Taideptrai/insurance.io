<template lang="pug">
.common-card
  v-card(:loading="isLoading" class="rounded-lg")
    v-card-title(flex class="mb-4")
      span {{ title }}
      v-spacer
      v-icon(v-if="isValidCard" color="white") mdi-check
    v-card-text(class="pa-8")
      slot(name="content")
    v-card-actions
      slot(name="actions")
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isValidCard: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.common-card {
  ::v-deep {
    .v-card__title {
      color: $color-white;
      background-color: $color-accent;
    }
  }
}
</style>
