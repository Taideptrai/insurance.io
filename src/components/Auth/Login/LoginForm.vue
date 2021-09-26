<template lang="pug">
.login
  .bg-logo
    image-field(class="ml-auto" :src="backgroundLogo" width="559")
  .form-login
    v-card(elevation="0")
      image-field(class="mx-auto mb-6" :src="logo" width="160")
      p.header(class="text-center text-color--grey") {{ $t('title.login-form') }}
      p.welcome(class="text-center font-weight-medium text-color--grey") {{ $t('title.welcome') }}
      v-form(lazy-validation v-model="valid" ref="formLogin")
        v-row(justify="center")
          v-col
            text-field-static(
              name="Email"
              type="email"
              :label="$t('label.email')"
              v-model="loginForm.email"
              :rules="rules.emailRules"
            )
        v-row(justify="center")
          v-col
            password-field(
              v-model="loginForm.password"
              :label="$t('label.password')"
              :rules="rules.password"
              show-password
              name="password"
            )
        v-row.optional
          v-col(cols="6")
          v-col(class="text-right" cols="6" align-self="center")
            a(@click="$router.push('forgot-password')") {{ $t('action.forgot') }}

        v-row(no-gutters)
          v-col(cols="6")
            v-btn(class="pl-0" text color="primary" min-width="132" min-height="49" @click="$router.push('sign-up')") {{ $t('action.create-account') }}
          v-col(class="text-right" cols="6")
            v-btn(
              color="primary"
              :loading="isLoginFormLoading"
              depressed
              @click="handleSubmit"
              min-width="132"
              min-height="49"
            ) {{ $t('action.login') }}
              v-icon arrow_forward

        p.error-message(class="mb-0 mt-6 text-center" v-if="!!error") {{ error }}
</template>

<script>
import { PasswordField, TextFieldStatic } from '@/components/common/form/fields'

import { ImageField } from '@/components/common/fields'
import LogoAsset from '@/assets/img/backgrounds/login-logo.svg'
import LogoBackground from '@/assets/img/backgrounds/login-background.svg'
import { isEmailValid } from '@/core/helpers/validation'
import { isUserLoggedIn } from '@/core/helpers/auth'

export default {
  name: 'LoginForm',
  components: {
    ImageField,
    TextFieldStatic,
    PasswordField
  },
  data() {
    return {
      valid: false,
      error: '',
      isLoginFormLoading: false,
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        password: [value => !!value || this.$t('error.validation.required')],
        emailRules: [
          value => !!value || this.$t('error.validation.required'),
          value => {
            return isEmailValid(value) || this.$t('error.validation.email')
          }
        ]
      }
    }
  },
  computed: {
    logo() {
      return LogoAsset
    },
    backgroundLogo() {
      return LogoBackground
    },
    loginRedirect() {
      const { next = null } = this.$route?.query || {}

      return next || { name: 'home' }
    }
  },
  created() {
    if (isUserLoggedIn()) {
      return this.$router.replace({ name: 'home' })
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoginFormLoading = true

      try {
        const isValid = this.$refs.formLogin.validate()
        this.error = ''
        if (isValid) {
          const payload = {
            username: this.loginForm.email,
            password: this.loginForm.password
          }
          await this.$store.dispatch('auth/login', payload)
          this.$router.push(this.loginRedirect)
        }
      } catch (err) {
        this.error = this.$t('error.login-fail')
      } finally {
        this.isLoginFormLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  height: 100vh;
  padding-top: 80px;
  overflow-y: hidden;
  background: $color-primary;

  .form-login {
    position: absolute;
    top: 84px;
    left: 160px;
    width: 560px;

    ::v-deep {
      .v-card {
        padding: 48px;
        padding-bottom: 40px;
        border-radius: 8px;
      }

      .v-text-field--outlined {
        border-radius: 8px;
      }

      .v-text-field--outlined fieldset {
        border-color: $color-medium-gray;
      }

      .v-text-field--outlined.v-input--has-state fieldset {
        border-color: $color-error;
      }

      .v-input--checkbox {
        .v-icon {
          font-size: rem(16px);
        }

        .v-label {
          color: $color-dark-grey;
          font-size: rem(14px);
        }
      }
    }

    .optional {
      margin-top: -30px;
      margin-bottom: 24px;
    }

    .header {
      margin-bottom: 40px;
      font-size: rem(20px);
    }

    .welcome {
      margin-bottom: 48px;
      font-size: rem(32px);
    }

    .error-message {
      color: $color-error;
      white-space: pre;
    }

    .text-color--grey {
      color: $color-dark-grey;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "title": {
      "login-form": "Create + Manage Your Projects",
      "welcome": "Welcome back!"
    },
    "action": {
      "forgot": "Forgot password?",
      "login": "Login",
      "create-account": "create account"
    },
    "error": {
      "login-fail": "Login failed \n Check your credentials and try again"
    }
  }
}
</i18n>
