<template lang="pug">
.quotes-content.mt-10
  alert-inline(
    type="info"
    text="Thanks for completing and signing your 3DF. The next stage is for io.insure to generate Quote Packs based on your Partner Insurers’ underwriting criteria. These will be provided to you within 24 hours. We appreciate your patience."
    v-if="status === 0"
  )
  .no-quote(@click.prevent="handlerChangeStatus(1)" class="mt-10 cursor" v-if="status === 0")
    v-icon.icon(size="40px" class="mb-4" color="dovegrey") content_paste
    p.darkgrey-1--text(class="ma-0") No quotes available yet
  .list-insurers(v-if="status === 1 && !isPreview && !selectedQuote")
    p.description We are delighted to offer you the following Quote Packs from our Partner Insurers.
    p.description(class="mb-10") Can you please review these and choose the Insurer that best meets your protection needs. Please click on “Appoint Insurer” to move to the next stage.
    .list-insurers__card(:key="index" v-for="(s, index) in insurers")
      v-img(:src="quoteIcon" width="108px")
      .list-insurers__card__content(class="mt-9")
        .list-insurers__card__content__text
          h3.darkgrey-1--text(class="mb-2") {{ s.unit }} {{ s.price | currency }}
          span.darkgrey-1--text {{ s.description }}
        .list-insurers__card__content__btns
          v-btn.mr-6(color="accent" min-height="48px" outlined @click.prevent="handleReviewFull(index)") Review full quote pack
          v-btn(color="accent" min-height="48px" @click.prevent="handleSelectInsurer(index)")
            v-icon.mr-2(color="white" size="16") check
            span appoint insurer
  .preview(v-if="isPreview && !selectedQuote")
    .preview__header(class="d-flex justify-space-between align-center")
      span.preview__header__text(class="darkgrey-1--text") Quote Pack
      .preview__header__btn
        v-btn.mr-8(color="darkgrey-1" min-height="48px" outlined @click.prevent="handlerBack") BACK
        v-btn(color="accent" min-height="48px" @click.prevent="handleAppoint")
          v-icon.mr-2(color="white" size="16") check
          span appoint insurer
    p.description(class="mt-8 mb-8") Fusion Speciality Insurance is pleased to offer you the following non-binding indicative offer, with a draft policy and warranties schedule for your review. Please review carefully and select the Insurer that meets your needs. Please wait for your client to make decision.
    quote-detail(:quote="insurers[quoteIndex]")
  .selected-quote(v-if="selectedQuote")
    .selected-quote__title(class="mb-8 d-flex align-center")
      p.selected-quote__title__name(class="ma-0 mr-10 darkgrey-1--text") {{ selectedQuote.name }} {{ selectedQuote.unit }} {{ selectedQuote.price | currency }} (Appointed)
      v-menu(offset-y)
        template(#activator="{ on, attrs }")
          .selected-quote__title__select-quote(v-bind="attrs" v-on="on")
            span.accent--text(class="mr-2") Select quote pack
            v-icon(color="accent" size="18") keyboard_arrow_downl
        v-card.list-quote(max-width="580")
          .list-quote__item(
            class="d-flex align-center cursor"
            :key="index"
            @click.prevent="handleSelectQuote(index)"
            v-for="(item, index) in insurers"
          )
            .list-quote__item__avatar
              v-img(:src="quoteIcon" width="108px")
            .list-quote__item__content(class="pl-6")
              p.mb-2(:class="`${item.id === selectedQuote.id ? 'accent' : 'darkgrey-1'}--text`") {{ item.unit }} {{ item.price | currency }} {{ `${item.id === selectedQuote.id ? '(Appointed)' : ''}` }}
              span.darkgrey-1--text {{ item.description }}
    quote-detail(:quote="selectedQuote")
  v-dialog(v-model="isShowConfirm" persistent max-width="750px" v-if="!selectedQuote")
    confirm-insurer(
      :quote="insurers[quoteIndex]"
      @confirm-insurer:close="handleCloseConfirm"
      @confirm-insurer:confirm="handleInsurerConfirm"
      v-if="isShowConfirm"
    )
</template>

<script>
import { AlertInline } from '@/components/common/notification'
import ConfirmInsurer from './ConfirmInsurer'
import QuoteDetail from './QuoteDetail'
import QuoteIcon from '@/assets/img/quote-icon.png'
import { formatMoneyMixin } from '@/core/helpers/mixins'

export default {
  name: 'ProjectQuote',
  components: {
    AlertInline,
    ConfirmInsurer,
    QuoteDetail
  },
  mixins: [formatMoneyMixin],
  props: {
    status: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isShowQuote: false,
      isShowConfirm: false,
      // this is demo list insurers, next time will get from API
      insurers: [
        {
          id: 1,
          name: 'Fusion',
          price: 50000,
          unit: 'AUD',
          description: 'Zurich buyer-side warranty and indemnity insurance',
          tax: 0.07,
          duty: 0.0215
        },
        {
          id: 2,
          name: 'Zurich',
          price: 55000,
          unit: 'AUD',
          description: 'Another small description that summarizes this insurer quote offered',
          tax: 0.08,
          duty: 0.0216
        },
        {
          id: 3,
          name: 'Allianz',
          price: 60000,
          unit: 'AUD',
          description: 'Another small description that summarizes this insurer quote offered',
          tax: 0.09,
          duty: 0.0217
        },
        {
          id: 4,
          name: 'Insurance',
          price: 65000,
          unit: 'AUD',
          description: 'Another small description that summarizes this insurer quote offered',
          tax: 0.09,
          duty: 0.0218
        },
        {
          id: 5,
          name: 'Max Life',
          price: 1270000,
          unit: 'AUD',
          description: 'Another small description that summarizes this insurer quote offered',
          tax: 0.08,
          duty: 0.0219
        },
        {
          id: 6,
          name: 'Aami',
          price: 120000,
          unit: 'AUD',
          description: 'Another small description that summarizes this insurer quote offered',
          tax: 0.07,
          duty: 0.03
        }
      ],
      selectedQuote: null,
      isPreview: false,
      quoteIndex: -1
    }
  },
  computed: {
    quoteIcon() {
      return QuoteIcon
    }
  },
  methods: {
    handleSelectQuote(index) {
      this.selectedQuote = this.insurers[index]
    },
    handleShowQuotes() {
      this.isShowQuote = true
    },
    handleSelectInsurer(index) {
      this.quoteIndex = index
      this.isShowConfirm = true
    },
    handleInsurerConfirm() {
      this.selectedQuote = this.insurers[this.quoteIndex]
      this.quoteIndex = -1
      this.handleCloseConfirm()
    },
    handleCloseConfirm() {
      this.isShowConfirm = false
    },
    handleAppoint() {
      this.isShowConfirm = true
    },
    handlerBack() {
      this.isPreview = false
      this.quoteIndex = -1
    },
    handleReviewFull(index) {
      this.quoteIndex = index
      this.isPreview = true
    },
    handlerChangeStatus(status) {
      this.$emit('quote:status', status)
    }
  }
}
</script>

<style lang="scss">
.list-quote {
  padding: 16px 24px !important;

  &__item {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    &__content {
      p {
        margin: 0;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
      }
    }
  }
}

.quotes-content {
  .selected-quote {
    &__title {
      &__select-quote {
        font-size: 16px;
      }

      &__name {
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
      }
    }
  }

  .preview {
    &__header {
      &__text {
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
      }

      &__btn {
        > button {
          padding: 0 32px !important;
        }
      }
    }
  }

  .list-insurers {
    &__card {
      margin-bottom: 16px;
      padding: 24px;
      background-color: #fff;
      border: 1px solid #dedede;
      border-radius: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      &__content {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        &__text {
          h3 {
            font-weight: 900;
            font-size: 24px;
            line-height: 29px;
          }

          span {
            line-height: 17px;
          }
        }

        &__btns {
          button {
            padding: 0 32px !important;
          }
        }
      }
    }
  }

  .description {
    margin: 0;
    color: $color-dark-grey-1;
    font-size: 14px;
    line-height: 17px;
  }

  .no-quote {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 154px;
    border: 1px solid $color-medium-gray;
    border-radius: 8px;

    .icon {
      opacity: 0.23;
    }

    span {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
