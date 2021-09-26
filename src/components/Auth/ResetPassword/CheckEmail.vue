<template lang="pug">
.check-email(class="d-flex justify-end")
  v-card(class="rounded-lg" elevation=0 width="550" height="298")
    v-card-title(class="pt-14")
      v-row(justify="center")
        v-col
          .header(class="text-center text-color--grey") {{ $t('title.check-email') }}
    v-card-text(class="px-12")
      v-row(justify="center")
        v-col(class="my-3" cols="12")
          p.description(class="text-center text-color--grey") {{ $t('message.sent-email') }}
    v-card-actions(class="mt-1 px-12")
      v-row(no-gutters)
        v-col(class="text-right" cols="12")
          v-btn(color="primary" depressed min-width="132" min-height="49" @click="handleBackToLogin") {{ $t('action.back-to-login') }}
            v-icon arrow_forward
</template>

<script>
export default {
  name: 'CheckEmail',
  data() {
    return {}
  },
  methods: {
    handleBackToLogin() {
      this.$router.push('login')
    }
  }
}
</script>
<style lang="scss" scoped>
.check-email {
  .header {
    color: $color-dark;
    font-size: rem(32px);
  }

  .description {
    color: $color-dark;
    font-size: rem(20px);
  }
}
</style>
<i18n>
{
  "en": {
    "title": {
      "check-email": "Check your e-mail!"
    },
    "message": {
      "sent-email": "We just sent you an e-mail with a link to reset your password."
    },
    "action": {
      "back-to-login": "Go to login"
    }
  }
}
</i18n>
