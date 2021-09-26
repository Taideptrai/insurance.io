/// <reference types="cypress" />

import SetupNewAccountPage from '/cypress/PagesObject/SignUp/SetupNewAccountPage'
import SignInPage from '/cypress/PagesObject/SignIn/SignInPage.js'

describe('SignUp', () => {
  const signInPage = new SignInPage()
  const setupNewAccountPage = new SetupNewAccountPage()

  beforeEach(() => {
    signInPage.visit()
    signInPage.getCreateAccount().click()
  })
  it(`'Setup a New Account' is displayed when open correct url`, () => {
    setupNewAccountPage.getTitle().should('contain', 'Setup a New Account')
    setupNewAccountPage
      .getCaption()
      .should('contain', 'It takes less than a minute to start creating + managing your M+A Insurance Projects')
  })

  it(`'E-mail already in use.' should be displayed when user creates account with email already in use`, () => {
    setupNewAccountPage.getFullName().type('Thang Nguyen')
    setupNewAccountPage.getEmail().focus()
    setupNewAccountPage.getFullNameErrorIcon().should('contain', 'check')

    setupNewAccountPage.getEmail().type('testing@intellstartup.com')
    setupNewAccountPage.getCompany().focus()
    setupNewAccountPage.getEmailErrorIcon().should('contain', 'check')

    setupNewAccountPage.getCompany().type('Smartdev')
    setupNewAccountPage.getPassword().focus()
    setupNewAccountPage.getCompanyErrorIcon().should('contain', 'check')

    setupNewAccountPage.getPassword().type('12345678')
    setupNewAccountPage.getRepeatPassword().focus()
    setupNewAccountPage.getPasswordErrorIcon().should('contain', 'check')

    setupNewAccountPage.getRepeatPassword().type('12345678')
    setupNewAccountPage.getTitle().click()
    setupNewAccountPage.getRepeatPasswordErrorICon().should('contain', 'check')

    setupNewAccountPage.getRegisterButton().click()
    setupNewAccountPage.getErrorMessage().should('be.visible').should('contain', 'E-mail already in use.')
    setupNewAccountPage
      .getErrorMessage()
      .should('be.visible')
      .should('contain', 'Try to login instead by clicking on I already have an account.')
  })

  it.only(`SignIn page should be displayed when user clicks on 'I ALREADY HAVE AN ACCOUNT'`, () => {
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
    setupNewAccountPage.getEmail().type('invalidEmail')
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
