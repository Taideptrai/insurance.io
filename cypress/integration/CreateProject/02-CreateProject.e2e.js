/* eslint-disable */
import 'cypress-file-upload'

/// <reference types="cypress" />
import { Date } from 'core-js'

describe('CreateProject', () => {
  beforeEach(() => {
    /*eslint-disable */
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    /*eslint-enable */
    //Open SignIn page
    cy.visit('/')
    //Enter email
    // cy.get('[name="Email"]').type('menafe5472@zevars.com')
    cy.get('[name="Email"]').type('testing@intellstartup.com')
    //Enter password
    cy.get('[name="password"]').type('12345678')
    //Click Login button
    cy.get('.text-right > .v-btn').click()
    //Click New Project
    cy.get('[href="/project/create"]').click()
  })

  it('User can create project with valid information(Role=Buyer)', () => {
    var d = new Date()
    var datestring =
      d.getFullYear() +
      '/' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + d.getDate()).slice(-2) +
      ' ' +
      ('0' + d.getHours()).slice(-2) +
      ':' +
      ('0' + d.getMinutes()).slice(-2) +
      ':' +
      ('0' + d.getSeconds()).slice(-2)
    //Enter Project Name
    cy.get('[class="form-card"]').find('[name="name"]').type(datestring)
    //Enter Project Description
    cy.get('[class="form-card"]').find('[name="summary"]').type('Project Description')
    //Select Buyer role
    cy.get('[role="radiogroup"]').find('[class="v-input--selection-controls__ripple accent--text"]').eq(0).click()
    //Select Buyer-side policy
    cy.get('.col-md-12:nth-child(1) .v-radio:nth-child(1) .v-input--selection-controls__ripple').click()
    //Select Buyer paying
    cy.get('.col-md-12:nth-child(2) .v-radio:nth-child(1) .v-input--selection-controls__ripple').click()
    //Enter seller's email
    cy.get('[name="sellerMail"]').type('sellerMail@smartdev.com')
    //Enter my principal advisor's Name
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_name"]').eq(0).type('Principal Advisor')
    //Enter my principal advisor's email
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_email"]').eq(0).type('principal@email.com')

    //Enter my support advisor's name
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_name"]').eq(1).type('Support Advisor')
    //Enter my support advisor's email textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_email"]').eq(1).type('support@email.com')
    //Select Can access all sections
    cy.get('.col-md-6 > .mb-4 .v-input--selection-controls__ripple').click()
    //Select Can view entire project
    cy.get('.v-input:nth-child(2) .v-input--selection-controls__ripple').click()

    //Upload Hold Harmless letters
    cy.get(':nth-child(4) > .content > .upload-content').attachFile(
      [
        'HoldHarmlessLetters-1.pdf',
        'HoldHarmlessLetters-2.pdf',
        'HoldHarmlessLetters-3.pdf',
        'HoldHarmlessLetters-4.pdf'
      ],
      { subjectType: 'drag-n-drop' }
    )

    //Verify Attached Hold Harmless letters
    cy.get(':nth-child(1) > .hold-letter-content > .file-name').should('contain', 'HoldHarmlessLetters-1.pdf')
    cy.get(':nth-child(2) > .hold-letter-content > .file-name').should('contain', 'HoldHarmlessLetters-2.pdf')
    cy.get(':nth-child(3) > .hold-letter-content > .file-name').should('contain', 'HoldHarmlessLetters-3.pdf')
    cy.get(':nth-child(4) > .hold-letter-content > .file-name').should('contain', 'HoldHarmlessLetters-4.pdf')

    //Upload NDA
    cy.get(':nth-child(5) > .content > .upload-content').attachFile('NDA-1.pdf', { subjectType: 'drag-n-drop' })

    //Verify Attached NDA
    cy.get(':nth-child(5) > .content > .row > .pa-2 > .hold-letter-content > .file-name').should('contain', 'NDA-1.pdf')

    //Click SIGN AND COMPLETE
    cy.get('.sign > .v-btn__content').click()

    //Draw signature
    cy.get('canvas').click()

    //Click Add signature details
    cy.get('.item > .v-icon').click()

    //Enter Name
    cy.get('[name="name"]').eq(1).type('Thang Nguyen')

    //Enter Title
    cy.get('[name="title"]').type('Mr')

    //Enter Company Name
    cy.get('[name="companyName"]').type('Smartdev')

    //Enter Company Address
    cy.get('[name="companyAddress"]').type('255 Hung Vuong')

    //Enter City
    cy.get('[name="city"]').type('Da Nang')

    //Click Country
    cy.get('[class="v-select__selections"]').click()

    //Select Turkmenistan
    cy.get('.v-menu__content').find('[class="v-list-item__title"]').eq(1).click()

    //Enter ABN
    cy.get('[name="abn"]').type('ABN')

    //Click SAVE button
    cy.get('.sign-detail-form > .v-card__actions > .ml-4').click()

    //Click CONFIRM SIGNATURE
    cy.get('.btn-confirm > .v-btn__content').click()

    //Verify successfully message
    cy.get('p')
    .should('be.visible')
    .should('contain','has been successfully created')
    .should('contain',datestring)

    //Verify project created successfully
    cy.get('.mytitle').should('be.visible').should('contain', datestring)
  })
})
