<template lang="pug">
.form-content
  //- .state.mb-10(v-if="isSetup")
  //-   .state__card.active
  //-     .bg-project-project_setup.state__card--image
  //-       div
  //-         span.state__card__status Open
  //-       div
  //-         span.state__card__stage Project Setup
  //-   .state__card.not-active
  //-     .bg-project-tab-quote_pack.state__card--image
  //-       div
  //-         span.state__card__status Filling Forms
  //-       div
  //-         span.state__card__stage Quote Pack
  //-   .state__card.not-active
  //-     .bg-project-tab-binder_pack.state__card--image
  //-       div
  //-         span.state__card__stage Binder Pack
  //-   .state__card.not-active
  //-     .bg-project-tab-signing_and_completion.state__card--image
  //-       div
  //-         span.state__card__stage Signing & Completion
  alert-inline.mb-8(
    type="warning"
    text="You must appoint an Principal Advisor lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut nulla consequat, ullamcorper erat eget, viverra massa. Ut in turpis at elit sagittis imperdiet at vitae nisl. Aliquam erat volutpat. Nam in nisi pulvinar, convallis diam at, accumsan magna."
    v-if="isSetup && data.creatorRole.indexOf('advisor') > -1"
  )
  .text-right.mb-8(v-if="isSetup")
    v-btn.save-change(
      color="accent"
      min-height="48px"
      :class="`${canEdit ? '' : 'disabled'}`"
      @click.prevent="handleEdit"
    )
      v-icon.material-icons-outlined(left size="16px") save
      span.white--text(color="white") save changes

  v-form(v-model="isValid" ref="form" v-if="!isInit")
    project-form-card(title="Project Details" icon="check")
      template(v-scope="props")
        v-row
          v-col(md="6" sm="12")
            text-field(
              v-model="data.name"
              label="Project name*"
              name="name"
              :rules="rules.name"
              append-icon="check"
              hide-details="auto"
            )
          v-col(md="12" cols)
            v-textarea(
              v-model="data.summary"
              label="Project description"
              name="summary"
              color="accent"
              rows="4"
              outlined
              hide-details
              no-resize
            )
          v-col(md="12")
            .setup-content(v-if="isSetup")
              p.setup-content--title.mb-2 Who am I in this project?
              p.setup-content--text {{ getRole }}
            v-radio-group.radio-group(v-model="data.creatorRole" row hide-details name="role" v-if="!isSetup")
              template(slot="label")
                span.darkgrey-1--text Who am i in this project?*
              .content-radio
                v-radio(:value="r.value" :key="r.value" color="accent" v-for="r in roles")
                  template(slot="label")
                    span.darkgrey-1--text {{ r.label }}
    project-form-card(title="Policy" icon="check")
      template(v-scope="props")
        v-row
          v-col(md="12" cols)
            .setup-content(v-if="isSetup")
              p.setup-content--title.mb-2 Please select the policy type
              p.setup-content--text {{ getPolicyType }}
            v-radio-group.radio-group(v-model="data.policyType" row hide-details name="policyType" v-if="!isSetup")
              template(slot="label")
                span.darkgrey-1--text Please select the policy type
              .content-radio
                v-radio(:value="p.value" :key="p.value" color="accent" v-for="p in policyTypes")
                  template(slot="label")
                    span.darkgrey-1--text {{ p.label }}
          v-col(md="12" cols)
            .setup-content(v-if="isSetup")
              p.setup-content--title.mb-2 Who is paying for the policy?
              p.setup-content--text {{ getPayingPolicy }}
            v-radio-group.radio-group(v-model="payingPolicy" row hide-details name="payingPolicy" v-if="!isSetup")
              template(slot="label")
                span.darkgrey-1--text Who is paying for the policy?
              .content-radio
                v-radio(:value="p.value" :key="p.value" color="accent" v-for="p in policyPayings")
                  template(slot="label")
                    span.darkgrey-1--text {{ p.label }}
        v-row(v-if="payingPolicy === 'custom_percentage'")
          v-col(md="6" cols)
            text-field(
              :value="data.buyerPaymentPercent"
              :debounce-time="800"
              label="Buyer"
              type="number"
              :readonly="isSetup"
              name="buyerPaymentPercent"
              hide-details="auto"
              @input="handleBuyerPaymentPercent"
            )
          v-col(md="6" cols)
            text-field(
              :value="data.sellerPaymentPercent"
              :debounce-time="800"
              label="Seller"
              :readonly="isSetup"
              type="number"
              name="sellerPaymentPercent"
              hide-details="auto"
              @input="handleSellerPaymentPercent"
            )
    project-form-card(title="Participants" icon="check")
      template(v-slot="props")
        p.title.seller-buyer.darkgrey-1--text(
          v-if="data.creatorRole.indexOf('buyer') > -1 || data.creatorRole.indexOf('advisor') > -1"
        ) Seller
        v-row(v-if="data.creatorRole.indexOf('buyer') > -1 || data.creatorRole.indexOf('advisor') > -1")
          v-col(md="6" cols)
            text-field(
              v-model="data.seller.email"
              label="Seller's e-mail*"
              name="sellerMail"
              :rules="rules.seller"
              append-icon="check"
              hide-details="auto"
              ref="sellerMail"
              @blur="handleBlurEmailSeller"
            )
          v-col(md="6" cols v-if="!isSetup")
            alert-inline(
              icon="warning_amber"
              type="warning"
              text="User not found. We will send an invite to create a new account and join the project."
              v-if="data.seller.email.length > 0 && !isSellerEmail && isValidSellerEmail"
            )
            alert-inline(
              :iconImage="emptyAvatar"
              text="will be invited to the project as the Seller"
              :title="getTitleSellerEmail"
              v-if="data.seller.email.length > 0 && isSellerEmail && isValidSellerEmail"
            )
        p.title.seller-buyer.darkgrey-1--text(
          v-if="data.creatorRole.indexOf('seller') > -1 || data.creatorRole.indexOf('advisor') > -1"
        ) Buyer
        v-row(v-if="data.creatorRole.indexOf('seller') > -1 || data.creatorRole.indexOf('advisor') > -1")
          v-col(md="6" cols)
            text-field(
              v-model="data.buyer.email"
              label="Buyer's e-mail*"
              name="buyerMail"
              :rules="rules.buyer"
              ref="buyerMail"
              append-icon="check"
              hide-details="auto"
              @blur="handleBlurEmailBuyer"
            )
          v-col(md="6" cols v-if="!isSetup")
            alert-inline(
              icon="warning_amber"
              type="warning"
              text="User not found. We will send an invite to create a new account and join the project."
              v-if="data.buyer.email.length > 0 && !isBuyerEmail && isValidBuyerEmail"
            )
            alert-inline(
              :iconImage="emptyAvatar"
              :title="getTitleBuyerEmail"
              text="will be invited to the project as the Buyer"
              v-if="data.buyer.email.length > 0 && isBuyerEmail && isValidBuyerEmail"
            )
        v-row
          v-col(md="12" cols)
            alert-inline(
              type="info"
              text="You may already have legal, financial, insurance and specialist Advisors supporting you on your transaction. Please nominate one of them as your Principal SME M&A Insurance Advisor, who can be very helpful to you in securing a fulsome protection. You can also appoint multiple (Support) Advisors to assist you. Alternatively, you can also appoint an Advisor from the list of approved io.insure Partner Advisors."
            )
        p.title.darkgrey-1--text.mt-8(v-if="data.creatorRole.indexOf('advisor') < 0") My principal advisor
        .padvisor(v-if="data.creatorRole.indexOf('advisor') < 0")
          .padvisor__content
            v-switch.ma-0(
              class="mb-4"
              v-model="data[curPrincipal].isSuggest"
              color="accent"
              hide-details
              v-if="data.creatorRole.indexOf('advisor') < 0"
            )
              template(slot="label")
                span.pl-2.switch-text(:class="`${data[curPrincipal].isSuggest ? 'accent' : 'darkgrey-1'}--text`") I don't currently have a Support Advisor appointed. Can you please suggest to me an io.insure Partner Advisor?
            advisor(v-model="data[curPrincipal]")
          .padvisor__close(class="cursor")
            v-icon(color="darkgrey-1" size="16px" @click.prevent="handleClearPrincipal") close
        //- v-switch.mb-4(
        //-   v-model="data[curPrincipal].isSuggest"
        //-   color="accent"
        //-   hide-details
        //-   v-if="data.creatorRole.indexOf('advisor') < 0"
        //- )
        //-   template(slot="label")
        //-     span.pl-2.switch-text(:class="`${data[curPrincipal].isSuggest ? 'accent' : 'darkgrey-1'}--text`") I don't currently have a Support Advisor appointed. Can you please suggest to me an io.insure Partner Advisor?
        //- .padvisor(v-if="data.creatorRole.indexOf('advisor') < 0")
        //-   .padvisor--content
        //-     advisor(v-model="data[curPrincipal]")
        //-   .padvisor--close.cursor
        //-     v-icon(color="darkgrey-1" size="16px" @click.prevent="handleClearPrincipal") close
        p.title.darkgrey-1--text.mt-8 My support advisor(s)
        .padvisor(v-for="(item, index) in data[curSecondary]" v-if="!isSetup || !data[curSecondary][index].isDelete")
          .padvisor__content
            v-switch.switch.mb-4.mt-0(v-model="data[curSecondary][index].isSuggest" color="accent" hide-details)
              template(slot="label")
                span.pl-2.switch-text(:class="`${item.isSuggest ? 'accent' : 'darkgrey-1'}--text`") I don't currently have a Support Advisor appointed. Can you please suggest to me an io.insure Partner Advisor?
            advisor(
              v-model="data[curSecondary][index]"
              is-second
              :is-setup="isSetup"
              @changed="handleChangedSupport(index)"
            )
          .padvisor__close(class="cursor")
            v-icon(color="darkgrey-1" size="16px" @click.prevent="handleRemoveSupport(index)") close
        v-divider.mt-6.mb-8
        v-btn.add-support-btn(color="accent" outlined large @click.prevent="handleAddSupport")
          v-icon(left color="accent") add
          span Add another support advisor
    project-form-card(title="Hold Harmless Letters" icon="check")
      template(v-scope="props")
        p.title.darkgrey-1--text.ma-0 Your advisors may require io.insure to execute Hold Harmless Letters. In this case, please upload them here for signature.(maximun 20Mb per file)
        v-row.mt-6
          v-col.pa-2(
            lg="3"
            md="4"
            sm="6"
            cols="12"
            :key="`cur_${index}`"
            v-for="(f, index) in curHoldLetters"
            v-if="!f.isDelete"
          )
            .hold-letter-content
              v-icon.icon.material-icons-outlined(color="darkgrey-1" size="18px") description
              span.file-name {{ f.name }}
              v-icon.icon-remove.cursor(
                color="darkgrey-1"
                size="18px"
                @click.prevent="handleRemoveCurHoldLetter(index)"
              ) close
          v-col.pa-2(lg="3" md="4" sm="6" cols="12" :key="index" v-for="(f, index) in holdLetters")
            .hold-letter-content
              v-icon.icon.material-icons-outlined(color="darkgrey-1" size="18px") description
              span.file-name {{ f.name }}
              v-icon.icon-remove.cursor(color="darkgrey-1" size="18px" @click.prevent="handleRemoveHoldLetter(index)") close
        upload-field.mt-6(
          label="Drag your file(s) here "
          :max-size="20"
          accept="application/pdf"
          multiple
          @input="handleHoldHarmlessFile"
        )
    //- project-form-card(title="Share access of your Virtual Data Room (optional)" icon="check")
    //-   template(v-scope="props")
    //-     p.title.darkgrey-1--text.mt-12 Select below io.insure Virtual Data Rooms (VDR) partners that enable you to upload your transaction data room to Project A on io.insure.
    //-     v-row
    //-       v-col(md="6" cols)
    //-         v-select(
    //-           v-model="data.appointAdvisor.vdr"
    //-           :items="[]",
    //-           label="io.insure VDR partners"
    //-           outlined
    //-           hide-details
    //-           item-text="label"
    //-           item-value="value"
    //-         )
    project-form-card(title="Non-disclosure Agreement" icon="check" v-if="!isSetup")
      template(v-scope="props")
        alert-inline(
          type="info"
          text="As it’s important to maintain confidentiality and to protect your data, all parties to this M+A Insurance process are required to execute the standard mutual non-disclosure agreement (NDA)"
          v-if="!isSetup"
        )
        .detail.mt-6
          .detail__content.custom-scrollbar
            p.mb-1(:key="index" v-for="(t, index) in pdfTexts") {{ t }}
        p.title.darkgrey-1--text.mt-8(v-if="!isSetup") Upload your own NDA(maximun 20Mb) (optional)
        v-row.mt-6(v-if="nda && !isSetup")
          v-col.pa-2(md="4" sm="6" cols="12")
            .hold-letter-content
              v-icon.icon.material-icons-outlined(color="darkgrey-1" size="18px") description
              span.file-name {{ nda.name }}
              v-icon.icon-remove.cursor(color="darkgrey-1" size="18px" @click.prevent="handleRemoveNda") close
        upload-field.mt-6(
          label="Drag your file here"
          :max-size="20"
          accept="application/pdf"
          @input="handleNdaFile"
          v-if="!isSetup"
        )
    .content-btns(v-if="!isSetup")
      v-btn.cancel(color="accent" outlined min-height="48px" @click.prevent="handleCancel") cancel
      v-btn.sign(
        :class="`${canSubmit ? '' : 'disabled'}`"
        color="accent"
        min-height="48px"
        min-width="218px"
        @click.prevent="handleSign"
      ) SIGN AND COMPLETE
  v-dialog(v-model="isOpenSignModal" persistent max-width="938px")
    draw-sign(@draw:confirm="handleConfirm" @draw:close="handleCloseSign" v-if="isOpenSignModal")
</template>

<script>
import { toastedError, toastedSuccess } from '@/core/helpers/toasted'

import Advisor from './Advisor'
import { AlertInline } from '@/components/common/notification'
import { DrawSign } from '@/components/common/drawsign'
import EmptyAvatar from '@/assets/img/empty-avatar.svg'
import { ProjectApi } from '@/core/api'
import { ProjectFormCard } from '@/components/Project'
import { TextField } from '@/components/common/form/fields'
import { UploadField } from '@/components/common/fields'
import { decodeId } from '@/core/helpers/id'
import { getFile } from '@/core/helpers/env'
import { isEmailValid } from '@/core/helpers/validation'
import { mapGetters } from 'vuex'
import { readFile } from '@/core/helpers/pdf'

export default {
  name: 'ProjectCreateForm',
  components: {
    Advisor,
    AlertInline,
    DrawSign,
    ProjectFormCard,
    TextField,
    UploadField
  },
  props: {
    initData: {
      type: Object,
      default: () => {}
    },
    isSetup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buyerEmail: null,
      sellerEmail: null,
      holdLetters: [],
      curHoldLetters: [],
      nda: null,
      curNda: null,
      isInit: true,
      payingPolicy: 'buyer',
      isModified: false,
      signPadOptions: {
        penColor: '#323232',
        onBegin: () => {
          this.$refs.signaturePad.resizeCanvas()
        }
      },
      isOpenSignModal: false,
      isValid: false,
      data: {},
      pdfTexts: [],
      rules: {
        name: [
          v => !!v || this.$t('error.validation.required'),
          v => v.length < 101 || this.$t('error.validation.maximun-character', { max: '100' })
        ],
        seller: [
          v => !!v || this.$t('error.validation.required'),
          v => {
            return isEmailValid(v) || this.$t('error.validation.email')
          }
        ],
        buyer: [
          v => !!v || this.$t('error.validation.required'),
          v => {
            return isEmailValid(v) || this.$t('error.validation.email')
          },
          v => {
            return (
              this.data.creatorRole.indexOf('advisor') < 0 ||
              v.length < 1 ||
              this.data.seller.email !== v ||
              this.$t('error.validation.duplicate-seller-email')
            )
          }
        ]
      },
      roles: [
        {
          label: 'Buyer',
          value: 'buyer'
        },
        {
          label: `Buyer's Principal Advisor`,
          value: 'buyer_principal_advisor'
        },
        {
          label: 'Seller',
          value: 'seller'
        },
        {
          label: `Seller's Principal Advisor`,
          value: 'seller_principal_advisor'
        }
      ],
      policyTypes: [
        {
          label: 'Buyer-side policy',
          value: 'buyer_side'
        },
        {
          label: 'Seller-side policy',
          value: 'seller_side'
        }
      ],
      policyPayings: [
        {
          label: 'Buyer',
          value: 'buyer'
        },
        {
          label: 'Seller',
          value: 'seller'
        },
        {
          label: 'Both 50/50',
          value: 'both'
        },
        {
          label: 'Custom percentage',
          value: 'custom_percentage'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['username']),
    emptyAvatar() {
      return EmptyAvatar
    },
    getTitleSellerEmail() {
      return this.sellerEmail?.firstName || this.data.seller.email
    },
    isValidSellerEmail() {
      return !this.$refs.sellerMail?.$children[0].hasError
    },
    isSellerEmail() {
      return this.sellerEmail?.id !== undefined
    },
    getTitleBuyerEmail() {
      return this.buyerEmail?.firstName || this.data.buyer.email
    },
    isValidBuyerEmail() {
      return !this.$refs.buyerMail?.$children[0].hasError
    },
    isBuyerEmail() {
      return this.buyerEmail?.id !== undefined
    },
    getPayingPolicy() {
      return this.policyPayings.filter(p => p.value === this.payingPolicy)[0]?.label
    },
    getPolicyType() {
      return this.policyTypes.filter(p => p.value === this.data.policyType)[0]?.label
    },
    getRole() {
      return this.roles.filter(r => r.value === this.data.creatorRole)[0]?.label
    },
    canSubmit() {
      return this.isValid && this.holdLetters.length > 0
    },
    canEdit() {
      return (
        this.isSetup &&
        this.isModified &&
        this.isValid &&
        this.curHoldLetters.filter(f => !f.isDelete).length + this.holdLetters.length > 0
      )
    },
    curSecondary() {
      return this.data.creatorRole.indexOf('buyer') > -1 ? 'buyerSecondaryAdvisors' : 'sellerSecondaryAdvisors'
    },
    curPrincipal() {
      return this.data.policyType === 'buyer_side' ? 'buyerPrincipalAdvisor' : 'sellerPrincipalAdvisor'
    }
  },
  watch: {
    data: {
      handler(_) {
        if (!this.isModified) {
          this.onChanged(true)
        }
      },
      deep: true
    },
    curHoldLetters: {
      deep: true,
      handler() {
        if (!this.isModified) {
          this.onChanged(true)
        }
      }
    },
    holdLetters: {
      deep: true,
      handler() {
        if (!this.isModified) {
          this.onChanged(true)
        }
      }
    },
    payingPolicy(val) {
      let buyerPaymentPercent = 10
      let sellerPaymentPercent = 90
      switch (val) {
        case 'buyer': {
          buyerPaymentPercent = 100
          sellerPaymentPercent = 0
          break
        }
        case 'seller': {
          sellerPaymentPercent = 100
          buyerPaymentPercent = 0
          break
        }
        case 'both': {
          buyerPaymentPercent = 50
          sellerPaymentPercent = 50
        }
      }
      this.data = {
        ...this.data,
        buyerPaymentPercent,
        sellerPaymentPercent
      }
    }
  },
  created() {
    const buyerPrincipalAdvisor = {
      partnerAdvisorType: this.initData?.buyerPrincipalAdvisor?.partnerAdvisorType?.code || '',
      partnerAdvisor: this.initData?.buyerPrincipalAdvisor?.partnerAdvisor?.code || '',
      email: this.initData?.buyerPrincipalAdvisor?.email || '',
      companyName: this.initData?.buyerPrincipalAdvisor?.companyName || ''
    }
    if (this.initData?.buyerPrincipalAdvisor?.id) {
      buyerPrincipalAdvisor['id'] = decodeId(this.initData?.buyerPrincipalAdvisor?.id)
    }
    const sellerPrincipalAdvisor = {
      partnerAdvisorType: this.initData?.sellerPrincipalAdvisor?.partnerAdvisorType?.code || '',
      partnerAdvisor: this.initData?.sellerPrincipalAdvisor?.partnerAdvisor?.code || '',
      email: this.initData?.sellerPrincipalAdvisor?.email || '',
      companyName: this.initData?.sellerPrincipalAdvisor?.companyName || ''
    }
    if (this.initData?.sellerPrincipalAdvisor?.id) {
      sellerPrincipalAdvisor['id'] = decodeId(this.initData?.sellerPrincipalAdvisor?.id)
    }
    let buyerSecondaryAdvisors = []
    const listBuyer = this.initData?.buyerSecondaryAdvisors?.edges || []
    listBuyer.forEach(({ node }) => {
      buyerSecondaryAdvisors.push({
        id: node?.id,
        isChanged: false,
        isDelete: false,
        isSuggest: !!node?.partnerAdvisorType || false,
        partnerAdvisorType: node?.partnerAdvisorType?.code || '',
        partnerAdvisor: node?.partnerAdvisor?.code || '',
        email: node?.email || '',
        companyName: node?.companyName || '',
        allSectionsGranted: node?.allSectionsGranted || false,
        sectionsGranted: node?.sectionsGranted || [],
        allowViewAccess: node?.allowViewAccess || false
      })
    })
    if (buyerSecondaryAdvisors.length < 1) {
      buyerSecondaryAdvisors.push(this.initAdvisor())
    }
    let sellerSecondaryAdvisors = []
    const listSeller = this.initData?.sellerSecondaryAdvisors?.edges || []
    listSeller.forEach(({ node }) => {
      sellerSecondaryAdvisors.push({
        id: node?.id,
        isChanged: false,
        isDelete: false,
        isSuggest: !!node?.partnerAdvisorType || false,
        partnerAdvisorType: node?.partnerAdvisorType?.code || '',
        partnerAdvisor: node?.partnerAdvisor?.code || '',
        email: node?.email || '',
        companyName: node?.companyName || '',
        allSectionsGranted: node?.allSectionsGranted || false,
        sectionsGranted: node?.sectionsGranted || [],
        allowViewAccess: node?.allowViewAccess || false
      })
    })
    if (sellerSecondaryAdvisors.length < 1) {
      sellerSecondaryAdvisors.push(this.initAdvisor())
    }
    const buyer = {
      email: this.initData?.buyer?.email || ''
    }
    if (this.initData?.buyer?.id) {
      buyer['id'] = decodeId(this.initData?.buyer?.id)
    }
    const seller = {
      email: this.initData?.seller?.email || ''
    }
    if (this.initData?.seller?.id) {
      seller['id'] = decodeId(this.initData?.seller?.id)
    }
    this.data = {
      name: this.initData?.name || '',
      summary: this.initData?.summary || '',
      buyerPaymentPercent: this.initData?.buyerPaymentPercent || 100,
      sellerPaymentPercent: this.initData?.sellerPaymentPercent || 0,
      creatorRole: this.initData?.creatorRole?.code || 'buyer',
      policyType: this.initData?.policyType?.code || 'buyer_side',
      buyerPrincipalAdvisor,
      sellerPrincipalAdvisor,
      buyerSecondaryAdvisors,
      sellerSecondaryAdvisors,
      buyer,
      seller,
      // vdr: this.initData?.vdr || '',
      sign: this.initData?.sign || {}
    }
    if (this.isSetup && this.initData?.id) {
      this.data['id'] = this.initData?.id
    }
    this.curHoldLetters = (this.initData?.holdHarmlessLetters?.edges || []).map(item => {
      return {
        ...item.node,
        isDelete: false
      }
    })
    this.curNda = this.initData?.customNda || null
    if (this.curNda) {
      this.curNda['isDelete'] = false
      // just comment this code maybe use later
      // if (this.curNda.file) {
      //   this.onReadFileFromUrl()
      // }
    }
    this.payingPolicy = this.checkPayingPolicy(this.data.buyerPaymentPercent, this.data.sellerPaymentPercent)
    if (this.isSetup && this.initData?.nda) {
      this.onReadFile()
    }
    setTimeout(() => {
      this.onChanged(false)
      this.isInit = false
    }, 100)
  },
  methods: {
    handleBlurEmailSeller() {
      const { email = '' } = this.data.seller
      if (email.length > 0 && !this.$refs.sellerMail.$children[0].hasError) {
        ProjectApi.getUserByEmail(email)
          .then(({ data }) => {
            this.sellerEmail = data?.userByEmail || null
          })
          .catch(_ => {
            this.sellerEmail = null
          })
      } else {
        this.sellerEmail = null
      }
    },
    handleBlurEmailBuyer() {
      const { email = '' } = this.data.buyer
      if (email.length > 0 && !this.$refs.buyerMail.$children[0].hasError) {
        ProjectApi.getUserByEmail(email)
          .then(({ data }) => {
            this.buyerEmail = data?.userByEmail || null
          })
          .catch(_ => {
            this.buyerEmail = null
          })
      } else {
        this.buyerMail = null
      }
    },
    handleChangedSupport(index) {
      if (this.isSetup) {
        this.data[this.curSecondary][index].isChanged = true
      }
    },
    handleEdit() {
      if (this.canEdit) {
        this.$store.dispatch('setLoading', true)
        const data = { ...this.data }
        delete data.creatorRole
        delete data.policyType
        delete data.buyerSecondaryAdvisors
        delete data.sellerSecondaryAdvisors
        delete data.sign
        let principal = { ...this.data.buyerPrincipalAdvisor }
        principal = this.getAdvisor(principal)
        data.buyerPrincipalAdvisor = principal
        principal = { ...this.data[this.curPrincipal] }
        principal = this.getAdvisor(principal)
        delete principal.id
        data.sellerPrincipalAdvisor = principal
        ProjectApi.update(data)
          .then(async ({ data: result, errors }) => {
            if (errors && errors[0]) {
              toastedError(errors[0].message)
            } else if (result.updateMAProject?.id) {
              this.$store.dispatch('setTitle', this.data.name)
              if (this.data.creatorRole.indexOf('buyer') > -1) {
                for (let index = 0; index < this.data.buyerSecondaryAdvisors.length; index++) {
                  const advisor = this.data.buyerSecondaryAdvisors[index]
                  if (typeof advisor.isDelete === 'boolean') {
                    if (advisor.isDelete) {
                      await ProjectApi.deleteBuyerSecondary(advisor.id)
                    } else if (advisor.isChanged) {
                      const adv = this.getAdvisor(advisor)
                      delete adv.email
                      await ProjectApi.updateBuyerSecondary(adv)
                    }
                  } else {
                    const { data: newData } = await ProjectApi.addNewBuyerSecondary({
                      ...this.getAdvisor(advisor),
                      project: decodeId(this.data.id)
                    })
                    if (newData.createBuyerSecondaryAdvisor?.errors?.length > 0) {
                      toastedError(newData.createBuyerSecondaryAdvisor.errors[0].messages[0])
                      this.$store.dispatch('setLoading', false)
                      return
                    }
                  }
                }
              } else {
                for (let index = 0; index < this.data.sellerSecondaryAdvisors.length; index++) {
                  const advisor = this.data.sellerSecondaryAdvisors[index]
                  if (typeof advisor.isDelete === 'boolean') {
                    if (advisor.isDelete) {
                      await ProjectApi.deleteSellerSecondary(advisor.id)
                    } else if (advisor.isChanged) {
                      const adv = this.getAdvisor(advisor)
                      delete adv.email
                      await ProjectApi.updateSellerSecondary(adv)
                    }
                  } else {
                    const { data: newData } = await ProjectApi.addNewSellerSecondary({
                      ...this.getAdvisor(advisor),
                      project: decodeId(this.data.id)
                    })
                    if (newData.createSellerSecondaryAdvisor?.errors?.length > 0) {
                      toastedError(newData.createSellerSecondaryAdvisor.errors[0].messages[0])
                      this.$store.dispatch('setLoading', false)
                      return
                    }
                  }
                }
              }
              this.curHoldLetters
                .filter(l => l.isDelete)
                .forEach(l => {
                  ProjectApi.deleteHoldHamlessLetter(l.id)
                })
              if (this.holdLetters.length > 0) {
                try {
                  await ProjectApi.uploadHoldHamless(decodeId(this.data.id), this.holdLetters)
                } catch (_) {
                  toastedError('Has error when upload hold hamless files')
                }
              }
              this.onChanged(false)
              toastedSuccess('Updated project successfully')
            } else {
              toastedError(errors[0].message)
            }
            this.$store.dispatch('setLoading', false)
          })
          .catch(_ => {
            toastedError('Update project failed')
            this.$store.dispatch('setLoading', false)
          })
      }
    },
    handleBuyerPaymentPercent(val) {
      if (!this.isSetup) {
        val = parseInt(val, 10)
        let buyerPaymentPercent = val
        if (val > 100) {
          buyerPaymentPercent = 100
        }
        if (val < 0) {
          buyerPaymentPercent = 0
        }
        this.payingPolicy = this.checkPayingPolicy(buyerPaymentPercent, 100 - buyerPaymentPercent)
        setTimeout(() => {
          this.data = {
            ...this.data,
            buyerPaymentPercent,
            sellerPaymentPercent: 100 - buyerPaymentPercent
          }
        }, 100)
      }
    },
    handleSellerPaymentPercent(val) {
      if (!this.isSetup) {
        val = parseInt(val, 10)
        let sellerPaymentPercent = val
        if (val > 100) {
          sellerPaymentPercent = 100
        }
        if (val < 0) {
          sellerPaymentPercent = 0
        }
        this.payingPolicy = this.checkPayingPolicy(100 - sellerPaymentPercent, sellerPaymentPercent)
        setTimeout(() => {
          this.data = {
            ...this.data,
            sellerPaymentPercent,
            buyerPaymentPercent: 100 - sellerPaymentPercent
          }
        }, 100)
      }
    },
    checkPayingPolicy(buyer, seller) {
      if (buyer === 100 && seller === 0) {
        return 'buyer'
      }
      if (buyer === 50 && seller === 50) {
        return 'both'
      }
      if (buyer === 0 && seller === 100) {
        return 'seller'
      }
      return 'custom_percentage'
    },
    onChanged(status) {
      this.isModified = status
      this.$emit('create-project:modified', status)
    },
    async handleConfirm(sign) {
      this.data = {
        ...this.data,
        sign
      }
      const data = {
        ...this.data
      }
      if (data.buyer.email.length < 1) {
        // delete data.buyer
        data.buyer.email = this.username
      }
      if (data.seller.email.length < 1) {
        // delete data.seller
        data.seller.email = this.username
      }
      delete data.buyerPrincipalAdvisor
      delete data.sellerPrincipalAdvisor
      delete data.buyerSecondaryAdvisors
      delete data.sellerSecondaryAdvisors
      delete data.sign
      if (this.data.creatorRole.indexOf('advisor') < 0) {
        let principal = { ...this.data[this.curPrincipal] }
        principal = this.getAdvisor(principal)
        data[this.curPrincipal] = principal
      } else {
        if (this.data.creatorRole === 'buyer_principal_advisor') {
          data['buyerPrincipalAdvisor'] = {
            email: this.username
          }
        } else {
          data['sellerPrincipalAdvisor'] = {
            email: this.username
          }
        }
      }
      let secondary = [...this.data[this.curSecondary]]
      secondary = secondary.map(item => {
        return this.getAdvisor(item)
      })
      data[this.curSecondary] = [...secondary]
      this.handleCloseSign()
      this.$store.dispatch('setLoading', true)
      try {
        const { data: result, errors } = await ProjectApi.create(data)
        if (errors && errors[0]) {
          toastedError(errors[0].message)
        } else {
          const { clientMutationId, errors: err, id } = result.createMAProject
          if (err && err.length > 0) {
            toastedError(err[0]?.messages[0] || 'Has error')
          } else {
            try {
              await ProjectApi.uploadHoldHamless(id, this.holdLetters)
            } catch (_) {
              toastedError('Has error when upload hold hamless files')
            }
            if (this.nda) {
              try {
                await ProjectApi.uploadNDA(id, this.nda)
              } catch (_) {
                toastedError('Has error when upload NDA files')
              }
            }
            this.$store.dispatch('setLoading', false)
            toastedSuccess(`<p><b>${this.data.name}</b>&ensp; has been successfully created</p>`)
            this.$router.push({ name: 'project.detail', params: { id: clientMutationId } })
          }
        }
      } catch (err) {
        toastedError('Has error')
      }
      this.$store.dispatch('setLoading', false)
    },
    handleCloseSign() {
      this.isOpenSignModal = false
    },
    handleSign() {
      if (this.canSubmit) {
        this.isOpenSignModal = true
      }
    },
    handleCancel() {
      this.$router.push({ name: 'home' })
    },
    handleRemoveNda() {
      this.data = {
        ...this.data,
        nda: null
      }
      this.pdfTexts = []
    },
    handleNdaFile(files) {
      this.nda = files[0]
      this.onReadFile()
    },
    onReadFile() {
      const reader = new FileReader()
      reader.onloadend = data => {
        readFile(data.target.result).then(texts => {
          this.pdfTexts = texts
        })
      }
      reader.readAsDataURL(this.nda)
    },
    onReadFileFromUrl() {
      const request = new XMLHttpRequest()
      request.open('GET', getFile(this.curNda.file), true)
      request.responseType = 'blob'
      request.onload = _ => {
        const reader = new FileReader()
        reader.onloadend = data => {
          readFile(data.target.result).then(texts => {
            this.pdfTexts = texts
          })
        }
        reader.readAsDataURL(request.response)
      }
      request.send()
    },
    handleRemoveHoldLetter(index) {
      this.holdLetters.splice(index, 1)
    },
    handleRemoveCurHoldLetter(index) {
      this.curHoldLetters[index].isDelete = true
    },
    handleHoldHarmlessFile(files) {
      this.holdLetters.push(...files)
    },
    handleAddSupport() {
      let supports = [...this.data[this.curSecondary]]
      supports.push(this.initAdvisor())
      this.data = {
        ...this.data,
        [this.curSecondary]: supports
      }
    },
    handleClearPrincipal() {
      this.data = {
        ...this.data,
        [this.curPrincipal]: {
          ...this.initAdvisor(true),
          isSuggest: this.data[this.curPrincipal].isSuggest
        }
      }
    },
    initAdvisor(isPricipal = false) {
      const data = {
        companyName: '',
        email: '',
        isSuggest: false,
        partnerAdvisorType: '',
        partnerAdvisor: ''
      }
      if (!isPricipal) {
        data['allowViewAccess'] = false
        data['allSectionsGranted'] = false
        data['sectionsGranted'] = []
      }
      return data
    },
    getAdvisor(advisor) {
      let data = {}
      if (advisor.isSuggest) {
        if (advisor.partnerAdvisorType && advisor.partnerAdvisorType.length > 0) {
          data['partnerAdvisorType'] = advisor.partnerAdvisorType
        }
        if (advisor.partnerAdvisor && advisor.partnerAdvisor.length > 0) {
          data['partnerAdvisor'] = advisor.partnerAdvisor
        }
      } else {
        if (advisor.companyName && advisor.companyName.length > 0) {
          data['companyName'] = advisor.companyName
        }
        if (advisor.email && advisor.email.length > 0) {
          data['email'] = advisor.email
        }
      }
      data['allowViewAccess'] = advisor.allowViewAccess
      if (advisor.allSectionsGranted) {
        data['allSectionsGranted'] = advisor.allSectionsGranted
      } else {
        data['sectionsGranted'] = advisor.sectionsGranted
      }
      if (advisor.id && this.isSetup) {
        data['id'] = advisor.id
      }
      return data
    },
    onClickFile() {
      this.$refs.uploader.click()
    },
    handleRemoveSupport(index) {
      let supports = [...this.data[this.curSecondary]]
      if (supports.filter(s => typeof s.isDelete !== 'boolean' || !s.isDelete).length > 1) {
        if (this.isSetup && typeof supports[index].isDelete === 'boolean') {
          supports[index].isDelete = true
        } else {
          supports.splice(index, 1)
        }
      } else {
        const support = {
          ...this.initAdvisor(),
          isSuggest: supports[index].isSuggest
        }
        if (this.isSetup && typeof supports[index].isDelete === 'boolean') {
          support['isChanged'] = false
          support['isDelete'] = false
          // supports = [
          //   {
          //     ...this.initAdvisor(),
          //     isChanged: true,
          //     isDelete: false,
          //     isSuggest: supports[index].isSuggest
          //   }
          // ]
        }
        supports.splice(index, 1, support)
      }
      this.data = {
        ...this.data,
        [this.curSecondary]: supports
      }
    }
  }
}
</script>

<style lang="scss">
.setup-content {
  color: $color-dark-grey-1;
  font-size: 14px;

  &--title {
    font-weight: 600;
    line-height: 17px;
  }
}

.save-change {
  padding: 16px 32px !important;
}

.state {
  display: flex;

  &__card {
    display: flex;
    width: 195px;
    height: 173px;
    margin-right: 24px;
    padding: 16px;
    border-radius: 8px;

    &:last-child {
      margin-right: 0;
    }

    &--image {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      background-position: calc(100% - 8px) 8px;
    }

    &__status {
      margin-bottom: 8px;
      padding: 4px 8px;
      color: $color-dark-grey-1;
      font-size: 10px;
      line-height: 13px;
      background-color: #fff;
      border-radius: 100px;
    }

    &__stage {
      color: $color-dark-grey-1;
      font-weight: 600;
      font-size: 16px;
      line-height: 21px;
    }

    &.not-active {
      background: transparent linear-gradient(229deg, #fff 0%, #dedede1c 17%, #808080 100%) 0% 0% no-repeat padding-box;
    }

    &.active {
      background-color: $color-accent;

      .bg-project-project_setup {
        background-size: 80px 73px;
      }

      .state__card__stage {
        color: #fff;
      }
    }
  }
}

.sign-modal {
  &--title {
    margin: 24px 0;
    font-weight: 600;
    font-size: 24px;

    &:first-child {
      margin: 0;
      margin-bottom: 14px;
    }
  }
}

.sign-pad {
  background-color: $color-light-grey;

  &--button {
    display: flex;

    span {
      margin: 16px 0;
      font-size: 14px;
      line-height: 17px;
    }
  }
}

.radio-group {
  margin-top: 0;

  .v-label {
    font-size: 14px;
    line-height: 17px;
  }

  legend {
    width: 100%;
    padding-bottom: 16px;
    //TODO: fix lai
    // span {
    //   font-weight: 600;
    // }
  }

  .content-radio {
    display: flex;
    flex-wrap: wrap;

    .v-radio {
      margin-right: 40px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.form-content {
  .hold-letter-content {
    display: flex;
    align-items: center;

    .file-name {
      flex: auto;
      padding: 0 4px;
      overflow: hidden;
      font-size: 16px;
      line-height: 19px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .switch-text {
    font-size: 14px;
    line-height: 17px;
  }

  .content-btns {
    margin-bottom: 68px;
    text-align: right;

    button {
      font-size: 14px;
      line-height: 17px;
    }

    .cancel {
      background: transparent;
      border: none;
    }
  }

  .radio-group {
    margin-top: 0;

    legend {
      width: 100%;
      padding-bottom: 16px;

      span {
        font-weight: 600;
      }
    }

    .v-label {
      font-size: 14px;
      line-height: 17px;
    }

    .content-radio {
      display: flex;
      flex-wrap: wrap;

      .v-radio {
        margin-right: 40px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .upload-content {
    text-align: center;
    border: 1px dashed #dedede;
    border-radius: 8px;

    .custom-file {
      display: inline-block;
      margin-bottom: 0;
      padding: 24px 10px;

      .upload-icon {
        margin-right: 24px;
      }

      span {
        font-size: 14px;
        line-height: 17px;
      }
    }
  }

  .detail {
    height: 262px;
    padding: 11px 16px;
    font-size: 14px;
    line-height: 17px;
    background: #fff 0% 0% no-repeat padding-box;
    border: 1px solid #dedede;
    border-radius: 8px;

    &__content {
      height: 100%;
      overflow-y: auto;
    }
  }

  .title {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 16px !important;
    line-height: 19px;

    &.seller-buyer {
      margin-top: 16px;

      &:first-child {
        margin-top: 0;
      }
    }
  }

  .padvisor {
    display: flex;
    flex-wrap: wrap;
    margin-top: 18px;

    .description-link {
      font-size: 12px;
      line-height: 14px;
    }

    &:first-child {
      margin-top: 0;
    }

    .switch {
      flex: 0 0 100%;
    }

    &__content {
      flex: 0 0 calc(100% - 32px);
      padding: 24px 16px 38px 16px;
      border: 1px solid $color-medium-gray;
      border-radius: 8px;
    }

    &__close {
      flex: 0 0 32px;
      padding-top: 32px;
      padding-left: 16px;
    }
  }
}

@media (max-width: 405px) {
  .add-support-btn {
    width: 100%;
    padding: 0 10px !important;
  }

  button:not(.v-icon) {
    min-height: 36px !important;
    font-size: 10px !important;
  }
}
</style>
