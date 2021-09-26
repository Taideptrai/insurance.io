<template lang="pug">
.create-new-user-form
  v-card.rounded-lg(elevation=0 width="550")
    .header(class="text-center mb-4") {{ $t('title.invitation') }}
    p.description(class="mb-4") {{ $t('message.description-top') }}
    p.description(class="mb-7") {{ $t('message.description-bottom') }}
    v-form(lazy-validation ref="formCreatePass")
      text-field-static(
        class="mb-4"
        name="fullName"
        :label="$t('label.full-name')"
        v-model="formInvitation.fullName"
        :rules="requiredRule"
      )
      password-field.mb-4(
        name="password"
        :label="$t('label.password')"
        v-model="formInvitation.password"
        :rules="passwordRule"
      )
      password-field.mb-6(
        name="confirmPassword"
        :label="$t('label.repeat-password')"
        v-model="repeatPassword"
        :rules="repeatPasswordRule"
      )
      v-card-actions.mt-1
        v-row(no-gutters)
          v-col(cols="6")
            v-btn(class="ml-0" text color="primary" min-width="132" min-height="49" @click="$router.push('auth/login')") {{ $t('action.back-to-login') }}
          v-col(class="text-right" cols="6")
            v-btn(
              color="primary"
              :loading="isSendding"
              depressed
              @click="handleCreatePassword"
              min-width="132"
              min-height="49"
            ) {{ $t('action.send') }}
              v-icon arrow_forward
</template>

<script>
import { PASSWORD_MIN_LENGTH } from '@/core/config/validation'
import { PasswordField } from '@/components/common/form/fields'
import { TextFieldStatic } from '@/components/common/form/fields'
import { toastedSuccess } from '@/core/helpers/toasted'

export default {
  name: 'CreateNewUser',
  components: {
    TextFieldStatic,
    PasswordField
  },
  data() {
    return {
      formInvitation: {
        fullName: '',
        password: ''
      },
      repeatPassword: '',
      isSendding: false,
      requiredRule: [value => !!value || this.$t('error.validation.required')],
      passwordRule: [
        value => !!value || this.$t('error.validation.required'),
        value => value.length >= PASSWORD_MIN_LENGTH || this.$t('error.validation.min-length')
      ],
      repeatPasswordRule: [
        value => !!value || this.$t('error.validation.required'),
        value => value.length >= PASSWORD_MIN_LENGTH || this.$t('error.validation.min-length'),
        value => value == this.formInvitation.password || this.$t('error.validation.password-match')
      ]
    }
  },
  created() {},
  methods: {
    async handleCreatePassword() {
      const isValid = this.$refs.formCreatePass.validate()
      if (!isValid) {
        return
      }
      this.isSendding = true
      //TODO: change function after connect with API
      setTimeout(() => {
        this.isSendding = false
        toastedSuccess('Password successfully created')
        this.$router.push({ name: 'project.detail', params: { id: '11' } })
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
.create-new-user-form {
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
    font-size: rem(16px);
  }
}
</style>
<i18n>
{
  "en": {
    "title": {
      "invitation": "Welcome to io.insure!"
    },
    "message": {
      "description-top": "You have been invited to project, please provide your full name and create a password to proceed.",
      "description-bottom": "We will automatically create an account for you, so next time you come to io.insure just log in using your email and password."
    },
    "action": {
      "back-to-login": "go to login"
    }
  }
}
</i18n>
