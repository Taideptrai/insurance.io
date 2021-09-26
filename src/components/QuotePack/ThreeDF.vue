<template lang="pug">
.three-df(class="px-1 pr-2")
  v-alert(class="alert-info mt-6")
    template(#prepend)
      v-icon(class="mr-3 primary--text") info
      span {{ $t('message.header-note') }}
  .d-flex(v-if="!loading" class="justify-end my-6")
    v-btn(outlined large class="uppercase mr-6" color="primary" :loading="saving" :disabled="!canSave" @click="handleSave") 
      v-icon(class="mr-2") save
      span {{ $t('action.save-changes') }}
    v-btn(large class="uppercase" color="primary" @click="handleSendToReview")
      v-icon(class="mr-2") send
      span {{ $t('action.send-to-review') }}

  .d-flex
    v-skeleton-loader(
      v-if="loading"
      type="chip,chip,chip,chip,list-item,list-item,list-item-three-line,list-item,list-item-three-line,list-item"
      style="width: 300px"
    )
    form-stepper(v-else :steps="steps" v-model="step" @update:step="handleUpdateStep")

    v-skeleton-loader(v-if="loading" class="flex-grow-1" type="actions,chip,chip,image,chip,image,chip,image,actions")
    .form-wapper(v-else class="flex-grow-1")
      digital-form(
        v-if="curtChapter && !is3Df"
        v-model="chapterData"
        :name="curtChapter.code"
        :title="curtChapter.title"
        :sections="sections"
        @update:valid="handleUpdateValidate"
      )

      component(
        :is="componentName"
        :saving="saving"
        @update:saveGeneral="saveGeneral"
        @update:valid="handleUpdateValidate"
        v-else
      )

      .d-flex(class="justify-end my-6")
        v-btn(outlined large class="uppercase mr-6" color="primary" :loading="saving" :disabled="!canSave" @click="handleSave") 
          v-icon(class="mr-2") save
          span {{ $t('action.save-changes') }}
        v-btn(large class="uppercase" color="primary" @click="handleSendToReview")
          v-icon(class="mr-2") send
          span {{ $t('action.send-to-review') }}
</template>

<script>
import { DigitalForm, FormStepper } from '@/components/DigitalForm'

import { Card } from '@/components/common/card'
import GeneralDueDiligence from './GeneralDueDiligence.vue'
import GeneralQuestions from './GeneralQuestions.vue'
// import GeneralDueDiligence2DF from './GeneralDueDiligence2DF'
import { mapGetters } from 'vuex'
import { pick } from 'lodash'

export default {
  name: 'ThreeDF',
  components: {
    Card,
    DigitalForm,
    FormStepper,
    GeneralQuestions,
    GeneralDueDiligence
    // GeneralDueDiligence2DF
  },
  data() {
    return {
      projectHeader: null,
      originHeaderHeight: 0,
      bodyRect: 0,
      step: 1,
      loading: true,
      saving: false,
      canSave: false,
      isSave: false,
      dataSave: {},
      is3Df: true
    }
  },
  computed: {
    ...mapGetters('digitalForm', ['curtCategory', 'curtChapter', 'steps', 'curtStep', 'curtChapterData']),
    sections() {
      return this.curtChapter
        ? pick(this.curtChapter, ['summarySection', 'initialAssessmentSection', 'warrantySections'])
        : {}
    },
    chapterData: {
      get() {
        return this.curtChapterData
      },
      set(val) {
        this.$store.dispatch('digitalForm/updateCurtChapterData', val)
      }
    },
    componentName() {
      switch (this.curtChapter.code) {
        case 'chapter-general-questions':
          return 'GeneralQuestions'
        case 'chapter-general-due-diligence':
          // return 'GeneralDueDiligence2DF'
          return 'GeneralDueDiligence'
        default:
          return 'GeneralQuestions'
      }
    }
  },
  watch: {
    curtStep(val) {
      this.step = val
    },
    curtChapter(val) {
      switch (val.code) {
        case 'chapter-general-questions':
          this.is3Df = true
          break
        case 'chapter-general-due-diligence':
          this.is3Df = true
          break
        default:
          this.is3Df = false
          break
      }
    }
  },
  mounted() {
    this.$store.commit('digitalForm/setProjectId', this.$route.params?.id)
    this.$store.dispatch('digitalForm/getFormDefinition').finally(() => (this.loading = false))
  },
  methods: {
    async saveGeneral(data, is2df) {
      let dataSave = { ...data }
      try {
        if (!data) {
          this.saving = false
        } else {
          if (this.curtChapter.code === 'chapter-general-questions') {
            await this.$store.dispatch('digitalForm/saveChapterDataGeneralQuestions', {
              projectId: this.$route.params?.id,
              data
            })
            this.saving = false
          } else if (this.curtChapter.code === 'chapter-general-due-diligence') {
            dataSave.buyerSectorExperienceRank = `${dataSave.buyerSectorExperienceRank}`
            dataSave.targetBusinessCommercialRisks = `${dataSave.targetBusinessCommercialRisks}`
            dataSave.targetBusinessOperationalRisks = `${dataSave.targetBusinessOperationalRisks}`
            dataSave.targetBusinessFinancialRisks = `${dataSave.targetBusinessFinancialRisks}`
            dataSave.targetBusinessTaxRisks = `${dataSave.targetBusinessTaxRisks}`
            dataSave.targetBusinessLegalRisks = `${dataSave.targetBusinessLegalRisks}`
            if (is2df) {
              await this.$store.dispatch('digitalForm/saveChapterDataGeneralDisclosure', {
                projectId: this.$route.params?.id,
                dataSave
              })
              this.saving = false
            } else {
              await this.$store.dispatch('digitalForm/saveChapterDataGeneralDueDiligence', {
                projectId: this.$route.params?.id,
                dataSave
              })
              this.saving = false
            }
          }
        }
      } catch (error) {
        this.saving = false
      }
    },
    handleUpdateValidate(evt) {
      this.canSave = evt
    },
    async handleSave() {
      this.saving = true
      if (!this.is3Df) {
        await this.$store.dispatch('digitalForm/saveChapterData', this.$route.params?.id)
        this.saving = false
      }
    },
    handleSendToReview() {
      // NOTE: wait for the API
    },
    handleUpdateStep(code) {
      ;/^chapter-/.test(code)
        ? this.$store.dispatch('digitalForm/setCurtChapter', code)
        : this.$store.dispatch('digitalForm/setCurtCategory', code)
    }
  }
}
</script>

<style lang="scss" scoped>
.three-df {
  height: 100%;
  overflow: auto;

  ::v-deep {
    .v-alert {
      font-size: rem(14px);
    }

    .v-skeleton-loader__chip {
      opacity: 0;
    }
  }

  .alert-info {
    background: rgba($color: $color-primary, $alpha: 0.1);
    border-radius: 8px;
  }

  h1 {
    margin-bottom: 40px;
    font-size: rem(32px);
    font-family: 'Space Grotesk', sans-serif;
  }
}
</style>

<i18n>
{
  "en": {
    "message": {
      "header-note": "The Seller and the Buyer, with the assistance of their Advisors, fill out, review and sign these online questionnaires and upload key documents / information. The Seller provides access to its disclosed information, rates his / her level of comfort level with this disclosure, and highlights any known breaches. The Buyer shares the due diligence reports, his / her comfort level with the adequacy and findings of due diligence conducted, and highlights its key risk issues."
    },
    "action": {
      "save-changes": "save changes",
      "send-to-review": "send to review",
      "back": "back",
      "next": "next"
    }
  }
}
</i18n>
