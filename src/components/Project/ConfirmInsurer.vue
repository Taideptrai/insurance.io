<template lang="pug">
v-card.confirm-insurer
  v-card-title
    span.confirm-insurer--title.darkgrey-1--text Confirm your Insurer
    v-spacer
    v-icon.sign-modal--btn-close(color="darkgrey-1" width="28px" @click.prevent="handleClose") close
  v-card-text
    .confirm-insurer__card.mt-8
      .confirm-insurer__card__title.d-flex.justify-space-between
        v-img.confirm-insurer__card__title__logo(:src="quoteIcon" width="108px")
        .confirm-insurer__card__title__text.text-right
          p Quote Pack Number
          span 123-456
      p.confirm-insurer__card__price(class="darkgrey-1--text mt-4 mb-2") {{ unit }} {{ quote.price | currency }}
      p.confirm-insurer__card__description(class="lightgrey-1--text ma-0") {{ quote.description }}
    p.confirm-insurer__description(class="darkgrey-1--text mt-8 mb-9") You can also set an estimated signing date here and io.insure will send you a reminder close to that date.
    v-form.confirm-insurer__form(ref="dateForm" v-model="isValid")
      v-row
        v-col(md="6" cols="12")
          v-menu(
            ref="signMenu"
            v-model="signMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          )
            template(v-slot:activator="{ on, attrs }")
              text-field(
                v-model="signDateFormated"
                :rules="rules"
                name="sign-date"
                label="Estimated Signing Date"
                append-icon="check"
                :bind="attrs"
                :on="on"
                readonly
                hide-details="auto"
              )
            v-date-picker(v-model="signDate" no-title @input="signMenu = false")
      v-row
        v-col(md="6" cols="12")
          v-menu(
            ref="completedMenu"
            v-model="completedMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          )
            template(v-slot:activator="{ on, attrs }")
              text-field(
                v-model="completedDateFormated"
                :rules="rules"
                name="completed-date"
                label="Estimated Completion Date"
                append-icon="check"
                :bind="attrs"
                :on="on"
                readonly
                hide-details="auto"
              )
            v-date-picker(v-model="completedDate" no-title @input="completedMenu = false")
  v-card-actions.pb-6
    v-spacer
    v-btn(color="darkgrey-1" min-height="48px" text @click.prevent="handleClose") BACK
    v-btn.ml-8.confirm-insurer__btn(color="accent" min-height="48px" @click.prevent="handleConfirm")
      v-icon.mr-2(color="white" size="16") check
      span confirm
</template>

<script>
import QuoteIcon from '@/assets/img/quote-icon.png'
import { TextField } from '@/components/common/form/fields'
import { formatMoneyMixin } from '@/core/helpers/mixins'

export default {
  name: 'ConfirmInsurer',
  components: {
    TextField
  },
  mixins: [formatMoneyMixin],
  props: {
    quote: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: [v => !!v || this.$t('error.validation.required')],
      isValid: false,
      signDate: null,
      completedDate: null,
      signMenu: false,
      completedMenu: false
    }
  },
  computed: {
    unit() {
      return this.quote?.unit || ''
    },
    signDateFormated() {
      return this.formatDate(this.signDate)
    },
    completedDateFormated() {
      return this.formatDate(this.completedDate)
    },
    quoteIcon() {
      return QuoteIcon
    }
  },
  methods: {
    handleConfirm() {
      if (this.isValid) {
        this.$emit('confirm-insurer:confirm', {
          signDate: this.signDate,
          completedDate: this.completedDate
        })
      } else {
        this.$refs.dateForm.validate()
      }
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    handleClose() {
      this.$emit('confirm-insurer:close')
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-insurer {
  @include m(title) {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
  }

  @include e(btn) {
    padding: 0 32px !important;
  }

  @include e(form) {
    margin-bottom: 40px;
  }

  @include e(card) {
    padding: 24px;
    border: 1px solid $color-medium-gray;
    border-radius: 8px;

    @include e(price) {
      font-weight: 900;
      font-size: 24px;
      line-height: 29px;
    }

    @include e(title) {
      @include e(logo) {
        flex: 0 0 108px;
      }

      @include e(text) {
        color: $color-dark-grey-1;
        font-size: 14px;
        line-height: 17px;

        p {
          margin: 0;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
