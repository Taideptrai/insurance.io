<template lang="pug">
.notification-message(class="d-flex justify-center mt-6")
  v-alert.notification-message__alert(
    ref="component"
    :type="normalizedType"
    :icon="icon"
    :color="normalizedColor"
    :dismissible="dismissable"
    :class="componentClasses"
  )
    template(#prepend)
      slot(name="before")
        v-icon.mr-2 {{ icon }}

    slot
</template>

<script>
const TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  DEFAULT: 'default'
}

export default {
  name: 'NotificationMessage',
  components: {},
  props: {
    type: {
      type: String,
      default: TYPES.DEFAULT,
      validator(v) {
        return Object.values(TYPES).includes(v)
      }
    },
    dismissable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: undefined
    },
    dark: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hasBeforeSlot: false,
      isActive: true
    }
  },
  computed: {
    normalizedType() {
      return (this.type !== TYPES.DEFAULT && this.type) || undefined
    },
    icon() {
      let icon

      if (this.showIcon === false) {
        return false
      }

      switch (this.type) {
        case TYPES.INFO:
          icon = 'info'
          break
        case TYPES.ERROR:
          icon = 'error_outline'
          break
        case TYPES.SUCCESS:
          icon = 'check'
          break
        case TYPES.WARNING:
          icon = 'warning_amber'
          break
        case TYPES.DEFAULT:
        default:
          icon = false
      }

      return icon
    },
    normalizedColor() {
      return this.color || (!this.normalizedType ? '#f1f1f1' : undefined)
    },
    componentClasses() {
      return {
        'has-before': this.hasBeforeSlot
      }
    },
    component() {
      return this.$refs.component
    }
  },
  async mounted() {
    this.watchActiveState()
    this.hasBeforeSlot = !!this.$slots?.before
  },
  async updated() {
    this.hasBeforeSlot = !!this.$slots?.before
  },
  methods: {
    watchActiveState() {
      this.$watch(
        () => this.$refs?.component?.isActive,
        v => {
          if (v) {
            return
          }
          this.$destroy()
          this.$el.parentNode.removeChild(this.$el)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-message {
  position: relative;

  ::v-deep {
    a {
      color: inherit;
    }
  }

  @include e('alert') {
    &.has-before {
      ::v-deep {
        .v-alert__content {
          margin-left: rem(16px);
        }
      }
    }
  }
}
</style>
