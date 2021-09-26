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
              :value="generalDisclosure.rationaleRank1"
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
              :value="generalDisclosure.rationaleRank2"
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
              :value="generalDisclosure.rationaleRank3"
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
              :value="generalDisclosure.rationaleRank4"
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
              :value="generalDisclosure.rationaleRank5"
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
              :value="generalDisclosure.rationaleRank6"
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
              :value="generalDisclosure.rationaleRank7"
              @update:selected="evt => selectedTarget(evt, 'rationaleRank7')"
            )
          v-col(md="12" class="form-control")
            h4(class="color-primary") Does the Buyer operate businesses similar to that of the Target Company?
            radio-button(
              name="buyerOperateBusinesses"
              :choices="choices"
              v-model="generalDisclosure.buyerSimilarOperations"
            )
          v-col(md="12" class="form-control")
            h4 How do you rate the buyer’s experience in the sector(s) in which the Target Group operates?
            helper-text-field(text="1 being the lowest and 5 being the highest")
            rating-field(
              name="rating"
              :value="generalDisclosure.buyerSectorExperienceRank"
              v-model="generalDisclosure.buyerSectorExperienceRank"
              @input="evt => selectedRating(evt, 'buyerSectorExperienceRank')"
            )
          v-col(md="12" class="form-control")
            h4 Have key risk issues been identified?
            radio-button(
              name="issuesBeenIdentified"
              :choices="choices"
              v-model="generalDisclosure.hasOperationsKeyRiskIssues"
            )
          v-col(md="12" class="form-control" v-if="generalDisclosure.hasOperationsKeyRiskIssues")
            h4(class="color-primary") What are the specific key risk issues identified and how are you gained comfort with these issues?
            v-textarea(outlined v-model="generalDisclosure.operationsKeyRiskIssues")
          v-col(md="12" class="form-control")
            h4(class="color-primary") How do you rate the following risks in the target business?
            h4 Comercial
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDisclosure.targetBusinessCommercialRisks"
              v-model="generalDisclosure.targetBusinessCommercialRisks"
              @input="evt => selectedRating(evt, 'targetBusinessCommercialRisks')"
            )
          v-col(md="12" class="form-control")
            h4 Operational
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDisclosure.targetBusinessOperationalRisks"
              v-model="generalDisclosure.targetBusinessOperationalRisks"
              @input="evt => selectedRating(evt, 'targetBusinessOperationalRisks')"
            )
          v-col(md="12" class="form-control")
            h4 Financial
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDisclosure.targetBusinessFinancialRisks"
              v-model="generalDisclosure.targetBusinessFinancialRisks"
              @input="evt => selectedRating(evt, 'targetBusinessFinancialRisks')"
            )
          v-col(md="12" class="form-control")
            h4 Tax
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDisclosure.targetBusinessTaxRisks"
              v-model="generalDisclosure.targetBusinessTaxRisks"
              @input="evt => selectedRating(evt, 'targetBusinessTaxRisks')"
            )
          v-col(md="12" class="form-control")
            h4 Legal
            helper-text-field(text="(1 being the lowest and 5 being the highest)")
            rating-field(
              name="rating"
              :value="generalDisclosure.targetBusinessLegalRisks"
              v-model="generalDisclosure.targetBusinessLegalRisks"
              @input="evt => selectedRating(evt, 'targetBusinessLegalRisks')"
            )
          //- v-col(md="12" class="form-control")
          //-   h4 Employees
          //-   helper-text-field(text="(1 being the lowest and 5 being the highest)")
          //-   rating-field(name="rating" v-model="generalDisclosure.employees")
          //- v-col(md="12" class="form-control")
          //-   h4 Material Contracts
          //-   helper-text-field(text="(1 being the lowest and 5 being the highest)")
          //-   rating-field(name="rating" v-model="generalDisclosure.materialContracts")
          v-col(md="12" class="form-control")
            h4 Have key risk issues been identified?
            radio-button(
              name="issuesBeenIdentifiedEnd"
              :choices="choices"
              v-model="generalDisclosure.hasKeyRiskIssues"
            )
          v-col(md="12" class="form-control" v-if="generalDisclosure.hasKeyRiskIssues")
            h4(class="color-primary") What are the specific key risk issues identified and how are you gained comfort with these issues?
            v-textarea(outlined v-model="generalDisclosure.keyRiskIssues")
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
  name: 'GeneralDisclosure',
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
      generalDisclosure: {
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
        keyRiskIssues: '',
        is2df: true
      },
      choices: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ],
      targetAcquisitionRationale: []
    }
  },
  computed: {
    ...mapGetters('digitalForm', ['projectQuestion2df'])
  },
  watch: {
    saving(val) {
      if (val) {
        if (!this.hasKeyRiskIssues) {
          delete this.generalDisclosure.keyRiskIssues
        } else {
          this.generalDisclosure.keyRiskIssues = ''
        }
        this.$emit('update:saveGeneral', this.generalDisclosure, true)
      }
    },
    projectQuestion2df(val) {
      if (val.generalDisclosure) {
        this.generalDisclosure = { ...val.generalDisclosure }
        delete this.generalDisclosure.__typename
        this.generalDisclosure.buyerSectorExperienceRank = Number(
          this.generalDisclosure.buyerSectorExperienceRank?.rating || 0
        )
        this.generalDisclosure.targetBusinessCommercialRisks = Number(
          this.generalDisclosure.targetBusinessCommercialRisks?.rating || 0
        )
        this.generalDisclosure.targetBusinessOperationalRisks = Number(
          this.generalDisclosure.targetBusinessOperationalRisks?.rating || 0
        )
        this.generalDisclosure.targetBusinessFinancialRisks = Number(
          this.generalDisclosure.targetBusinessFinancialRisks?.rating || 0
        )
        this.generalDisclosure.targetBusinessTaxRisks = Number(
          this.generalDisclosure.targetBusinessTaxRisks?.rating || 0
        )
        this.generalDisclosure.targetBusinessLegalRisks = Number(
          this.generalDisclosure.targetBusinessLegalRisks?.rating || 0
        )
        this.generalDisclosure.rationaleRank1 = val.generalDisclosure.rationaleRank1?.code || ''
        this.generalDisclosure.rationaleRank2 = val.generalDisclosure.rationaleRank2?.code || ''
        this.generalDisclosure.rationaleRank3 = val.generalDisclosure.rationaleRank3?.code || ''
        this.generalDisclosure.rationaleRank4 = val.generalDisclosure.rationaleRank4?.code || ''
        this.generalDisclosure.rationaleRank5 = val.generalDisclosure.rationaleRank5?.code || ''
        this.generalDisclosure.rationaleRank6 = val.generalDisclosure.rationaleRank6?.code || ''
        this.generalDisclosure.rationaleRank7 = val.generalDisclosure.rationaleRank7?.code || ''
      }
    }
  },
  mounted() {
    this.$emit('update:valid', true)
  },
  methods: {
    handleInput() {},
    selectedTarget(val, fieldName) {
      this.generalDisclosure[fieldName] = val
    },
    selectedRating(val, fieldName) {
      this.generalDisclosure[fieldName] = val
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
