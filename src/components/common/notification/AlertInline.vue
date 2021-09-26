<template lang="pug">
.alert(:class="type")
  v-icon.material-icons-outlined(:color="getColor" v-if="iconImage.length < 1") {{ icon }}
  v-avatar.avatar-rounded(size="25px" v-if="iconImage.length > 0")
    img(:src="iconImage" alt="avatar")
  .text(class="darkgrey-1--text")
    strong(v-if="title.length > 0") {{ title }}&nbsp;
    span {{ text }}
</template>

<script>
export default {
  name: 'AlertInline',
  props: {
    icon: {
      type: String,
      default: 'info'
    },
    iconImage: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    getColor() {
      let color = ''
      switch (this.type) {
        case 'warning':
          color = 'warning'
          break
        case 'info':
          color = 'accent'
          break
        default:
          color = 'accent'
      }
      return color
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;

  &.info {
    background: #00bed91a 0% 0% no-repeat padding-box !important;
  }

  &.warning {
    background: #ffa2001a 0% 0% no-repeat padding-box !important;
  }

  .text {
    padding-left: 16px;
    font-size: 14px;
    line-height: 17px;
  }
}
</style>
