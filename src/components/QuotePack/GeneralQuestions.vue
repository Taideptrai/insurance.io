<template lang="pug">
.general-questions
  card(title="Target")
    template(#content)
      v-form.form-group(v-model="validTarget" ref="formValidTarget")
        v-row
          v-col(md="12" class="form-control")
            text-field-static(
              label="Full name"
              name="full-name"
              :rules="rules.name"
              ref="name"
              v-model="target.fullname"
            )
          v-col(md="12" class="form-control" class="form-control")
            text-field-static(
              label="Registered number"
              name="registered-number"
              type="number"
              v-model="target.registeredNumber"
            )
          v-col(md="12" class="form-control")
            text-field-static(
              label="Registered Address"
              name="registered-address"
              :rules="rules.name"
              ref="registeredAddress"
              v-model="target.registeredAddress"
            )
          v-col(md="4" class="form-control")
            text-field-static(label="City" name="city" v-model="target.registeredCity")
          v-col(md="4" class="form-control")
            autocomplete-field(
              title="Country"
              name="country"
              :extraFields="['alpha_3']"
              dictionaryName="Country"
              itemValue="extraFields.alpha_3"
              :value="target.registeredCountry"
              @update:selected="selectedTargetCountry"
            )
          v-col(md="4" class="form-control")
            text-field-static(label="Zipcode" name="zipcode" v-model="target.registeredZipcode" type="number")
          v-col(md="12" class="form-control")
            autocomplete-field(
              title="Products service/sector"
              name="products-servicesector"
              dictionaryName="Sector"
              :extraFields="['code']"
              :orderBy="['code']"
              termField="code"
              :value="target.sector"
              @update:selected="selectedSector"
            )
          v-col(md="12" class="form-control")
            switch-button(
              name="overseas-selling-jurisdictions"
              title="Overseas Selling Jurisdictions"
              v-model="target.hasOverseasSellingJurisdictions"
            )
          v-col(v-show="target.hasOverseasSellingJurisdictions" md="4" class="form-control")
            autocomplete-field(
              title="Where?"
              name="Region"
              :extraFields="['alpha_3']"
              dictionaryName="Country"
              itemValue="extraFields.alpha_3"
              :value="target.overseasSellingJurisdictions"
              @update:selected="selectedJurisdictions"
            )
          v-col(md="12" class="form-control")
            switch-button(
              name="overseas-manufacturing-jurisdictions"
              title="Overseas Manufacturing Jurisdictions"
              v-model="target.hasOverseasManufacturingJurisdictions"
            )
          v-col(v-show="target.hasOverseasManufacturingJurisdictions" md="4" class="form-control")
            autocomplete-field(
              title="Where?"
              name="Region"
              dictionaryName="RegionJurisdiction"
              itemValue="extraFields.code"
              :extraFields="['code']"
              :orderBy="['code']"
              termField="code"
              :value="target.overseasManufacturingJurisdictions"
              @update:selected="selectedJurisdictionsRegion"
            )
          v-col(md="12" class="form-control")
            switch-button(
              title="Business to Business Sales"
              name="business-to-business-sales"
              v-model="target.b2bSales"
            )
          v-col(md="12" class="form-control")
            switch-button(
              name="business-to-consumer-sales"
              title="Business to Consumer Sales"
              v-model="target.b2cSales"
            )
  card(title="Seller")
    template(#content)
      v-form.form-group(v-model="validSeller" ref="formValidSeller")
        v-row
          v-col(md="12" class="form-control")
            switch-button(
              name="the-seller-is-same-as"
              title="The Seller is same as Target Group"
              v-model="sellerSameAsTarget"
            )
          v-col(md="12" class="form-control" class="form-control")
            switch-button(
              name="the-seller-is-the-insured"
              title="The Seller is the Insured Under the Policy"
              v-model="seller.isInsured"
            )
          v-col(md="12" class="form-control")
            text-field-static(label="Full name" :rules="rules.name" name="full-name" v-model="seller.fullname")
          v-col(md="12" class="form-control")
            text-field-static(
              label="Registered number"
              type="number"
              name="registered-number"
              v-model="seller.registeredNumber"
            )
          v-col(md="12" class="form-control")
            text-field-static(
              name="registered-address"
              :rules="rules.name"
              label="Registered Address"
              v-model="seller.registeredAddress"
            )
          v-col(md="4" class="form-control")
            text-field-static(label="City" name="city" v-model="seller.registeredCity")
          v-col(md="4" class="form-control")
            autocomplete-field(
              title="Country"
              name="country"
              dictionaryName="Country"
              :extraFields="['alpha_3']"
              itemValue="extraFields.alpha_3"
              :value="seller.registeredCountry"
              @update:selected="selectedSellerCountry"
            )
          v-col(md="4" class="form-control")
            text-field-static(label="Zipcode" name="zipcode" v-model="seller.registeredZipcode" type="number")
          v-col(md="12" class="form-control")
            text-field-static(
              name="sell-rollover"
              label="Sell rollover (%)"
              :rules="rules.numberRule"
              v-model="seller.sellRollover"
              type="number"
            )
          v-col(md="12" class="form-control")
            switch-button(name="seller-counsel" title="Seller Counsel" v-model="seller.isCounsel")
          v-col(md="12" class="form-control")
            switch-button(
              name="seller-accounting-financial-advisors"
              title="Seller Accounting / Financial Advisors"
              v-model="seller.isFinancialAdvisor"
            )
  card(title="Buyer")
    template(#content)
      v-form.form-group(v-model="validBuyer" ref="formValidBuyer")
        v-row
          v-col(md="12" class="form-control")
            switch-button(
              name="the-buyer-is-the-insured"
              title="The Buyer is the Insured under the policy"
              v-model="buyer.isInsured"
            )
          v-col(md="12" class="form-control")
            text-field-static(name="full-name" :rules="rules.name" label="Full name" v-model="buyer.fullname")
          v-col(md="12" class="form-control")
            text-field-static(
              name="registered-number"
              type="number"
              label="Registered number"
              v-model="buyer.registeredNumber"
            )
          v-col(md="12" class="form-control")
            text-field-static(
              name="registered-address"
              :rules="rules.name"
              label="Registered Address"
              v-model="buyer.registeredAddress"
            )
          v-col(md="4" class="form-control")
            text-field-static(label="City" name="city" v-model="buyer.registeredCity")
          v-col(md="4" class="form-control")
            autocomplete-field(
              title="Country"
              name="country"
              dictionaryName="Country"
              :extraFields="['alpha_3']"
              itemValue="extraFields.alpha_3"
              :value="buyer.registeredCountry"
              @update:selected="selectedBuyerCountry"
            )
          v-col(md="4" class="form-control")
            text-field-static(label="Zipcode" name="zipcode" v-model="buyer.registeredZipcode" type="number")
          v-col(md="12" class="form-control")
            switch-button(name="buyer-counsel" title="Buyer Counsel" v-model="buyer.isCounsel")
          v-col(md="12" class="form-control")
            switch-button(
              name="buyer-accounting-financial-advisors"
              title="Buyer Accounting / Financial Advisors"
              v-model="buyer.isFinancialAdvisor"
            )
  card(title="Transaction type")
    template(#content)
      v-form.form-group(v-model="validTransctionType")
        v-row
          v-col(md="5" class="form-control")
            switch-button(name="shares" title="Shares" v-model="transactionType.share")
        v-row
          v-col(md="5" class="form-control")
            text-field-static(
              name="sharesBeingAcquired"
              label="How-much-shares-being-acquired"
              type="number"
              :rules="rules.numberRule"
              v-model="percentageSharesAcquired"
            )
        v-row
          v-col(md="5" class="form-control")
            switch-button(name="asstes" title="Assets" v-model="transactionType.asstes")
  card(title="Transaction dates")
    template(#content)
      v-form.form-group
        v-row
          v-col(md="5" class="form-control")
            date-picker(title="Estimated signing dates" :dateDefault="estimatedSigningDate" @input="changeSigningDate")
        v-row
          v-col(md="5" class="form-control")
            date-picker(
              title="Estimated completion date"
              :dateDefault="estimatedCompletionDate"
              @input="changeCompletionDate"
            )
</template>

<script>
import {
  AutocompleteField,
  DatePicker,
  RadioButton,
  RatingField,
  SelectField,
  SwitchButton,
  TextField,
  TextFieldStatic
} from '@/components/common/form/fields'

import { Card } from '@/components/common/card'
import { mapGetters } from 'vuex'

export default {
  name: 'DigitalForm',
  components: {
    Card,
    SwitchButton,
    SelectField,
    RatingField,
    TextField,
    TextFieldStatic,
    RadioButton,
    AutocompleteField,
    DatePicker
  },
  props: {
    saving: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      validTarget: false,
      validSeller: false,
      validBuyer: false,
      validTransctionType: false,
      target: {
        fullname: '',
        registeredNumber: '',
        registeredAddress: '',
        registeredCity: '',
        registeredCountry: 'Afghanistan',
        registeredZipcode: '',
        sector: '',
        hasOverseasSellingJurisdictions: false,
        overseasSellingJurisdictions: '',
        hasOverseasManufacturingJurisdictions: false,
        overseasManufacturingJurisdictions: '',
        b2bSales: false,
        b2cSales: false
      },
      sellerSameAsTarget: false,
      percentageSharesAcquired: 0,
      seller: {
        isInsured: false,
        fullname: '',
        registeredNumber: '',
        registeredAddress: '',
        registeredCity: '',
        registeredCountry: 'Afghanistan',
        registeredZipcode: '',
        sellRollover: 0,
        isCounsel: false,
        isFinancialAdvisor: false
      },
      buyer: {
        isInsured: false,
        fullname: '',
        registeredNumber: '',
        registeredAddress: '',
        registeredCity: '',
        registeredCountry: 'Afghanistan',
        registeredZipcode: '',
        isCounsel: false,
        isFinancialAdvisor: false
      },
      transactionType: {
        share: false,
        asstes: ''
      },
      estimatedSigningDate: '',
      estimatedCompletionDate: '',
      rules: {
        name: [v => !!v || 'This field is required'],
        numberRule: [
          v => {
            if (!isNaN(parseFloat(v)) && v >= 0 && v <= 100) return true
            return 'Number has to be between 0 and 100'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('digitalForm', ['projectQuestion'])
  },
  watch: {
    projectQuestion(val) {
      if (val.generalQuestions) {
        delete val.generalQuestions.__typename
        delete val.generalQuestions.targetCompanies.edges[0].node.__typename
        delete val.generalQuestions.sellerCompany.__typename
        delete val.generalQuestions.buyerCompany.__typename

        this.target = val.generalQuestions.targetCompanies.edges[0].node
        this.target.registeredCountry = val.generalQuestions.targetCompanies.edges[0].node.registeredCountry.alpha3
        this.target.sector = val.generalQuestions.targetCompanies.edges[0].node.sector?.code || ''
        this.target.overseasSellingJurisdictions =
          val.generalQuestions.targetCompanies.edges[0].node.overseasSellingJurisdictions.edges[0].node.alpha3 || ''
        this.seller = val.generalQuestions.sellerCompany
        this.seller.registeredCountry = val.generalQuestions.sellerCompany.registeredCountry?.alpha3 || ''
        this.seller.sellRollover = `${val.generalQuestions.sellerCompany.sellRollover}`
        this.buyer = val.generalQuestions.buyerCompany
        this.buyer.registeredCountry = val.generalQuestions.buyerCompany.registeredCountry?.alpha3 || ''
        this.sellerSameAsTarget = val.generalQuestions.sellerSameAsTarget
        this.transactionType = val.generalQuestions.transactionType
        this.percentageSharesAcquired = `${val.generalQuestions.percentageSharesAcquired}`
        this.estimatedSigningDate = val.generalQuestions.estimatedSigningDate
        this.estimatedCompletionDate = val.generalQuestions.estimatedCompletionDate
      }
    },
    validTarget() {
      this.checkValidate()
    },
    validSeller() {
      this.checkValidate()
    },
    validBuyer() {
      this.checkValidate()
    },
    validTransctionType() {
      this.checkValidate()
    },
    saving(val) {
      if (val) {
        const data = {
          targetCompanies: [this.target],
          sellerCompany: this.seller,
          buyerCompany: this.buyer,
          transactionType: 'shares',
          sellerSameAsTarget: false,
          percentageSharesAcquired: Number(this.percentageSharesAcquired),
          estimatedSigningDate: this.estimatedSigningDate,
          estimatedCompletionDate: this.estimatedCompletionDate
        }
        if (!this.target.hasOverseasSellingJurisdictions) {
          delete data.overseasSellingJurisdictions
        }
        data.sellerCompany.sellRollover = Number(data.sellerCompany.sellRollover)

        data.targetCompanies.map(item => {
          if (!item.hasOverseasSellingJurisdictions) delete item.overseasSellingJurisdictions
          return item
        })

        const validFormValidTarget = this.$refs.formValidTarget.validate()
        const validFormValidSeller = this.$refs.formValidSeller.validate()
        const validFormValidBuyer = this.$refs.formValidBuyer.validate()

        if (validFormValidTarget && validFormValidSeller && validFormValidBuyer) {
          this.$emit('update:saveGeneral', data)
        } else {
          this.$emit('update:saveGeneral', false)
        }
      }
    }
  },
  mounted() {
    this.checkValidate()
  },
  methods: {
    changeCompletionDate(val) {
      this.estimatedCompletionDate = val
    },
    changeSigningDate(val) {
      this.estimatedSigningDate = val
    },
    selectedBuyerCountry(val) {
      this.buyer.registeredCountry = val
    },
    selectedTargetCountry(val) {
      this.target.registeredCountry = val
    },
    selectedSellerCountry(val) {
      this.seller.registeredCountry = val
    },
    selectedJurisdictionsRegion(val) {
      this.target.overseasManufacturingJurisdictions = val
    },
    selectedSector(val) {
      this.target.sector = val
    },
    selectedJurisdictions(val) {
      this.target.overseasSellingJurisdictions = val
    },
    checkValidate() {
      if (this.validTarget && this.validSeller && this.validBuyer && this.validTransctionType) {
        this.$emit('update:valid', true)
      } else {
        this.$emit('update:valid', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.general-questions {
  ::v-deep {
    .v-card {
      margin-bottom: 40px;
    }
  }
}

.form-control {
  padding: 0 12px;
}

.btn-add-company {
  text-transform: capitalize;
  border-top: 1px solid $color-medium-gray;
}
</style>
