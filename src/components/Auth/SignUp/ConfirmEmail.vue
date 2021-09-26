<template lang="pug">
.verify
  v-card(class="rounded-lg" elevation=0 width="610" height="700")
    image-field(:src="logo" width="160")
    .header(class="mt-10 mb-7") {{ $t('title.sign-up-success') }}
    p.description(class="mb-13") {{ $t('message.description-top') }}
    v-btn(block color="primary" depressed min-width="132" min-height="49" @click="handleBackToLogin") {{ $t('action.confirm-email') }}
      v-icon arrow_forward

    .description(class="mt-13") {{ $t('message.thank') }}
</template>

<script>
import { ImageField } from '@/components/common/fields'
import LogoAsset from '@/assets/img/backgrounds/login-logo.svg'
import { toastedError } from '@/core/helpers/toasted'

export default {
  name: 'ConfirmEmail',
  components: {
    ImageField
  },
  data() {
    return {
      userInfo: { code: '', loginId: '' },
      alert: null
    }
  },
  computed: {
    logo() {
      return LogoAsset
    }
  },
  created() {
    this.userInfo = {
      activateToken: this.$route.query.token,
      id: this.$route.query.id
    }
    this.confirmEmail()
  },
  methods: {
    async confirmEmail() {
      try {
        const confirmEmail = await this.$store.dispatch('auth/confirmEmail', this.userInfo)
        if (!confirmEmail) {
          toastedError(this.$t('error.general'))
        }
      } catch (error) {
        toastedError(this.$t('error.general'))
      }
    },
    handleBackToLogin() {
      this.$router.push('login')
    }
  }
}
</script>
<style lang="scss" scoped>
.verify {
  ::v-deep {
    .v-card {
      padding: 48px;
    }
  }

  .header {
    height: 29px;
    color: $color-dark;
    font-weight: 500;
    font-size: rem(24px);
  }

  .description {
    color: $color-dark;
    font-size: rem(16px);
    line-height: rem(40px);
    white-space: pre;
  }
}
</style>
<i18n>
{
  "en": {
    "title": {
      "sign-up-success": "Welcome to io.insure!"
    },
    "action": {
      "confirm-email":"get started"
    },
    "message": {
      "description-top": "Hello! \n Your account was successfully created. \n Click on the link below to go to io.insure and get started.",
        "thank": "Best regards, \n io.insure team."
    }
  }
}
</i18n>
