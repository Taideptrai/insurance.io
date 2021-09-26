<template lang="pug">
v-row.quote-detail
  v-col(md="6")
    // just hard code for now, it will replace by data from API
    .quote-detail__card
      p.quote-detail__card__title Policy Information
      .quote-detail__card__content
        .quote-detail__card__content__name
          span Policy Number
        .quote-detail__card__content__value
          span 77778888
        .quote-detail__card__content__name
          span Policy Type
        .quote-detail__card__content__value
          span M&A (USD)
        .quote-detail__card__content__name
          span Start Date
        .quote-detail__card__content__value
          span 12:01 am on 12/12/2020
        .quote-detail__card__content__name
          span End Date
        .quote-detail__card__content__value
          span 12:01 am on 12/12/2022
        .quote-detail__card__content__name
          span Description
        .quote-detail__card__content__value
          span -
    .quote-detail__card
      p.quote-detail__card__title Insured Information
      .quote-detail__card__content
        .quote-detail__card__content__name
          span Purchase Group
        .quote-detail__card__content__value
          span Riddell’s Bay Pty Ltd
        .quote-detail__card__content__name
          span Address
        .quote-detail__card__content__value
          span Level 29, Chifley Tower, 2 Chifley Square, Sydney, 2000 NSW, Australia Broker: Honan, Level 9, IBM Centre, 60 City Road Southbank, VIC 3006, Australia
    .quote-detail__card
      p.quote-detail__card__title Insurance Broker
      .quote-detail__card__content
        .quote-detail__card__content__name
          span Broker Name
        .quote-detail__card__content__value
          span Honan
        .quote-detail__card__content__name
          span Address
        .quote-detail__card__content__value
          span Level 9, IBM Centre, 60 City Road Southbank, VIC 3006, Australia
    .quote-detail__card
      p.quote-detail__card__title Documents
      .quote-detail__card__document
        .quote-detail__card__document__file.d-flex
          v-icon.mr-2(color="accent" size="17") far fa-file-pdf
          span NBIL.pdf
        .quote-detail__card__document__file.d-flex
          v-icon.mr-2(color="accent" size="17") far fa-file-pdf
          span Policy_Wordings_Draft.pdf
        .quote-detail__card__document__file.d-flex
          v-icon.mr-2(color="accent" size="17") far fa-file-pdf
          span Warranty_Schedue_Draft.pdf
  v-col(md="6")
    .quote-detail__card
      p.quote-detail__card__title Premium
      .quote-detail__card__content
        .quote-detail__card__content__name
          span Total Premium
        .quote-detail__card__content__value
          span {{ quote.unit }} {{ total }}
        .quote-detail__card__content__name.quote-detail--allrow.pt-5
          span Premium Breakdown
        .quote-detail__card__content__name
          span Net Premium
        .quote-detail__card__content__value.text-right
          span {{ quote.unit }} {{ quote.price | currency }}
        .quote-detail__card__content__name.quote-detail--allrow
          v-divider.divider
        .quote-detail__card__content__name
          span Stamp Duty
        .quote-detail__card__content__value.text-right
          span {{ quote.unit }} {{ quote.price | currency }}
          p.quote-detail__card__content__value--tip ({{ quote.duty * 100 }}% of Net Premium)
        .quote-detail__card__content__name.quote-detail--allrow
          v-divider.divider
        .quote-detail__card__content__name
          span GST
        .quote-detail__card__content__value.text-right
          span {{ quote.unit }} {{ gts }}
          p.quote-detail__card__content__value--tip ({{ (quote.tax * 100).toFixed(2) }}% of Net Premium)
    .quote-detail__card
      p.quote-detail__card__title De Minimis
      .quote-detail__card__content
        .quote-detail__card__content__name
          span Title Capacity
        .quote-detail__card__content__value
          span AUD 10,000
        .quote-detail__card__content__name
          span Warranties
        .quote-detail__card__content__value
          span (0.1% of EV)
        .quote-detail__card__content__name
          span General and Tax
        .quote-detail__card__content__value
          span AUD 10,000
        .quote-detail__card__content__name
          span Warranties
        .quote-detail__card__content__value
          span (0.1% of EV)
    .quote-detail__card
      p.quote-detail__card__title Retention
      .quote-detail__card__content
        .quote-detail__card__content__name
          span Title Capacity
        .quote-detail__card__content__value
          span AUD 10,000
        .quote-detail__card__content__name
          span Warranties
        .quote-detail__card__content__value
          span (1% of EV)
        .quote-detail__card__content__name
          span General and Tax
        .quote-detail__card__content__value
          span AUD 100,000
        .quote-detail__card__content__name
          span Warranties
        .quote-detail__card__content__value
          span (1% of EV)
</template>

<script>
import { formatMoneyMixin } from '@/core/helpers/mixins'
import numeral from 'numeral'

export default {
  name: 'QuoteDetail',
  mixins: [formatMoneyMixin],
  props: {
    quote: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    gts() {
      return numeral(this.quote.price * this.quote.tax).format('0,0')
    },
    total() {
      const { duty, price, tax } = this.quote
      return numeral(price * (1 + tax + duty)).format('0,0')
    }
  }
}
</script>

<style lang="scss">
.quote-detail {
  &--allrow {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  &__card {
    margin-bottom: 16px;
    padding: 24px;
    padding-top: 27px;
    border: 1px solid $color-medium-gray;
    border-radius: 8px;

    &__title {
      margin-bottom: 19px;
      color: $color-dark-grey-1;
      font-weight: 600;
      font-size: 16px;
      line-height: 29px;
    }

    &__content {
      display: grid;
      grid-template-columns: 100px 1fr;
      row-gap: 18px;

      &__name {
        color: $color-dark-grey-1;
        font-weight: 500;
        letter-spacing: 0;
      }

      &__value {
        padding-left: 23px;
        color: $color-dark-grey-1;

        &--tip {
          margin-bottom: 0 !important;
          font-weight: 300;
          font-size: 12px;
          line-height: 14px;
        }
      }
    }

    &__document {
      &__file {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }

        span {
          color: $color-dark-grey-1;
        }
      }
    }
  }
}
</style>
