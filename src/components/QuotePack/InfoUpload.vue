<template lang="pug">
.info-upload
  .progress__wrapper
    template(v-if="userType === 'buyer'")
      v-row
        v-col(cols="6")
          .progress_left
            .label(class="mb-7 fw-m" :class="{ 'text--accent': buyerProgress.value == '100' }") {{ buyerProgress.name }} ({{ buyerProgress.value }}%)
            v-row(v-for="(item, index) in buyerProgress.children" :key="index")
              v-col.pb-3.pt-0(cols="4")
                span.progress__name(:class="{ 'text--accent': item.value == '100' }") {{ item.name }}
              v-col.pb-3.pt-0(cols="7")
                progress-linear(:value="item.value")
        v-col(cols="6")
          .progress_right
            .label(class="mb-7 fw-m" :class="{ 'text--accent': sellersProgress.value == '100' }") {{ sellersProgress.name }} ({{ sellersProgress.value }}%)
            v-row(v-for="(item, index) in sellersProgress.children" :key="index")
              v-col.pb-3.pt-0(cols="4")
                span.progress__name(:class="{ 'text--accent': item.value == '100' }") {{ item.name }}
              v-col.pb-3.pt-0(cols="7")
                progress-linear(:value="item.value")
    template(v-if="userType === 'seller'")
      v-row
        v-col(cols="12")
          .progress_left
            .label.mb-1 Overall Progress (75%)
      v-row
        v-col(cols="4") 
          span.progress__name Disclosure Reports
        v-col(cols="4") 
          span.progress__name General Disclosure
        v-col(cols="4") 
          span.progress__name.text--accent Specific Disclosure
      v-row
        v-col(cols="4")
          progress-linear(value="80")
        v-col(cols="4")
          progress-linear(value="65")
        v-col(cols="4")
          progress-linear(value="100")
  .documents__wrapper.mt-16.d-flex
    .document__stepper.mr-11
      left-nav(@click="handleSrollTo" :userType="userType")

    .documents__buyer__seller.flex-grow-1
      //-BUYER DOCUMENTS
      .buyer-documents__wrapper(v-if="userType === 'buyer'")
        card.mb-10(
          :title="$t('buyer-documents.buyer-due-diligence-reports')"
          ref="buyer-documents.due-diligence-reports"
        )
          template(#content)
            .table
              v-simple-table
                template(#default)
                  thead
                    tr
                      th.text-left Document Type
                      th.text-left Document Name
                      th.text-left
                        span.table__title Actions
                  tbody
                    tr(v-for="(item, index) in dueDiligenceReportDocument" :key="index")
                      td.pt-8(width="400")
                        .d-flex
                          v-select.mr-4(
                            v-model="item.typeDocument"
                            :items="documentTypes"
                            item-text="label"
                            item-value="value"
                            label="Type"
                            outlined
                            multiple
                            @change="handleDueDiligenceReportDocumentChange"
                          )
                          .tooltip.pt-4
                            v-tooltip(top max-width="500" v-if="item.typeDocument && item.typeDocument.length > 1")
                              template(#activator="{on, attrs}")
                                span.btn--warning.material-icons-outlined(v-bind="attrs" v-on="on") warning
                              span {{ $t('upload-note') }}
                      td {{ item.name }}
                      td.table__actions(width="180")
                        v-tooltip(top)
                          template(#activator="{on, attrs}")
                            v-btn(icon v-bind="attrs" v-on="on")
                              span.action.material-icons-outlined visibility
                          span {{ $t('action.view') }}
                        v-tooltip(top)
                          template(#activator="{on, attrs}")
                            v-btn(icon v-bind="attrs" v-on="on")
                              span.action.material-icons-outlined download
                          span {{ $t('action.download') }}
                        v-tooltip(top)
                          template(#activator="{on, attrs}")
                            v-btn(icon v-bind="attrs" v-on="on")
                              span.action.material-icons-outlined delete
                          span {{ $t('action.remove') }}
            v-alert.alert-info.mt-6
              template(#prepend)
                span.mr-3.material-icons-outlined.primary--text info
                span {{ $t('document-note') }}

            upload-field.mt-6(
              :label="labelUploadDueDiligenceReport"
              accept="application/pdf"
              multiple
              @input="handleUploadDueDiligenceReport"
            )

        card.mb-10(:title="$t('buyer-documents.spa')" ref="buyer-documents.spa")
          template(#content)
            .d-flex
              file-input(show-size outlined chips :label="$t('buyer-documents.spa')")
              .actions
                v-tooltip(top)
                  template(#activator="{on, attrs}")
                    v-btn(icon v-bind="attrs" v-on="on")
                      span.action.material-icons-outlined visibility
                  span {{ $t('action.view') }}
                v-tooltip(top)
                  template(#activator="{on, attrs}")
                    v-btn(icon v-bind="attrs" v-on="on")
                      span.action.material-icons-outlined download
                  span {{ $t('action.download') }}

        card.mb-10(
          :title="$t('buyer-documents.general-due-diligence.title')"
          ref="buyer-documents.general-due-diligence"
        )
          template(#content)
            .d-flex
              file-input(show-size outlined chips :label="$t('buyer-documents.general-due-diligence.input')")
              .actions
                v-tooltip(top)
                  template(#activator="{on, attrs}")
                    v-btn(icon v-bind="attrs" v-on="on")
                      span.action.material-icons-outlined visibility
                  span {{ $t('action.view') }}
                v-tooltip(top)
                  template(#activator="{on, attrs}")
                    v-btn(icon v-bind="attrs" v-on="on")
                      span.action.material-icons-outlined download
                  span {{ $t('action.download') }}

        //- SPECIFIC DUE DILIGENCE
        card.mb-10(
          :title="$t('buyer-documents.specific-due-diligence.title')"
          ref="buyer-documents.specific-due-diligence"
        )
          template(#content)
            //- 1-3. TITLE + CAPACITY
            //- .box-input
            div
              p.box-input__title(class="mb-6" ref="buyer-documents.specific-due-diligence.1-3-title-capacity") {{ $t('buyer-documents.specific-due-diligence.1-3-title-capacity.title') }}
              p.darkgrey-1--text(class="fw-m mb-4") {{ $t('buyer-documents.specific-due-diligence.1-3-title-capacity.title1') }}
              .box-input__content
                .table
                  v-simple-table
                    template(#default)
                      thead
                        tr
                          th.text-left Document Name
                          th.text-left(width="180")
                            span.table__title Actions
                      tbody
                        tr(v-for="(item, index) in buyerSpecificDueDiligenceDocument" :key="index")
                          td {{ item.name }}
                          td.table__actions(width="180")
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined visibility
                              span {{ $t('action.view') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined download
                              span {{ $t('action.download') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined delete
                              span {{ $t('action.remove') }}
                upload-field.mt-6(
                  :label="labelUploadDueDiligenceReport"
                  accept="application/pdf"
                  multiple
                  @input="handleUploadBuyerSpecificDueDiligence"
                )
                  //- .one-input.d-flex
                //-   file-input(
                //-     :label="$t('buyer-documents.specific-due-diligence.1-3-title-capacity.input.certificate-of-incorporation')"
                //-   )
                //-   .actions
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined visibility
                //-       span {{ $t('action.view') }}
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined download
                //-       span {{ $t('action.download') }}
                //- .one-input.d-flex
                //-   file-input(
                //-     :label="$t('buyer-documents.specific-due-diligence.1-3-title-capacity.input.share-registers')"
                //-   )
                //-   .actions
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined visibility
                //-       span {{ $t('action.view') }}
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined download
                //-       span {{ $t('action.download') }}
                //- .one-input.d-flex
                //-   file-input(
                //-     :label="$t('buyer-documents.specific-due-diligence.1-3-title-capacity.input.share-certificates')"
                //-   )
                //-   .actions
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined visibility
                //-       span {{ $t('action.view') }}
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined download
                //-       span {{ $t('action.download') }}
                //- .one-input.d-flex
                //-   file-input(
                //-     :label="$t('buyer-documents.specific-due-diligence.1-3-title-capacity.input.list-of-encumbrances-over-the-shares')"
                //-   )
                //-   .actions
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined visibility
                //-       span {{ $t('action.view') }}
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined download
                //-       span {{ $t('action.download') }}
            //-7-8. PROPERTY
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.7-8-property") {{ $t('buyer-documents.specific-due-diligence.7-8-property.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.7-8-property.input.freehold-properties')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.7-8-property.input.leasehold-properties')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}

            //- //-9-10. FINANCIALS, SOLVENCY, RECORDS
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.9-10-financials-solvency-records") {{ $t('buyer-documents.specific-due-diligence.9-10-financials-solvency-records.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.9-10-financials-solvency-records.input.audited-accounts')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.9-10-financials-solvency-records.input.quality-of-earning-statement')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}

            //- //-13. TAXATION
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.13-taxation") {{ $t('buyer-documents.specific-due-diligence.13-taxation.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.13-taxation.input.last-5-years-tax-returns')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.13-taxation.input.list-of-outstanding-tax-liabilities')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}

            //- //-14. INTELLECTUAL PROPERTY (IP)
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.14-intellectual-property") {{ $t('buyer-documents.specific-due-diligence.14-intellectual-property.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.14-intellectual-property.input.list-of-the-IP')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.14-intellectual-property.input.list-of-any-infringements')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}

            //- //-15. INFORMATION TECHNOLOGY (IT)
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.15-it") {{ $t('buyer-documents.specific-due-diligence.15-it.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(:label="$t('buyer-documents.specific-due-diligence.15-it.input.list-of-the-it')")
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}

            //- //-16. EMPLOYMENT
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.16-employment") {{ $t('buyer-documents.specific-due-diligence.16-employment.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.16-employment.input.list-number-of-employees')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.16-employment.input.list-of-senior-management')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.16-employment.input.employment-contract')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}

            //- //-17. REGULATORY & COMPLIANCE
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.17-regulatory-compliance") {{ $t('buyer-documents.specific-due-diligence.17-regulatory-compliance.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.17-regulatory-compliance.input.list-of-litigation')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}

            //- //-18. INSURANCE
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.18-insurance") {{ $t('buyer-documents.specific-due-diligence.18-insurance.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(:label="$t('buyer-documents.specific-due-diligence.18-insurance.input.list-of-target')")
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.18-insurance.input.list-of-insurance-claims')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.18-insurance.input.list-of-outstanding-claims')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //- //-19. CYBER SECURITY, DATA PROTECTION & PRIVACY
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.19-cyber-security-privacy") {{ $t('buyer-documents.specific-due-diligence.19-cyber-security-privacy.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.19-cyber-security-privacy.input.list-of-cyber-attacks')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
            //- //-21. MATERIAL CONTRACTS
            //- .box-input 
            //-   p.box-input__title(ref="buyer-documents.specific-due-diligence.21-material-contracts") {{ $t('buyer-documents.specific-due-diligence.21-material-contracts.title') }}
            //-   .box-input__content
            //-     .one-input.d-flex
            //-       file-input(
            //-         :label="$t('buyer-documents.specific-due-diligence.21-material-contracts.input.list-of-material-contracts')"
            //-       )
            //-       .actions
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined visibility
            //-           span {{ $t('action.view') }}
            //-         v-tooltip(top)
            //-           template(#activator="{on, attrs}")
            //-             v-btn(icon v-bind="attrs" v-on="on")
            //-               span.action.material-icons-outlined download
            //-           span {{ $t('action.download') }}
      //- END BUYER DOCUMENTS

      //-SELLER DOCUMENTS
      .seller-documents__wrapper
        card.mb-10(:title="$t('seller-documents.disclosure-reports')" ref="seller-documents.disclosure-reports")
          template(#content)
            .table
              v-simple-table
                template(#default)
                  thead
                    tr
                      th.text-left Document Type
                      th.text-left Document Name
                      th.text-left
                        span.table__title Actions
                  tbody
                    tr(v-for="(item, index) in disclosureReportDocument" :key="index")
                      td.pt-8(width="400")
                        .d-flex
                          v-select.mr-4(
                            v-model="item.typeDocument"
                            :items="documentTypes"
                            item-text="label"
                            item-value="value"
                            label="Type"
                            outlined
                            multiple
                            @change="handleDisclosureReportDocumentChange"
                          )
                          .tooltip.pt-4
                            v-tooltip(top max-width="500" v-if="item.typeDocument && item.typeDocument.length > 1")
                              template(#activator="{on, attrs}")
                                span.btn--warning.material-icons-outlined(v-bind="attrs" v-on="on") warning
                              span {{ $t('upload-note') }}
                      td {{ item.name }}
                      td.table__actions(width="180")
                        v-tooltip(top)
                          template(#activator="{on, attrs}")
                            v-btn(icon v-bind="attrs" v-on="on")
                              span.action.material-icons-outlined visibility
                          span {{ $t('action.view') }}
                        v-tooltip(top)
                          template(#activator="{on, attrs}")
                            v-btn(icon v-bind="attrs" v-on="on")
                              span.action.material-icons-outlined download
                          span {{ $t('action.download') }}
                        v-tooltip(top)
                          template(#activator="{on, attrs}")
                            v-btn(icon v-bind="attrs" v-on="on")
                              span.action.material-icons-outlined delete
                          span {{ $t('action.remove') }}
            v-alert.alert-info.mt-6
              template(#prepend)
                span.mr-3.material-icons-outlined.primary--text info
                span {{ $t('document-note') }}

            upload-field.mt-6(
              :label="labelUploadDueDiligenceReport"
              accept="application/pdf"
              multiple
              @input="handleUploadDisclosureReport"
            )

        card.mb-10(:title="$t('seller-documents.spa')" ref="seller-documents.spa")
          template(#content)
            .d-flex
              file-input(show-size outlined chips :label="$t('seller-documents.spa')")
              .actions
                v-tooltip(top)
                  template(#activator="{on, attrs}")
                    v-btn(icon v-bind="attrs" v-on="on")
                      span.action.material-icons-outlined visibility
                  span {{ $t('action.view') }}
                v-tooltip(top)
                  template(#activator="{on, attrs}")
                    v-btn(icon v-bind="attrs" v-on="on")
                      span.action.material-icons-outlined download
                  span {{ $t('action.download') }}

        card.mb-10(:title="$t('seller-documents.general-disclosure.title')" ref="seller-documents.general-disclosure")
          template(#content)
            div
              p.darkgrey-1--text(class="fw-m") {{ $t('seller-documents.general-disclosure.title1') }}
              .table
                v-simple-table
                  template(#default)
                    thead
                      tr
                        th.text-left Document Name
                        th.text-left(width="180")
                          span.table__title Actions
                    tbody
                      tr(v-for="(item, index) in generalDisclosureDocument" :key="index")
                        td {{ item.name }}
                        td.table__actions(width="180")
                          v-tooltip(top)
                            template(#activator="{on, attrs}")
                              v-btn(icon v-bind="attrs" v-on="on")
                                span.action.material-icons-outlined visibility
                            span {{ $t('action.view') }}
                          v-tooltip(top)
                            template(#activator="{on, attrs}")
                              v-btn(icon v-bind="attrs" v-on="on")
                                span.action.material-icons-outlined download
                            span {{ $t('action.download') }}
                          v-tooltip(top)
                            template(#activator="{on, attrs}")
                              v-btn(icon v-bind="attrs" v-on="on")
                                span.action.material-icons-outlined delete
                            span {{ $t('action.remove') }}
              upload-field.mt-6(
                :label="labelUploadDueDiligenceReport"
                accept="application/pdf"
                multiple
                @input="handleGeneralDisclosureDocument"
              )
              .d-flex(class="mt-8")
                file-input(show-size outlined chips :label="$t('seller-documents.general-disclosure.input')")
                .actions
                  v-tooltip(top)
                    template(#activator="{on, attrs}")
                      v-btn(icon v-bind="attrs" v-on="on")
                        span.action.material-icons-outlined visibility
                    span {{ $t('action.view') }}
                  v-tooltip(top)
                    template(#activator="{on, attrs}")
                      v-btn(icon v-bind="attrs" v-on="on")
                        span.action.material-icons-outlined download
                    span {{ $t('action.download') }}

        //- SPECIFIC DUE DILIGENCE
        card.mb-10(
          :title="$t('seller-documents.specific-disclosure.title')"
          ref="seller-documents.specific-disclosure"
        )
          template(#content)
            //- 1-3. TITLE + CAPACITY
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.1-3-title-capacity") {{ $t('seller-documents.specific-disclosure.1-3-title-capacity.title') }}
              .box-input__content
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.1-3-title-capacity.input.certificate-of-incorporation')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.1-3-title-capacity.input.share-registers')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                p.darkgrey-1--text(class="fw-m") {{ $t('seller-documents.specific-disclosure.1-3-title-capacity.input.share-certificates') }}
                .table
                  v-simple-table
                    template(#default)
                      thead
                        tr
                          th.text-left Document Name
                          th.text-left(width="180")
                            span.table__title Actions
                      tbody
                        tr(v-for="(item, index) in shareCertificateDocument" :key="index")
                          td {{ item.name }}
                          td.table__actions(width="180")
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined visibility
                              span {{ $t('action.view') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined download
                              span {{ $t('action.download') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined delete
                              span {{ $t('action.remove') }}
                upload-field.mt-6(
                  class="mb-8"
                  :label="labelUploadDueDiligenceReport"
                  accept="application/pdf"
                  multiple
                  @input="handleShareCertificateDocument"
                )
                //- .one-input.d-flex
                //-   file-input(
                //-     :label="$t('seller-documents.specific-disclosure.1-3-title-capacity.input.share-certificates')"
                //-   )
                //-   .actions
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined visibility
                //-       span {{ $t('action.view') }}
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined download
                //-       span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.1-3-title-capacity.input.list-of-encumbrances-over-the-shares')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
            //-7-8. PROPERTY
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.7-8-property") {{ $t('seller-documents.specific-disclosure.7-8-property.title') }}
              .box-input__content
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.7-8-property.input.freehold-properties')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.7-8-property.input.leasehold-properties')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}

            //-9-10. FINANCIALS, SOLVENCY, RECORDS
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.9-10-financials-solvency-records") {{ $t('seller-documents.specific-disclosure.9-10-financials-solvency-records.title') }}
              .box-input__content
                //- .one-input.d-flex
                //-   file-input(
                //-     :label="$t('seller-documents.specific-disclosure.9-10-financials-solvency-records.input.audited-accounts')"
                //-   )
                //-   .actions
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined visibility
                //-       span {{ $t('action.view') }}
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined download
                //-       span {{ $t('action.download') }}
                p.darkgrey-1--text(class="fw-m") {{ $t('seller-documents.specific-disclosure.9-10-financials-solvency-records.input.audited-accounts') }}
                .table
                  v-simple-table
                    template(#default)
                      thead
                        tr
                          th.text-left Document Name
                          th.text-left(width="180")
                            span.table__title Actions
                      tbody
                        tr(v-for="(item, index) in auditedAccountDocument" :key="index")
                          td {{ item.name }}
                          td.table__actions(width="180")
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined visibility
                              span {{ $t('action.view') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined download
                              span {{ $t('action.download') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined delete
                              span {{ $t('action.remove') }}
                upload-field.mt-6(
                  class="mb-8"
                  :label="labelUploadDueDiligenceReport"
                  accept="application/pdf"
                  multiple
                  @input="handleAuditedAccountDocument"
                )
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.9-10-financials-solvency-records.input.quality-of-earning-statement')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}

            //-13. TAXATION
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.13-taxation") {{ $t('seller-documents.specific-disclosure.13-taxation.title') }}
              .box-input__content
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.13-taxation.input.last-5-years-tax-returns-1')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.13-taxation.input.last-5-years-tax-returns-2')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.13-taxation.input.last-5-years-tax-returns-3')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.13-taxation.input.last-5-years-tax-returns-4')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.13-taxation.input.last-5-years-tax-returns-5')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.13-taxation.input.list-of-outstanding-tax-liabilities')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}

            //-14. INTELLECTUAL PROPERTY (IP)
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.14-intellectual-property") {{ $t('seller-documents.specific-disclosure.14-intellectual-property.title') }}
              .box-input__content
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.14-intellectual-property.input.list-of-the-IP')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.14-intellectual-property.input.list-of-any-infringements')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}

            //-15. INFORMATION TECHNOLOGY (IT)
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.15-it") {{ $t('seller-documents.specific-disclosure.15-it.title') }}
              .box-input__content
                .one-input.d-flex
                  file-input(:label="$t('seller-documents.specific-disclosure.15-it.input.list-of-the-it')")
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}

            //-16. EMPLOYMENT
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.16-employment") {{ $t('seller-documents.specific-disclosure.16-employment.title') }}
              .box-input__content
                //- .one-input.d-flex
                //-   file-input(
                //-     :label="$t('seller-documents.specific-disclosure.16-employment.input.list-number-of-employees')"
                //-   )
                //-   .actions
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined visibility
                //-       span {{ $t('action.view') }}
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined download
                //-       span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.16-employment.input.list-of-senior-management')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                p.darkgrey-1--text(class="fw-m") {{ $t('seller-documents.specific-disclosure.16-employment.input.employment-contract') }}
                .table
                  v-simple-table
                    template(#default)
                      thead
                        tr
                          th.text-left Document Name
                          th.text-left(width="180")
                            span.table__title Actions
                      tbody
                        tr(v-for="(item, index) in employmentContractDocument" :key="index")
                          td {{ item.name }}
                          td.table__actions(width="180")
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined visibility
                              span {{ $t('action.view') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined download
                              span {{ $t('action.download') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined delete
                              span {{ $t('action.remove') }}
                upload-field.mt-6(
                  class="mb-8"
                  :label="labelUploadDueDiligenceReport"
                  accept="application/pdf"
                  multiple
                  @input="handleEmploymentContractDocument"
                )
                //- .one-input.d-flex
                //-   file-input(
                //-     :label="$t('seller-documents.specific-disclosure.16-employment.input.employment-contract')"
                //-   )
                //-   .actions
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined visibility
                //-       span {{ $t('action.view') }}
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined download
                //-       span {{ $t('action.download') }}

            //-17. REGULATORY & COMPLIANCE
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.17-regulatory-compliance") {{ $t('seller-documents.specific-disclosure.17-regulatory-compliance.title') }}
              .box-input__content
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.17-regulatory-compliance.input.list-of-litigation')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}

            //-18. INSURANCE
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.18-insurance") {{ $t('seller-documents.specific-disclosure.18-insurance.title') }}
              .box-input__content
                //- .one-input.d-flex
                //-   file-input(:label="$t('seller-documents.specific-disclosure.18-insurance.input.list-of-target')")
                //-   .actions
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined visibility
                //-       span {{ $t('action.view') }}
                //-     v-tooltip(top)
                //-       template(#activator="{on, attrs}")
                //-         v-btn(icon v-bind="attrs" v-on="on")
                //-           span.action.material-icons-outlined download
                //-       span {{ $t('action.download') }}
                p.darkgrey-1--text(class="fw-m") {{ $t('seller-documents.specific-disclosure.18-insurance.input.list-of-target') }}
                .table
                  v-simple-table
                    template(#default)
                      thead
                        tr
                          th.text-left Document Name
                          th.text-left(width="180")
                            span.table__title Actions
                      tbody
                        tr(v-for="(item, index) in listTargetDocument" :key="index")
                          td {{ item.name }}
                          td.table__actions(width="180")
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined visibility
                              span {{ $t('action.view') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined download
                              span {{ $t('action.download') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined delete
                              span {{ $t('action.remove') }}
                upload-field.mt-6(
                  class="mb-8"
                  :label="labelUploadDueDiligenceReport"
                  accept="application/pdf"
                  multiple
                  @input="handleListTargetDocument"
                )
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.18-insurance.input.list-of-insurance-claims')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.18-insurance.input.list-of-outstanding-claims')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
            //-19. CYBER SECURITY, DATA PROTECTION & PRIVACY
            .box-input 
              p.box-input__title(ref="seller-documents.specific-disclosure.19-cyber-security-privacy") {{ $t('seller-documents.specific-disclosure.19-cyber-security-privacy.title') }}
              .box-input__content
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.19-cyber-security-privacy.input.list-of-cyber-attacks')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
            //-21. MATERIAL CONTRACTS
            div
              p.box-input__title(ref="seller-documents.specific-disclosure.21-material-contracts") {{ $t('seller-documents.specific-disclosure.21-material-contracts.title') }}
              .box-input__content
                .one-input.d-flex
                  file-input(
                    :label="$t('seller-documents.specific-disclosure.21-material-contracts.input.list-of-material-contracts')"
                  )
                  .actions
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined visibility
                      span {{ $t('action.view') }}
                    v-tooltip(top)
                      template(#activator="{on, attrs}")
                        v-btn(icon v-bind="attrs" v-on="on")
                          span.action.material-icons-outlined download
                      span {{ $t('action.download') }}
                p.darkgrey-1--text(class="fw-m") {{ $t('seller-documents.specific-disclosure.21-material-contracts.input.top-material-contracts') }}
                .table
                  v-simple-table
                    template(#default)
                      thead
                        tr
                          th.text-left Document Name
                          th.text-left(width="180")
                            span.table__title Actions
                      tbody
                        tr(v-for="(item, index) in topMaterialDocument" :key="index")
                          td {{ item.name }}
                          td.table__actions(width="180")
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined visibility
                              span {{ $t('action.view') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined download
                              span {{ $t('action.download') }}
                            v-tooltip(top)
                              template(#activator="{on, attrs}")
                                v-btn(icon v-bind="attrs" v-on="on")
                                  span.action.material-icons-outlined delete
                              span {{ $t('action.remove') }}
                upload-field.mt-6(
                  class="mb-8"
                  :label="labelUploadDueDiligenceReport"
                  accept="application/pdf"
                  multiple
                  @input="handleTopMaterialDocument"
                )
          //- END BUYER DOCUMENTS

</span>
</template>

<script>
import { Card } from '@/components/common/card'
import { FileInput } from '@/components/common/form/fields'
import LeftNav from '@/components/QuotePack/LeftNav.vue'
import { ProgressLinear } from '@/components/common/progress'
import Stepper from '@/components/QuotePack/Stepper.vue'
import { UploadField } from '@/components/common/form/fields'
import { mapGetters } from 'vuex'

export default {
  name: 'InfoUpload',
  components: {
    ProgressLinear,
    Card,
    UploadField,
    FileInput,
    Stepper,
    LeftNav
  },
  data() {
    return {
      buyerProgress: {
        value: '75',
        name: `Buyer's Progress`,
        children: [
          {
            name: 'Due Diligence Reports',
            value: '90'
          },
          {
            name: 'General Due Diligence',
            value: '65'
          },
          {
            name: 'Specified Due Diligence',
            value: '30'
          }
        ]
      },
      sellersProgress: {
        value: '100',
        name: `Sellers's Progress`,
        children: [
          {
            name: 'Disclosure Reports',
            value: '100'
          },
          {
            name: 'General Disclosure',
            value: '100'
          },
          {
            name: 'Specified Disclosure',
            value: '100'
          }
        ]
      },
      topMaterialDocument: [],
      listTargetDocument: [],
      employmentContractDocument: [],
      auditedAccountDocument: [],
      shareCertificateDocument: [],
      generalDisclosureDocument: [],
      dueDiligenceReportDocument: [],
      disclosureReportDocument: [],
      buyerSpecificDueDiligenceDocument: [],
      documentTypes: [
        {
          value: '1',
          label: 'DDR Legal'
        },
        {
          value: '2',
          label: 'DDR Legal'
        },
        {
          value: '3',
          label: 'DDR IP'
        },
        {
          value: '4',
          label: 'DDR IT'
        },
        {
          value: '5',
          label: 'DDR Other'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('project', ['project']),
    userType() {
      if (this.project.data?.creatorRole?.code) {
        return this.project.data.creatorRole.code.indexOf('buyer') > -1 ? 'buyer' : 'seller'
      }
      return 'buyer'
    },
    labelUploadDueDiligenceReport() {
      return this.$t('title-upload')
    }
  },
  methods: {
    handleTopMaterialDocument(files) {
      const items = [...files]
      if (items && items.length > 0) {
        items.map(file => {
          file.typeDocument = ''
        })
      }

      this.topMaterialDocument.push(...items)
    },
    handleListTargetDocument(files) {
      const items = [...files]
      if (items && items.length > 0) {
        items.map(file => {
          file.typeDocument = ''
        })
      }

      this.listTargetDocument.push(...items)
    },
    handleEmploymentContractDocument(files) {
      const items = [...files]
      if (items && items.length > 0) {
        items.map(file => {
          file.typeDocument = ''
        })
      }

      this.employmentContractDocument.push(...items)
    },
    handleAuditedAccountDocument(files) {
      const items = [...files]
      if (items && items.length > 0) {
        items.map(file => {
          file.typeDocument = ''
        })
      }

      this.auditedAccountDocument.push(...items)
    },
    handleShareCertificateDocument(files) {
      const items = [...files]
      if (items && items.length > 0) {
        items.map(file => {
          file.typeDocument = ''
        })
      }

      this.shareCertificateDocument.push(...items)
    },
    handleGeneralDisclosureDocument(files) {
      const items = [...files]
      if (items && items.length > 0) {
        items.map(file => {
          file.typeDocument = ''
        })
      }

      this.generalDisclosureDocument.push(...items)
    },
    handleUploadBuyerSpecificDueDiligence(files) {
      const items = [...files]
      if (items && items.length > 0) {
        items.map(file => {
          file.typeDocument = ''
        })
      }

      this.buyerSpecificDueDiligenceDocument.push(...items)
    },
    handleUploadDueDiligenceReport(files) {
      const items = [...files]
      if (items && items.length > 0) {
        items.map(file => {
          file.typeDocument = ''
        })
      }

      this.dueDiligenceReportDocument.push(...items)
    },
    handleUploadDisclosureReport(files) {
      const items = [...files]
      if (items && items.length > 0) {
        items.map(file => {
          file.typeDocument = ''
        })
      }

      this.disclosureReportDocument.push(...items)
    },

    handleSrollTo(val) {
      const target = this.$refs[val]
      this.$vuetify.goTo(target)
    },
    handleDueDiligenceReportDocumentChange() {
      this.dueDiligenceReportDocument = [...this.dueDiligenceReportDocument]
    },
    handleDisclosureReportDocumentChange() {
      this.disclosureReportDocument = [...this.disclosureReportDocument]
    }
  }
}
</script>

<style lang="scss" scoped>
.info-upload {
  margin-top: 40px;
  color: $color-dark-grey-1;

  .progress__wrapper {
    padding: 24px;
    border: 1px solid $color-medium-gray;
    border-radius: 8px;

    .progress__name {
      font-size: 16px;
    }
  }

  .alert-info {
    max-width: fit-content;
    background: rgba($color: $color-primary, $alpha: 0.1);
    border-radius: 8px;
  }

  .documents__wrapper {
    .document__stepper {
      position: sticky;
      top: 20px;
      width: 350px;
      height: 584px;
      // border: 1px solid #888;
    }

    .buyer-documents__wrapper,
    .seller-documents__wrapper {
      .table {
        &__title {
          padding-left: 6.75px;
        }

        td {
          border-bottom: thin solid rgba(0, 0, 0, 0.12);
        }
      }
    }
  }

  .actions {
    padding-top: 8px;
    padding-left: 16px;

    .action {
      margin-right: 16px;
      color: $color-dark-grey;

      &:hover {
        color: $color-primary;
        transform: 0.3s;
      }
    }
  }

  .text--white {
    color: #fff;
  }

  .text--accent {
    color: $color-primary;
  }

  .label {
    font-size: 19px;
  }

  .btn--warning {
    color: $color-warning;
  }

  .box-input {
    margin-bottom: 35px;
    padding-bottom: 15px;
    border-bottom: 1px solid $color-medium-gray;

    &__title {
      margin-bottom: 30px;
      color: $color-primary;
      font-weight: 600;
      font-size: 16px;
      text-transform: uppercase;
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
      "buyer-due-diligence-reports":"DDR - Buyer Due Diligence Reports",
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
          "title1": "Public searches conducted and litigation searches lists",
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
      "disclosure-reports":"VDDR - Vendor Due Diligence Reports",
      "spa": "Sales Purchase Agreement (SPA)",
      "general-disclosure": {
        "title": "General Disclosure",
        "title1": "Investment Memorandum and or Business Plans",
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
            "last-5-years-tax-returns-1": "Last 5 Year's Tax Returns-Year 1",
            "last-5-years-tax-returns-2": "Last 5 Year's Tax Returns-Year 2",
            "last-5-years-tax-returns-3": "Last 5 Year's Tax Returns-Year 3",
            "last-5-years-tax-returns-4": "Last 5 Year's Tax Returns-Year 4",
            "last-5-years-tax-returns-5": "Last 5 Year's Tax Returns-Year 5",
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
            "list-of-material-contracts": "List of Material Contracts - Clients, Suppliers, Agreements",
            "top-material-contracts": "Top Material Contracts"
          }
        }
      }
    }
   
  }
}
</i18n>
