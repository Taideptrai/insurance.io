<template lang="pug">
.form-card
  .title-content
    span.white--text {{ title }}
    v-icon(color="white" size="24px") {{ icon }}
  .content
    slot
</template>

<script>
export default {
  name: 'ProjectFormCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.form-card {
  margin-bottom: 40px;

  .title-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 78px;
    padding: 0 24px;
    background: transparent linear-gradient(92deg, $color-accent 0%, $color-light-accent 100%) 0% 0% no-repeat
      padding-box;
    border-radius: 8px 8px 0 0;

    span {
      font-weight: 900;
      font-size: 16px;
    }
  }

  .content {
    padding: 32px 24px;
    border: 1px solid $color-medium-gray;
    border-radius: 0 0 8px 8px;
  }
}
</style>
