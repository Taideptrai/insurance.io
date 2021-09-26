<template lang="pug">
.forgot-password-form
  v-card(class="rounded-lg" elevation=0 width="550" height="405")
    v-card-title(class="pt-14")
      v-row(justify="center")
        v-col
          .header(class="text-center text-color--grey") {{ $t('title.forgot-pass-form') }}
    v-card-text(class="px-12")
      v-row(justify="center")
        v-col(class="mb-3" cols="12")
          p.description(class="text-color--grey") {{ $t('message.description') }}
        v-col(cols="12")
          v-form(lazy-validation ref="emailForgotPass")
            text-field-static(name="Email" type="email" :label="$t('label.email')" v-model="email" :rules="emailRules")
    v-card-actions(class="mt-1 px-12")
      v-row(no-gutters)
        v-col(cols="6")
          v-btn(class="pl-0" text color="primary" min-width="132" min-height="49" @click="handleBackToLogin") {{ $t('action.back-to-login') }}
        v-col(class="text-right" cols="6")
          v-btn(
            color="primary"
            :loading="isSenddingEmail"
            depressed
            @click="sendEmail"
            min-width="132"
            min-height="49"
          ) {{ $t('action.send') }}
            v-icon arrow_forward
</template>

<script>
import { TextFieldStatic } from '@/components/common/form/fields'
import { isEmailValid } from '@/core/helpers/validation'
import { toastedError } from '@/core/helpers/toasted'
export default {
  name: 'ForgotPasswordForm',
  components: {
    TextFieldStatic
  },
  data() {
    return {
      email: '',
      isSenddingEmail: false,
      emailRules: [
        value => !!value || this.$t('error.validation.required'),
        value => {
          return isEmailValid(value) || this.$t('error.validation.email')
        }
      ]
    }
  },
  methods: {
    async sendEmail() {
      this.isSenddingEmail = true
      try {
        const isValid = this.$refs.emailForgotPass.validate()
        if (isValid) {
          await this.$store.dispatch('auth/resetPassword', this.email)
          this.$emit('sent-email', true)
          this.isSenddingEmail = false
        }
      } catch (err) {
        toastedError(this.$t('error.general'))
      } finally {
        this.isSenddingEmail = false
      }
    },
    handleBackToLogin() {
      this.$router.push('login')
    }
  }
}
</script>
<style lang="scss" scoped>
.forgot-password-form {
  float: right;

  .header {
    color: $color-dark;
    font-size: rem(32px);
  }

  .description {
    color: $color-dark;
    font-size: rem(20px);
    white-space: pre;
  }
}
</style>
<i18n>
{
  "en": {
    "title": {
      "forgot-pass-form": "Forgot password"
    },
    "message": {
      "description": "Enter the e-mail address associated with your \n account to receive a password reset link."
    },
    "action": {
      "back-to-login": "Back to login"
    }
  }
}
</i18n>
