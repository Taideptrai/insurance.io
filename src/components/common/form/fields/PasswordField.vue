<template lang="pug">
v-text-field.password-field(
  class="rounded-lg"
  outlined
  v-model="password"
  validate-on-blur
  :name="name"
  ref="password"
  :value="value"
  :label="label"
  :type="type"
  :rules="rules"
  @blur="handleBlur"
  @focus="resetValidate"
  @input="handleInput"
)
  template(#append)
    v-icon(class="success--text" v-if="appendIcon === 'check'") check
    v-icon(class="error--text" v-else-if="appendIcon === 'error_outline'") error_outline
    v-icon(
      class="pointer primary--text"
      @click="handleTogleVisibility"
      v-else-if="showPassword && appendIcon === 'visibility'"
    ) visibility
    v-icon(
      class="pointer primary--text"
      @click="handleTogleVisibility"
      v-else-if="showPassword && appendIcon === 'visibility_off'"
    ) visibility_off
    v-icon(v-else)
</template>

<script>
export default {
  name: 'PasswordField',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Password'
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      showEye: this.showPassword,
      appendIcon: null,
      icons: [null, 'visibility', 'visibility_off', 'check', 'error_outline'],
      password: ''
    }
  },
  computed: {
    type() {
      return this.showPassword && this.visible ? 'text' : 'password'
    }
  },
  methods: {
    handleTogleVisibility() {
      this.appendIcon = this.appendIcon === 'visibility' ? 'visibility_off' : 'visibility'
      this.visible = !this.visible
    },
    handleInput(value) {
      this.appendIcon = 'visibility'
      this.$emit('input', value)
    },
    handleBlur() {
      this.$nextTick(() => {
        this.appendIcon = this.$refs.password.hasError ? 'error_outline' : 'check'
      })
    },
    resetValidate() {
      this.appendIcon = this.password ? 'visibility' : null
    }
  }
}
</script>

<style lang="scss" scoped>
.password-field {
  position: relative;

  .pointer {
    cursor: pointer;
  }
}
</style>
