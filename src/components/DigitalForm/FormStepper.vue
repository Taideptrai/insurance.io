<template lang="pug">
v-dialog(v-model="dialog" persistent max-width="290")
  template(v-slot:activator="{ on, attrs }")
    v-stepper.form-stepper(vertical v-model="stepModel")
      template(v-for="step in steps")
        v-stepper-step(
          v-if="isAvailableStep(step.code)"
          :key="step.num"
          :editable="value > step.num"
          :complete="value > step.num"
          :complete-icon="null"
          :step="step.icon"
          edit-icon="done"
          class="cursor-pointer"
          @click="showDialogConfirm(step)"
        ) {{ step.title }}
        v-stepper-content(:step="step.num")
          template(v-for="item in step.steps")
            p.pl-3.text-no-wrap(
              v-if="isAvailableStep(`${step.code}.${item.code}`)"
              :key="item.num"
              :class="{ active: item.num === value }"
              @click="showDialogConfirm(item)"
            ) {{ item.menuTitle }}
  v-card
    v-card-text
      span(class="pt-5 d-block text-center") Do you want to leave this page?
    v-card-actions
      v-spacer(class="text-right")
        v-btn(text @click="dialog = false")
          span Cancel
        v-btn(color="cyan" text @click="handleChangeStep")
          span(class="color-primary") Confirm
</template>
<script>
import { chain, isPlainObject } from 'lodash'

import { ProjectApi } from '@/core/api'

export default {
  name: 'FormStepper',
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      stepModel: 0,
      allSectionsGranted: false,
      availableStep: ['general-questions', 'general-due-diligence', 'review-and-sign'],
      checkConfirm: true,
      dialog: false,
      dataStep: {}
    }
  },
  beforeMount() {
    ProjectApi.whoAmI(this.$route.params.id).then(res => {
      const key = chain(res)
        .keys()
        .filter(v => isPlainObject(res[v]))
        .get('0')
        .value()
      switch (key) {
        case 'buyer':
        case 'seller':
        case 'buyerPrincipalAdvisor':
        case 'sellerPrincipalAdvisor': {
          this.allSectionsGranted = true
          break
        }
        case 'buyerSecondaryAdvisor':
        case 'sellerSecondaryAdvisor': {
          if (res[key].allSectionsGranted) {
            this.allSectionsGranted = true
            return
          }
          this.availableStep = chain(res[key].sectionsGranted)
            .map(v => v.split('.'))
            .flatten()
            .uniq()
            .concat(this.availableStep, res[key].sectionsGranted)
            .value()
          break
        }
        default:
          console.error('Cannot handle case ', key) // eslint-disable-line
      }
      this.stepModel = this.$props.value
    })
  },
  methods: {
    showDialogConfirm(data) {
      this.dialog = true
      this.dataStep = data
    },
    handleChangeStep() {
      // Reset step progress first
      this.stepModel = 1
      this.$emit('input', this.dataStep.num)
      this.$emit('update:step', this.dataStep.code)
      this.dialog = false
    },
    isAvailableStep(code) {
      return this.allSectionsGranted || this.availableStep.includes(code)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-stepper {
  position: sticky;
  top: 0;
  min-width: max-content;
  height: fit-content;
  box-shadow: none;

  ::v-deep {
    .v-ripple__container {
      display: none !important;
    }

    .v-stepper {
      &__content {
        margin-left: 11.5px;
      }

      &__label {
        color: inherit;

        &.v-stepper__step--active {
          color: $color-primary;
          font-weight: 500;
          text-shadow: none;
        }
      }

      &__step {
        padding: 16px 24px 8px 0 !important;
        background: transparent !important;

        &__step .v-icon {
          font-size: 0.75rem;
        }

        &:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
          .v-stepper__step__step {
          color: $color-dark-grey;
          background-color: $color-white;
          border: 1px solid $color-dark-grey;
        }
      }

      &__wrapper {
        height: auto !important;

        p {
          cursor: pointer;

          &:nth-last-child(1) {
            margin-bottom: 0;
          }

          &.active {
            color: $color-primary;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
