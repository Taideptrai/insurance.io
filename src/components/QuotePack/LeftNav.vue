<template lang="pug">
.document-navigation
  v-list
    //-NAVIGATION BUYER
    v-list-group(:value="false" v-if="userType === 'buyer'" mandatory v-model="selectedItem")
      template(#activator)
        v-list-item-icon(@click="handleClick('buyer-documents.due-diligence-reports')")
          //- span.material-icons-outlined folder
          v-icon.material-icons-outlined(size="12" color="dark-grey-1") folder
        v-list-item-title(@click="handleClick('buyer-documents.due-diligence-reports')") {{ $t('nav-left.buyer-documents.title') }}

      v-list-group(:value="false" sub-group)
        template(#activator)
          v-list-item-content
            v-list-item-title(@click="handleClick('buyer-documents.due-diligence-reports')") {{ $t('nav-left.buyer-documents.due-diligence-reports') }}
      v-list-group(:value="false" sub-group)
        template(#activator)
          v-list-item-content(@click="handleClick('buyer-documents.spa')")
            v-list-item-title {{ $t('nav-left.buyer-documents.spa') }}
      v-list-group(:value="false" sub-group)
        template(#activator)
          v-list-item-content(@click="handleClick('buyer-documents.general-due-diligence')")
            v-list-item-title {{ $t('nav-left.buyer-documents.general-due-diligence') }}

      //- v-list-group(:value="true" no-action sub-group expand)
      //-   template(#activator)
      //-     v-list-item-content(@click="handleClick('buyer-documents.specific-due-diligence')")
      //-       v-list-item-title {{ $t('nav-left.buyer-documents.specific-due-diligence') }}
      //-   v-list-item(v-for="(item, i) in buyerSpecificDueDiligence" :key="i" link)
      //-     v-list-item-title(@click="handleClick(item.id)") {{ item.title }}

    //-NAVIGATION SELLER
    v-list-group(:value="true")
      template(#activator)
        v-list-item-icon
          //- span.material-icons-outlined folder
          v-icon.material-icons-outlined(size="12" color="dark-grey-1") folder
        v-list-item-title(@click="handleClick('seller-documents.disclosure-reports')") {{ $t('nav-left.seller-documents.title') }}

      v-list-group(:value="false" sub-group)
        template(#activator)
          v-list-item-content
            v-list-item-title(@click="handleClick('seller-documents.disclosure-reports')") {{ $t('nav-left.seller-documents.due-diligence-reports') }}
      v-list-group(:value="false" sub-group)
        template(#activator)
          v-list-item-content
            v-list-item-title(@click="handleClick('seller-documents.spa')") {{ $t('nav-left.seller-documents.spa') }}
      v-list-group(:value="false" sub-group)
        template(#activator)
          v-list-item-content
            v-list-item-title(@click="handleClick('seller-documents.general-disclosure')") {{ $t('nav-left.seller-documents.general-due-diligence') }}

      v-list-group(:value="true" no-action sub-group)
        template(#activator)
          v-list-item-content
            v-list-item-title(@click="handleClick('seller-documents.specific-disclosure')") {{ $t('nav-left.seller-documents.specific-due-diligence') }}
        v-list-item(v-for="(item, i) in sellerSpecificDueDiligence" :key="i" link)
          v-list-item-title(@click="handleClick(item.id)") {{ item.title }}
</template>

<script>
export default {
  name: 'LeftNav',
  props: {
    userType: {
      type: String,
      default: 'buyer'
    }
  },
  data() {
    return {
      stepperData: [
        {
          id: 'buyerDocuments',
          label: 'Buyer Documents',
          order: 1,
          stepNum: 1,
          steps: [
            {
              id: 'dueDiligenceReports',
              label: 'Due Diligence Reports',
              order: 1,
              stepNum: 2
            },
            {
              id: 'spa',
              label: 'SPA',
              order: 2,
              stepNum: 3
            },
            {
              id: 'generalDueDiligence',
              label: 'General Due Diligence',
              order: 3,
              stepNum: 4
            },
            {
              id: 'specificDueDiligence',
              label: 'Specific Due Diligence',
              order: 4,
              stepNum: 5,
              stepChildren: [
                {
                  id: 'specificDueDiligence.1-3-title-capacity',
                  label: '1-3. Title + Capacity',
                  order: 1,
                  stepNum: 50
                },
                {
                  id: 'specificDueDiligence.7-8-property',
                  label: '7-8. Property',
                  order: 2,
                  stepNum: 51
                }
              ]
            }
          ]
        },
        {
          id: 'sellerDocuments',
          label: 'Seller Documents',
          order: 2,
          stepNum: 20,
          steps: [
            {
              id: 'dueDiligenceReports',
              label: 'Due Diligence Reports',
              order: 1,
              stepNum: 21
            },
            {
              id: 'spa',
              label: 'SPA',
              order: 2,
              stepNum: 22
            },
            {
              id: 'generalDueDiligence',
              label: 'General Due Diligence',
              order: 3,
              stepNum: 23
            },
            {
              id: 'specificDueDiligence',
              label: 'Specific Due Diligence',
              order: 4,
              stepNum: 24
            }
          ]
        }
      ],
      buyerSpecificDueDiligence: [
        {
          title: this.$t('nav-left.buyer-documents.1-3-title-capacity'),
          id: 'buyer-documents.specific-due-diligence.1-3-title-capacity'
        },
        {
          title: this.$t('nav-left.buyer-documents.7-8-property'),
          id: 'buyer-documents.specific-due-diligence.7-8-property'
        },
        {
          title: this.$t('nav-left.buyer-documents.9-10-financials-solvency-records'),
          id: 'buyer-documents.specific-due-diligence.9-10-financials-solvency-records'
        },
        {
          title: this.$t('nav-left.buyer-documents.13-taxation'),
          id: 'buyer-documents.specific-due-diligence.13-taxation'
        },
        {
          title: this.$t('nav-left.buyer-documents.14-intellectual-property'),
          id: 'buyer-documents.specific-due-diligence.14-intellectual-property'
        },
        {
          title: this.$t('nav-left.buyer-documents.15-it'),
          id: 'buyer-documents.specific-due-diligence.15-it'
        },
        {
          title: this.$t('nav-left.buyer-documents.16-employment'),
          id: 'buyer-documents.specific-due-diligence.16-employment'
        },
        {
          title: this.$t('nav-left.buyer-documents.17-regulatory-compliance'),
          id: 'buyer-documents.specific-due-diligence.17-regulatory-compliance'
        },
        {
          title: this.$t('nav-left.buyer-documents.18-insurance'),
          id: 'buyer-documents.specific-due-diligence.18-insurance'
        },
        {
          title: this.$t('nav-left.buyer-documents.19-cyber-security-privacy'),
          id: 'buyer-documents.specific-due-diligence.19-cyber-security-privacy'
        },
        {
          title: this.$t('nav-left.buyer-documents.21-material-contracts'),
          id: 'buyer-documents.specific-due-diligence.21-material-contracts'
        }
      ],
      sellerSpecificDueDiligence: [
        {
          title: this.$t('nav-left.seller-documents.1-3-title-capacity'),
          id: 'seller-documents.specific-disclosure.1-3-title-capacity'
        },
        {
          title: this.$t('nav-left.seller-documents.7-8-property'),
          id: 'seller-documents.specific-disclosure.7-8-property'
        },
        {
          title: this.$t('nav-left.seller-documents.9-10-financials-solvency-records'),
          id: 'seller-documents.specific-disclosure.9-10-financials-solvency-records'
        },
        {
          title: this.$t('nav-left.seller-documents.13-taxation'),
          id: 'seller-documents.specific-disclosure.13-taxation'
        },
        {
          title: this.$t('nav-left.seller-documents.14-intellectual-property'),
          id: 'seller-documents.specific-disclosure.14-intellectual-property'
        },
        {
          title: this.$t('nav-left.seller-documents.15-it'),
          id: 'seller-documents.specific-disclosure.15-it'
        },
        {
          title: this.$t('nav-left.seller-documents.16-employment'),
          id: 'seller-documents.specific-disclosure.16-employment'
        },
        {
          title: this.$t('nav-left.seller-documents.17-regulatory-compliance'),
          id: 'seller-documents.specific-disclosure.17-regulatory-compliance'
        },
        {
          title: this.$t('nav-left.seller-documents.18-insurance'),
          id: 'seller-documents.specific-disclosure.18-insurance'
        },
        {
          title: this.$t('nav-left.seller-documents.19-cyber-security-privacy'),
          id: 'seller-documents.specific-disclosure.19-cyber-security-privacy'
        },
        {
          title: this.$t('nav-left.seller-documents.21-material-contracts'),
          id: 'seller-documents.specific-disclosure.21-material-contracts'
        }
      ],
      selectedItem: 1
    }
  },
  methods: {
    handleClick(ref) {
      this.$emit('click', ref)
    }
  }
}
</script>
<style lang="scss" scoped>
.document-navigation {
  ::v-deep {
    .v-list {
      .v-list-group {
        &:last-child {
          .v-list-group__items {
            border: none;
          }
        }

        .v-list-group__header {
          .v-list-item__icon {
            margin-right: 10px;

            span {
              font-size: 14px;
            }
            padding: 6px 6px;
            border: 1px solid #323232;
            border-radius: 50%;
          }

          .v-list-group__header__append-icon {
            display: none;
          }
        }

        .v-list-item--active .v-list-item__icon {
          color: #fff;
          font-weight: 600;
          background-color: #00bed9 !important;
          border-color: $color-primary;
        }

        .v-list-item--active .v-list-item__title {
          font-weight: 500;
        }

        .v-list-group__items {
          margin-left: 25px;
          border-left: 1px solid $color-medium-gray;

          .v-list-group--sub-group {
            .v-list-group__items > .v-list-item {
              padding-left: 25px;
            }
          }

          .v-list-group__header {
            .v-list-group__header__prepend-icon {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
<i18n>
{
  "en": {
    "document-note": "We recommend the uploading of all the Due Diligence Reports (DDR) in separated documents to facilitate the review and consultation of all documentation by your advisory team. Experts will go directly to the document they need to review instead of having to look for specific information inside one huge document.",
    "title-upload": "Drag your file(s) here ",
    "upload-note": "We recommend separated documents to facilitate the review and consultation of all documentation by your advisory team.",
    "action" : {
      "view": "View",
      "download": "Download",
      "remove": "Remove"
    },
    "type": "Type",
    "buyer-documents": {
      "due-diligence-reports":"Due Diligence Reports",
      "spa": "Sales Purchase Agreement (SPA)",
      "general-due-diligence": {
        "title": "General Due Diligence",
        "input": "List of material outstanding due diligence requests / questions / information"
      },
      "specific-due-diligence": {
        "title": "Specific Due Diligence",
        "1-3-title-capacity": {
          "title": "1-3. Title + Capacity",
          "input": {
            "certificate-of-incorporation": "Certificate of Incorporation",
            "share-registers": "Share Registers",
            "share-certificates": "Share Certificates",
            "list-of-encumbrances-over-the-shares":"List of Encumbrances over the shares"
          }
        },
        "7-8-property": {
          "title": "7-8. Property",
          "input": {
            "freehold-properties": "Freehold Properties",
            "leasehold-properties": "Leasehold Properties and owned by the Target Company"
          }
        },
        "9-10-financials-solvency-records": {
          "title": "9-10. Financials, Solvency, Records",
          "input": {
            "audited-accounts": "Audited Accounts",
            "quality-of-earning-statement": "Quality of Earning Statement"
          }
        },
        "13-taxation": {
          "title": "13. Taxation",
          "input": {
            "last-5-years-tax-returns": "Last 5 Year's Tax Returns",
            "list-of-outstanding-tax-liabilities": "List of outstanding tax liabilities"
          }
        },
        "14-intellectual-property": {
          "title": "14. Intellectual Property (IP)",
          "input": {
            "list-of-the-IP": "List of the Intellectual Property of the Target Company",
            "list-of-any-infringements": "List of any infringements"
          }
        },
        "15-it": {
          "title": "15. Information Technology (IT)",
          "input": {
            "list-of-the-it": "List of IT assets of the Target"
          }
        },
        "16-employment": {
          "title": "16. Employment",
          "input": {
            "list-number-of-employees": "List number of employees - on a state by state basis",
            "list-of-senior-management": "List of Senior management remaining with the business post-Completion",
            "employment-contract": "Employment contracts of the Key Executives and Senior Management"
          }
        },
        "17-regulatory-compliance": {
          "title": "17. Regulatory & Compliance",
          "input": {
            "list-of-litigation": "List of the Litigations over the past 5 years (Closed and Ongoing)"
          }
        },
        "18-insurance": {
          "title": "18. Insurance",
          "input": {
            "list-of-target": "List of the Target's current insurance policies that matches the Schedule to the Sales Purchase Agreement",
            "list-of-insurance-claims":"List of the insurance claims history over the past five years",
            "list-of-outstanding-claims": "List of outstanding claims"
          }
        },
        "19-cyber-security-privacy": {
          "title": "19. Cyber Security, Data Protection & Privacy",
          "input": {
            "list-of-cyber-attacks": "List of cyber attacks and privacy / data protection breaches over the past 5 years"
          }
        },
        "21-material-contracts": {
          "title": "21. Material Contracts",
          "input": {
            "list-of-material-contracts": "List of Material Contracts - Clients, Suppliers, Agreements"
          }
        }
      }
    },
    "seller-documents": {
      "disclosure-reports":"Disclosure Reports",
      "spa": "Sales Purchase Agreement (SPA)",
      "general-disclosure": {
        "title": "General Disclosure",
        "input": "List of material outstanding due diligence requests / questions / information"
      },
      "specific-disclosure": {
        "title": "Specific Disclosure",
        "1-3-title-capacity": {
          "title": "1-3. Title + Capacity",
          "input": {
            "certificate-of-incorporation": "Certificate of Incorporation",
            "share-registers": "Share Registers",
            "share-certificates": "Share Certificates",
            "list-of-encumbrances-over-the-shares":"List of Encumbrances over the shares"
          }
        },
        "7-8-property": {
          "title": "7-8. Property",
          "input": {
            "freehold-properties": "Freehold Properties",
            "leasehold-properties": "Leasehold Properties and owned by the Target Company"
          }
        },
        "9-10-financials-solvency-records": {
          "title": "9-10. Financials, Solvency, Records",
          "input": {
            "audited-accounts": "Audited Accounts",
            "quality-of-earning-statement": "Quality of Earning Statement"
          }
        },
        "13-taxation": {
          "title": "13. Taxation",
          "input": {
            "last-5-years-tax-returns": "Last 5 Year's Tax Returns",
            "list-of-outstanding-tax-liabilities": "List of outstanding tax liabilities"
          }
        },
        "14-intellectual-property": {
          "title": "14. Intellectual Property (IP)",
          "input": {
            "list-of-the-IP": "List of the Intellectual Property of the Target Company",
            "list-of-any-infringements": "List of any infringements"
          }
        },
        "15-it": {
          "title": "15. Information Technology (IT)",
          "input": {
            "list-of-the-it": "List of IT assets of the Target"
          }
        },
        "16-employment": {
          "title": "16. Employment",
          "input": {
            "list-number-of-employees": "List number of employees - on a state by state basis",
            "list-of-senior-management": "List of Senior management remaining with the business post-Completion",
            "employment-contract": "Employment contracts of the Key Executives and Senior Management"
          }
        },
        "17-regulatory-compliance": {
          "title": "17. Regulatory & Compliance",
          "input": {
            "list-of-litigation": "List of the Litigations over the past 5 years (Closed and Ongoing)"
          }
        },
        "18-insurance": {
          "title": "18. Insurance",
          "input": {
            "list-of-target": "List of the Target's current insurance policies that matches the Schedule to the Sales Purchase Agreement",
            "list-of-insurance-claims":"List of the insurance claims history over the past five years",
            "list-of-outstanding-claims": "List of outstanding claims"
          }
        },
        "19-cyber-security-privacy": {
          "title": "19. Cyber Security, Data Protection & Privacy",
          "input": {
            "list-of-cyber-attacks": "List of cyber attacks and privacy / data protection breaches over the past 5 years"
          }
        },
        "21-material-contracts": {
          "title": "21. Material Contracts",
          "input": {
            "list-of-material-contracts": "List of Material Contracts - Clients, Suppliers, Agreements"
          }
        }
      }
    },
    "nav-left": {
      "buyer-documents": {
        "title": "Buyer Documents",
         "due-diligence-reports":"Due Diligence Reports",
         "spa": "SPA",
         "general-due-diligence": "General Due Diligence",
         "specific-due-diligence": "Specific Due Diligence",
         "1-3-title-capacity": "1-3. Title + Capacity",
         "7-8-property": "7-8. Property",
         "9-10-financials-solvency-records": "9-10. Financials, Solvency, Records",
         "13-taxation": "13. Taxation",
         "14-intellectual-property": "14. Intellectual Property (IP)",
         "15-it": "15. Information Technology (IT)",
         "16-employment": "16. Employment",
         "17-regulatory-compliance": "17. Regulatory & Compliance",
         "18-insurance": "18. Insurance",
         "19-cyber-security-privacy": "19. Cyber Security, Data Protection & Privacy",
         "21-material-contracts": "21. Material Contracts"
      },
      "seller-documents": {
        "title": "Seller Documents",
         "due-diligence-reports":"Disclosure Reports",
         "spa": "SPA",
         "general-due-diligence": "General Disclosure",
         "specific-due-diligence": "Specific Disclosure",
         "1-3-title-capacity": "1-3. Title + Capacity",
         "7-8-property": "7-8. Property",
         "9-10-financials-solvency-records": "9-10. Financials, Solvency, Records",
         "13-taxation": "13. Taxation",
         "14-intellectual-property": "14. Intellectual Property (IP)",
         "15-it": "15. Information Technology (IT)",
         "16-employment": "16. Employment",
         "17-regulatory-compliance": "17. Regulatory & Compliance",
         "18-insurance": "18. Insurance",
         "19-cyber-security-privacy": "19. Cyber Security, Data Protection & Privacy",
         "21-material-contracts": "21. Material Contracts"
      }
    
    }
  }
}
</i18n>
