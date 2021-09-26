/// <reference types="cypress" />
describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[class="row no-gutters"]').find('[type="button"]').eq(0).click()
  })
  it(`'Setup a New Account' is displayed when open correct url`, () => {
    cy.get('.card__title').should('contain', 'Setup a New Account')
    cy.get('.card__caption').should(
      'contain',
      'It takes less than a minute to start creating + managing your M+A Insurance Projects'
    )
  })

  it(`'E-mail already in use.' should be displayed when user creates account with email already in use`, () => {
    cy.get('[class="v-form"]').find('[name="fullName"]').type('Thang Nguyen')
    cy.get('[class="v-form"]').find('[name="Email"]').focus()
    cy.get('[class="v-form"]')
      .find('[class="v-icon notranslate success--text material-icons theme--light"]')
      .eq(0)
      .should('contain', 'check')

    cy.get('[class="v-form"]').find('[name="Email"]').type('testing@intellstartup.com')
    cy.get('[class="v-form"]').find('[name="companyName"]').focus()
    cy.get('[class="v-form"]')
      .find('[class="v-icon notranslate success--text material-icons theme--light"]')
      .eq(1)
      .should('contain', 'check')

    cy.get('[class="v-form"]').find('[name="companyName"]').type('Smartdev')
    cy.get('[class="v-form"]').find('[name="password"]').focus()
    cy.get('[class="v-form"]')
      .find('[class="v-icon notranslate success--text material-icons theme--light"]')
      .eq(2)
      .should('contain', 'check')

    cy.get('[class="v-form"]').find('[name="password"]').type('12345678')
    cy.get('[class="v-form"]').find('[name="confirmPassword"]').focus()
    cy.get('[class="v-form"]')
      .find('[class="v-icon notranslate success--text material-icons theme--light"]')
      .eq(3)
      .should('contain', 'check')

    cy.get('[class="v-form"]').find('[name="confirmPassword"]').type('12345678')
    cy.get('[class="v-form"]').find('[class="card__title text-center"]').click()
    cy.get('[class="v-form"]')
      .find('[class="v-icon notranslate success--text material-icons theme--light"]')
      .eq(4)
      .should('contain', 'check')

    cy.get('.v-btn--has-bg').click()
    cy.get('[class="v-form"]')
      .find('[class="error-message mb-0 mt-6 text-center"]')
      .should('be.visible')
      .should('contain', 'E-mail already in use.')
    cy.get('[class="v-form"]')
      .find('[class="error-message mb-0 mt-6 text-center"]')
      .should('be.visible')
      .should('contain', 'Try to login instead by clicking on I already have an account.')
  })

  it(`SignIn page should be displayed when user clicks on 'I ALREADY HAVE AN ACCOUNT'`, () => {
    cy.get('.pl-0 > .v-btn__content').click()
    cy.get('.header').should('contain', 'Create + Manage Your Projects')
    cy.get('.welcome').should('contain', 'Welcome back!')
  })

  it('Error message should be displayed when user inputs invalid information', () => {
    cy.get('.v-btn--has-bg').click()
    cy.get(
      ':nth-child(3) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    ).should('be.visible')
    cy.get(
      ':nth-child(4) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    ).should('be.visible')
    cy.get(
      ':nth-child(5) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    ).should('be.visible')
    cy.get(
      ':nth-child(6) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    ).should('be.visible')
    cy.get(
      ':nth-child(7) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    ).should('be.visible')
  })

  it(`'Invalid e-mail format' message should be displayed when user enters invalid email`, () => {
    cy.get('[class="v-form"]').find('[name="Email"]').type('invalidEmail')
    cy.get('.v-btn--has-bg').click()
    cy.get(
      '.v-input--is-label-active > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    ).should('contain', 'Invalid e-mail format')
  })

  it(`'Must contain at least 8 characters' should be displayed when user enter password contains less than 8 characters`, () => {
    cy.get('[class="v-form"]').find('[name="password"]').type('1')
    cy.get('[class="v-form"]').find('[name="confirmPassword"]').type('1')
    cy.get('.v-btn--has-bg').click()
    cy.get(
      ':nth-child(6) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    ).should('contain', 'Must contain at least 8 characters')
    cy.get(
      '.password-field.v-input--has-state > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    ).should('contain', 'Must contain at least 8 characters')
  })

  it(`'Repeated password does not match' should be displayed when user enters 'Repeated password does not match' not match with Password`, () => {
    cy.get('[class="v-form"]').find('[name="password"]').type('12345678')
    cy.get('[class="v-form"]').find('[name="confirmPassword"]').type('987654321')
    cy.get('.v-btn--has-bg').click()
    cy.get(
      '.password-field.v-input--has-state > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    ).should('contain', 'Repeated password does not match')
  })
})
