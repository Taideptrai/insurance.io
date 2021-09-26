<template lang="pug">
.create-password-form
  v-card(class="rounded-lg" elevation=0 width="550" height="405")
    .header(class="text-center mb-7") {{ $t('title.create-password') }}
    v-form(lazy-validation ref="formCreatePass")
      password-field(name="password" :label="$t('label.password')" :rules="passwordRule" @input="handlePasswordChange")
      password-field(
        name="confirmPassword"
        :label="$t('label.repeat-password')"
        :rules="repeatPasswordRule"
        @input="handleReapeatPasswordChange"
      )
    v-card-actions(class="mt-1")
      v-row(no-gutters)
        v-col(cols="6")
          v-btn(class="pl-0" text color="primary" min-width="132" min-height="49" @click="handleBackToLogin") {{ $t('action.back-to-login') }}
        v-col(class="text-right" cols="6")
          v-btn(
            color="primary"
            :loading="isSendding"
            depressed
            @click="handleCreatePassword"
            min-width="132"
            min-height="49"
          ) {{ $t('action.confirm') }}
            v-icon arrow_forward
</template>

<script>
import { PASSWORD_MIN_LENGTH } from '@/core/config/validation'
import { PasswordField } from '@/components/common/form/fields'
import { toastedError } from '@/core/helpers/toasted'

export default {
  name: 'CreatePasswordForm',
  components: {
    PasswordField
  },
  data() {
    return {
      password: '',
      reapeatPassword: '',
      isSendding: false,
      passwordRule: [
        value => !!value || this.$t('error.validation.required'),
        value => value.length >= PASSWORD_MIN_LENGTH || this.$t('error.validation.min-length')
      ],
      repeatPasswordRule: [
        value => !!value || this.$t('error.validation.required'),
        value => value.length >= PASSWORD_MIN_LENGTH || this.$t('error.validation.min-length'),
        value => value === this.password || this.$t('error.validation.password-match')
      ]
    }
  },
  created() {},
  methods: {
    handlePasswordChange(val) {
      this.password = val
    },
    handleReapeatPasswordChange(val) {
      this.reapeatPassword = val
    },
    async handleCreatePassword() {
      const isValid = this.$refs.formCreatePass.validate()
      if (!isValid) {
        return
      }
      const payload = {
        id: this.$route.query.id,
        password: this.password,
        token: this.$route.query.token
      }
      try {
        const passwordChange = await this.$store.dispatch('auth/changePassword', payload)
        if (passwordChange) {
          this.$router.push('login')
        }
      } catch (err) {
        toastedError(this.$t('error.general'))
      }
    },
    handleBackToLogin() {
      this.$router.push('auth/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.create-password-form {
  ::v-deep {
    .v-card {
      padding: 48px;
    }
  }

  float: left;

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
      "create-password": "Create Password"
    },
    "action": {
      "back-to-login": "go to login"
    }
  }
}
</i18n>
