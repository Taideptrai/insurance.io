<template lang="pug">
.image-field(:style="styles")
  v-img(
    ref="image"
    v-bind="componentProps"
    :src="imageUrl"
    :width="width"
    :height="height"
    :contain="contain"
    @error="handleError"
  )
</template>

<script>
export default {
  name: 'ImageField',
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    contain: {
      type: Boolean,
      default: true
    },
    fallback: {
      type: String,
      default: ''
    },
    // https://vuetifyjs.com/en/api/v-img/#props
    componentProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      imageUrl: '',
      failedImage: false
    }
  },
  computed: {
    image() {
      return this.$refs.image
    },
    styles() {
      return {
        ...(this.width && { width: `${this.width}px` }),
        ...(this.height && { height: `${this.height}px` })
      }
    }
  },
  watch: {
    src() {
      this.imageUrl = this.src
    }
  },
  created() {
    this.imageUrl = this.src
  },
  methods: {
    handleError() {
      if (!this.fallback || this.failedImage) {
        return
      }

      this.imageUrl = this.fallback
      this.failedImage = true
    }
  }
}
</script>

<style lang="scss" scoped>
.image-field {
  position: relative;

  img {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
}
</style>
