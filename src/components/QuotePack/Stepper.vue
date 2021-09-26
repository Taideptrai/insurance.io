<template lang="pug">
v-stepper.stepper(v-model="currentValue" vertical)
  template(v-for="step in steps")
    v-stepper-step(
      :key="step.stepNum"
      :editable="true"
      :complete="currentValue > step.stepNum"
      :complete-icon="null"
      :step="step.stepNum"
      edit-icon="done"
      @click="handleClickStep(step)"
    ) {{ step.label }}
    v-stepper-content(:step="step.stepNum")
      template(v-if="step.steps")
        .content.pl-3.text-no-wrap.test(
          v-for="item in step.steps"
          :key="item.stepNum"
          :class="{ active: item.stepNum === currentValue }"
          @click="handleClickStep(step, item)"
        ) {{ item.label }}
          .content__child(v-if="item && item.stepChildren")
            v-stepper-content(:step="step.stepNum")
              template(v-if="item && item.stepChildren")
                .content.pl-3.text-no-wrap.test(
                  v-for="child in item.stepChildren"
                  :key="child.id"
                  :class="{ active: child.stepNum === currentValue }"
                  @click="handleSrollTo(child)"
                ) {{ child.label }}

      //- v-stepper-content(:step="step.stepNum")
      //-   template(v-if="step.steps && step.steps.stepsChild")
      //-     p.pl-3.text-no-wrap(
      //-       v-for="item in step.steps.stepsChild"
      //-       :key="item.stepNum"
      //-       :class="{ active: item.stepNum === currentValue }"
      //-       @click="handleClickStep(step, item)"
      //-     ) {{ item.label }}
</template>

<script>
export default {
  name: 'Stepper',
  props: {
    steps: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    currentValue: {
      get() {
        const stepIds = this.$props.value.split('.')
        if (this.$props.steps.length === 0) return 0
        return this.findNode(this.$props.steps, stepIds)?.stepNum || 0
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleClickStep(...item) {
      this.$emit('input', item.map(i => i.id).join('.'))
    },
    findNode(steps, stepIds) {
      const id = stepIds.shift()
      const step = steps.find(s => id === s.id)
      return stepIds.length > 0 ? this.findNode(step.steps, stepIds) : step
    },
    handleSrollTo() {}
  }
}
</script>

<style lang="scss" scoped>
.stepper {
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
      &__label {
        color: inherit;

        &.v-stepper__step--active {
          color: $color-primary;
          font-weight: 500;
          text-shadow: none;
        }
      }

      &__step {
        padding: 17px 24px 8px !important;
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
        height: 500px !important;

        .content {
          height: 40px;
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
