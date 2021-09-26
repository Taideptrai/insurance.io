<template lang="pug">
.verify
  v-card(class="rounded-lg" elevation=0 width="610" height="700")
    image-field(:src="logo" width="160")
    .header(class="mt-10 mb-7") {{ $t('title.verify-password') }}
    p.description(class="mb-13") {{ $t('message.description-top') }}
    v-btn(block color="primary" depressed min-width="132" min-height="49" @click="handleVerify") {{ $t('action.create-new-password') }}
      v-icon arrow_forward
    .description(class="mt-13 mb-4") {{ $t('message.description-bottom') }}

    .description {{ $t('message.thank') }}
</template>

<script>
import { ImageField } from '@/components/common/fields'
import LogoAsset from '@/assets/img/backgrounds/login-logo.svg'

export default {
  name: 'Verify',
  components: {
    ImageField
  },
  data() {
    return {
      userInfo: { code: '', loginId: '' }
    }
  },
  computed: {
    logo() {
      return LogoAsset
    }
  },
  created() {
    this.userInfo = {
      code: this.$route.query.code,
      loginId: this.$route.query.loginId
    }
  },
  methods: {
    handleVerify() {
      this.$emit('verify', true)
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
      "verify-password": "You have requested to reset your password"
    },
    "message": {
      "description-top": "Hello! \n We received a request to reset your password. \n Click on the link below to create a new password.",
      "description-bottom": "If you did not make this request, please ignore this email.",
      "thank": "Best regards, \n io.insure team."
    },
    "action": {
      "create-new-password": "CREATE NEW PASSWORD"
    }
  }
}
</i18n>
