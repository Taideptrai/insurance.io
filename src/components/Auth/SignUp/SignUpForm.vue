<template lang="pug">
.sign-up
  .bg-logo
    v-img(:src="background" width="559")
  .card-container
    .card(:class="{ 'card-success': isSignUpSuccess }")
      v-form(v-model="isValid" ref="signUpForm" v-if="!isSignUpSuccess")
        p(class="card__title text-center") {{ $t('title.header') }}
        p(class="card__caption text-center") {{ $t('title.caption') }}
        text-field-static(
          name="fullName"
          :label="$t('label.full-name')"
          v-model="formSignUp.fullName"
          :rules="requiredRule"
        )
        text-field-static(
          name="Email"
          type="email"
          :label="$t('label.email')"
          v-model="formSignUp.email"
          :rules="emailRules"
        )
        text-field-static(
          name="companyName"
          :label="$t('label.company-name')"
          v-model="formSignUp.companyName"
          :rules="requiredRule"
        )
        password-field(
          name="password"
          :label="$t('label.password')"
          v-model="formSignUp.password"
          :rules="passwordRule"
        )
        password-field(
          name="confirmPassword"
          :label="$t('label.repeat-password')"
          v-model="repeatPassword"
          :rules="repeatPasswordRule"
        )
        .card__action(class="d-flex justify-space-between align-center")
          v-btn(class="pl-0" text color="primary" @click="$router.push('login')") {{ $t('action.has-account') }}
          v-btn(@click="handleSubmit" color="primary" depressed height="49" :loading="isLoginFormLoading") {{ $t('action.register') }}
            v-icon east
        p.error-message(class="mb-0 mt-6 text-center" v-if="msgError") {{ msgError }}

      div(v-else)
        p.card__title(class="text-center") {{ $t('title.title-success') }}
        p.card__caption(class="text-center") {{ $t('title.caption-success') }}
        v-btn(class="mt-2 ml-auto d-block" @click="$router.push('login')" color="primary" depressed height="49") {{ $t('action.to-login') }}
          v-icon east
</template>

<script>
import BackgroundImg from '@/assets/img/backgrounds/signup-background.svg'
import { ImageField } from '@/components/common/fields'
import { PASSWORD_MIN_LENGTH } from '@/core/config/validation'
import { PasswordField } from '@/components/common/form/fields'
import { TextFieldStatic } from '@/components/common/form/fields'
import { isEmailValid } from '@/core/helpers/validation'
import { toastedError } from '@/core/helpers/toasted'

export default {
  name: 'SignUpForm',
  components: {
    ImageField,
    PasswordField,
    TextFieldStatic
  },
  data() {
    return {
      isValid: false,
      formSignUp: {
        fullName: '',
        email: '',
        companyName: '',
        password: ''
      },
      repeatPassword: '',
      msgError: '',
      isSignUpSuccess: false,
      requiredRule: [value => !!value || this.$t('error.validation.required')],
      emailRules: [
        value => !!value || this.$t('error.validation.required'),
        value => {
          return isEmailValid(value) || this.$t('error.validation.email')
        }
      ],
      passwordRule: [
        value => !!value || this.$t('error.validation.required'),
        value => value.length >= PASSWORD_MIN_LENGTH || this.$t('error.validation.min-length')
      ],
      repeatPasswordRule: [
        value => !!value || this.$t('error.validation.required'),
        value => value.length >= PASSWORD_MIN_LENGTH || this.$t('error.validation.min-length'),
        value => value == this.formSignUp.password || this.$t('error.validation.password-match')
      ],
      isLoginFormLoading: false
    }
  },
  computed: {
    background() {
      return BackgroundImg
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoginFormLoading = true
      try {
        this.msgError = ''
        const isFormValid = this.$refs.signUpForm.validate()
        if (!isFormValid) {
          return
        }

        const { errors } = await this.$store.dispatch('auth/signUp', this.formSignUp)
        if (errors) {
          this.msgError = this.$t('error.sign-up-fail')
        } else {
          this.isSignUpSuccess = true
        }
      } catch (error) {
        toastedError(this.$t('error.general'))
      } finally {
        this.isLoginFormLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-up {
  position: relative;
  height: 100vh;
  overflow-y: hidden;
  color: $color-dark-grey;
  background: $color-primary;

  .bg-logo {
    position: absolute;
    top: 80px;
    left: 0;
    width: 846px;
  }

  .card-container {
    position: absolute;
    right: 172px;
    height: inherit;
    padding: 80px 0;
    overflow-y: scroll;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .card {
      width: 550px;
      padding: 49px 36px 47px 50px;
      background-color: $color-white;
      border-radius: 16px;

      &.card-success {
        margin-top: 150px;
      }

      ::v-deep {
        .v-text-field--outlined {
          border-radius: 8px;

          .v-input__control {
            margin-bottom: 7px;
          }

          fieldset {
            border-color: $color-medium-gray;
          }
        }
      }

      @include e('title') {
        font-size: rem(32px);
      }

      @include e('caption') {
        margin-bottom: 47px;
        font-size: rem(20px);
      }

      @include e('action') {
        margin-top: 24px;
      }
    }

    .error-message {
      color: $color-error;
      white-space: pre;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "title": {
      "header": "Setup a New Account",
      "caption": "It takes less than a minute to start creating + managing your M+A Insurance Projects",
      "title-success": "Thank you for creating an account!",
      "caption-success": "Your registration request has been received and is undergoing review process. Please check your email to verify your registration and to Login"
    },
    "action": {
      "has-account": "I ALREADY HAVE AN ACCOUNT",
      "register": "register",
      "to-login": "go to login"
    },
    "error": {
      "sign-up-fail": "E-mail already in use. \nTry to login instead by clicking on I already have an account."
    }
  }
}
</i18n>
