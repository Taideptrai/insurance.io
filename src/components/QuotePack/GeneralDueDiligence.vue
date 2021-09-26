<template lang="pug">
.general-due-diligence
  card(title="Target")
    template(#content)
      h4(class="color-primary mb-5") Ranking of rationale for acquiring the target
      v-form.form-group
        v-row
          v-col(md="12" class="form-control")
            autocomplete-field(
              title="1. Highest"
              name="highest"
              :extraFields="['code']"
              :orderBy="['code']"
              termField="code"
              dictionaryName="TargetAcquisitionRationale"
              itemValue="extraFields.code"
              :value="generalDueDiligence.rationaleRank1"
              @update:selected="evt => selectedTarget(evt, 'rationaleRank1')"
            )
          v-col(md="12" class="form-control" class="form-control")
            autocomplete-field(
              title="2. Higher"
              name="highest"
              :extraFields="['code']"
              :orderBy="['code']"
              termField="code"
              dictionaryName="TargetAcquisitionRationale"
              itemValue="extraFields.code"
              :value="generalDueDiligence.rationaleRank2"
              @update:selected="evt => selectedTarget(evt, 'rationaleRank2')"
            )
          v-col(md="12" class="form-control")
            autocomplete-field(
              title="3. High"
              name="highest"
              :extraFields="['code']"
              :orderBy="['code']"
              termField="code"
              dictionaryName="TargetAcquisitionRationale"
              itemValue="extraFields.code"
              :value="generalDueDiligence.rationaleRank3"
              @update:selected="evt => selectedTarget(evt, 'rationaleRank3')"
            )
          v-col(md="12" class="form-control")
            autocomplete-field(
              title="4. Medium"
              name="highest"
              :extraFields="['code']"
              :orderBy="['code']"
              termField="code"
              dictionaryName="TargetAcquisitionRationale"
              itemValue="extraFields.code"
              :value="generalDueDiligence.rationaleRank4"
              @update:selected="evt => selectedTarget(evt, 'rationaleRank4')"
            )
          v-col(md="12" class="form-control")
            autocomplete-field(
              title="5. Low"
              name="highest"
              :extraFields="['code']"
              :orderBy="['code']"
              termField="code"
              dictionaryName="TargetAcquisitionRationale"
              itemValue="extraFields.code"
              :value="generalDueDiligence.rationaleRank5"
              @update:selected="evt => selectedTarget(evt, 'rationaleRank5')"
            )
          v-col(md="12" class="form-control")
            autocomplete-field(
              title="6. Lower"
              name="highest"
              :extraFields="['code']"
              :orderBy="['code']"
              termField="code"
              dictionaryName="TargetAcquisitionRationale"
              itemValue="extraFields.code"
              :value="generalDueDiligence.rationaleRank6"
              @update:selected="evt => selectedTarget(evt, 'rationaleRank6')"
            )
          v-col(md="12" class="form-control")
            autocomplete-field(
              title="7. Lowest"
              name="highest"
              :extraFields="['code']"
              :orderBy="['code']"
              termField="code"
              dictionaryName="TargetAcquisitionRationale"
              itemValue="extraFields.code"
              :value="generalDueDiligence.rationaleRank7"
              @update:selected="evt => selectedTarget(evt, 'rationaleRank7')"
            )
          v-col(md="12" class="form-control")
            h4(class="color-primary") Does the Buyer operate businesses similar to that of the Target Company?
            radio-button(
              name="buyerOperateBusinesses"
              :choices="choices"
              v-model="generalDueDiligence.buyerSimilarOperations"
            )
          v-col(md="12" class="form-control")
            h4 How do you rate the buyer’s experience in the sector(s) in which the Target Group operates?
            helper-text-field(text="1 being the lowest and 5 being the highest")
            rating-field(
              name="rating"
              :value="generalDueDiligence.buyerSectorExperienceRank"
              v-model="generalDueDiligence.buyerSectorExperienceRank"
              @input="evt => selectedRating(evt, 'buyerSectorExperienceRank')"
            )
          v-col(md="12" class="form-control")
            h4 Have key risk issues been identified?
            radio-button(
              name="issuesBeenIdentified"
              :choices="choices"
              v-model="generalDueDiligence.hasOperationsKeyRiskIssues"
            )
          v-col(md="12" class="form-control" v-if="generalDueDiligence.hasOperationsKeyRiskIssues")
            h4(class="color-primary") What are the specific key risk issues identified and how are you gained comfort with these issues?
            v-textarea(outlined v-model="generalDueDiligence.operationsKeyRiskIssues")
          v-col(md="12" class="form-control")
            h4(class="color-primary") How do you rate the following risks in the target business?
            h4 Comercial
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDueDiligence.targetBusinessCommercialRisks"
              v-model="generalDueDiligence.targetBusinessCommercialRisks"
              @input="evt => selectedRating(evt, 'targetBusinessCommercialRisks')"
            )
          v-col(md="12" class="form-control")
            h4 Operational
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDueDiligence.targetBusinessOperationalRisks"
              v-model="generalDueDiligence.targetBusinessOperationalRisks"
              @input="evt => selectedRating(evt, 'targetBusinessOperationalRisks')"
            )
          v-col(md="12" class="form-control")
            h4 Financial
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDueDiligence.targetBusinessFinancialRisks"
              v-model="generalDueDiligence.targetBusinessFinancialRisks"
              @input="evt => selectedRating(evt, 'targetBusinessFinancialRisks')"
            )
          v-col(md="12" class="form-control")
            h4 Tax
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDueDiligence.targetBusinessTaxRisks"
              v-model="generalDueDiligence.targetBusinessTaxRisks"
              @input="evt => selectedRating(evt, 'targetBusinessTaxRisks')"
            )
          v-col(md="12" class="form-control")
            h4 Legal
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDueDiligence.targetBusinessLegalRisks"
              v-model="generalDueDiligence.targetBusinessLegalRisks"
              @input="evt => selectedRating(evt, 'targetBusinessLegalRisks')"
            )
          //- v-col(md="12" class="form-control")
          //-   h4 Employees
          //-   helper-text-field(text="(1 being the lowest and 5 being the highest)")
          //-   rating-field(name="rating" v-model="generalDueDiligence.employees")
          //- v-col(md="12" class="form-control")
          //-   h4 Material Contracts
          //-   helper-text-field(text="(1 being the lowest and 5 being the highest)")
          //-   rating-field(name="rating" v-model="generalDueDiligence.materialContracts")
          v-col(md="12" class="form-control")
            h4 Have key risk issues been identified?
            radio-button(
              name="issuesBeenIdentifiedEnd"
              :choices="choices"
              v-model="generalDueDiligence.hasKeyRiskIssues"
            )
          v-col(md="12" class="form-control" v-if="generalDueDiligence.hasKeyRiskIssues")
            h4(class="color-primary") What are the specific key risk issues identified and how are you gained comfort with these issues?
            v-textarea(outlined v-model="generalDueDiligence.keyRiskIssues")
</template>

<script>
import {
  AutocompleteField,
  RadioButton,
  RatingField,
  SelectField,
  SwitchButton,
  TextField,
  TextFieldStatic
} from '@/components/common/form/fields'

import { Card } from '@/components/common/card'
import { HelperTextField } from '@/components/common/fields'
import { mapGetters } from 'vuex'

export default {
  name: 'GeneralDueDiligence',
  components: {
    Card,
    SwitchButton,
    SelectField,
    RatingField,
    TextField,
    TextFieldStatic,
    RadioButton,
    HelperTextField,
    AutocompleteField
  },
  props: {
    saving: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      generalDueDiligence: {
        rationaleRank1: '',
        rationaleRank2: '',
        rationaleRank3: '',
        rationaleRank4: '',
        rationaleRank5: '',
        rationaleRank6: '',
        rationaleRank7: '',
        buyerSimilarOperations: false,
        buyerSectorExperienceRank: 0,
        hasOperationsKeyRiskIssues: false,
        operationsKeyRiskIssues: '',
        targetBusinessCommercialRisks: 0,
        targetBusinessOperationalRisks: 0,
        targetBusinessFinancialRisks: 0,
        targetBusinessTaxRisks: 0,
        targetBusinessLegalRisks: 0,
        // employees: 0,
        // materialContracts: 0,
        hasKeyRiskIssues: false,
        keyRiskIssues: ''
      },
      choices: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ],
      targetAcquisitionRationale: []
    }
  },
  computed: {
    ...mapGetters('digitalForm', ['projectQuestion'])
  },
  watch: {
    saving(val) {
      if (val) {
        if (!this.generalDueDiligence.hasOperationsKeyRiskIssues) {
          delete this.generalDueDiligence.operationsKeyRiskIssues
        } else {
          this.generalDueDiligence.operationsKeyRiskIssues = ''
        }
        if (!this.generalDueDiligence.hasKeyRiskIssues) {
          delete this.generalDueDiligence.keyRiskIssues
        } else {
          this.generalDueDiligence.keyRiskIssues = ''
        }
        this.$emit('update:saveGeneral', this.generalDueDiligence)
      }
    },
    projectQuestion(val) {
      this.generalDueDiligence = { ...val.generalDueDiligence }
      delete this.generalDueDiligence.__typename
      this.generalDueDiligence.buyerSectorExperienceRank = Number(
        this.generalDueDiligence.buyerSectorExperienceRank?.rating || 0
      )
      this.generalDueDiligence.targetBusinessCommercialRisks = Number(
        this.generalDueDiligence.targetBusinessCommercialRisks?.rating || 0
      )
      this.generalDueDiligence.targetBusinessOperationalRisks = Number(
        this.generalDueDiligence.targetBusinessOperationalRisks?.rating || 0
      )
      this.generalDueDiligence.targetBusinessFinancialRisks = Number(
        this.generalDueDiligence.targetBusinessFinancialRisks?.rating || 0
      )
      this.generalDueDiligence.targetBusinessTaxRisks = Number(
        this.generalDueDiligence.targetBusinessTaxRisks?.rating || 0
      )
      this.generalDueDiligence.targetBusinessLegalRisks = Number(
        this.generalDueDiligence.targetBusinessLegalRisks?.rating || 0
      )
      this.generalDueDiligence.rationaleRank1 = val.generalDueDiligence.rationaleRank1?.code || ''
      this.generalDueDiligence.rationaleRank2 = val.generalDueDiligence.rationaleRank2?.code || ''
      this.generalDueDiligence.rationaleRank3 = val.generalDueDiligence.rationaleRank3?.code || ''
      this.generalDueDiligence.rationaleRank4 = val.generalDueDiligence.rationaleRank4?.code || ''
      this.generalDueDiligence.rationaleRank5 = val.generalDueDiligence.rationaleRank5?.code || ''
      this.generalDueDiligence.rationaleRank6 = val.generalDueDiligence.rationaleRank6?.code || ''
      this.generalDueDiligence.rationaleRank7 = val.generalDueDiligence.rationaleRank7?.code || ''
    }
  },
  mounted() {
    this.$emit('update:valid', true)
  },
  methods: {
    handleInput() {},
    selectedTarget(val, fieldName) {
      this.generalDueDiligence[fieldName] = val
    },
    selectedRating(val, fieldName) {
      this.generalDueDiligence[fieldName] = val
    }
  }
}
</script>

<style lang="scss" scoped>
.general-due-diligence {
  ::v-deep {
    .v-card {
      margin-bottom: 40px;
    }
  }
}

.form-control {
  padding: 0 12px;
}
</style>
