/// <reference types="cypress" />

import SetupNewAccountPage from '/cypress/PagesObject/SignUp/SetupNewAccountPage'
import SignInPage from '/cypress/PagesObject/SignIn/SignInPage.js'

describe('SignUp', () => {
  const signInPage = new SignInPage
  const setupNewAccountPage = new SetupNewAccountPage

  beforeEach(() => {
    signInPage.visit()
    signInPage.getCreateAccount().click()
  })
  it(`'Setup a New Account' is displayed when open correct url`, () => {
    setupNewAccountPage.getTitle().should('contain', 'Setup a New Account')
    setupNewAccountPage.getCaption().should(
      'contain',
      'It takes less than a minute to start creating + managing your M+A Insurance Projects'
    )
  })

  it(`'E-mail already in use.' should be displayed when user creates account with email already in use`, () => {
    setupNewAccountPage.getFullName().type('Thang Nguyen')
    setupNewAccountPage.getEmail().focus()
    setupNewAccountPage.getFullNameErrorIcon()
      .should('contain', 'check')

    setupNewAccountPage.getEmail().type('testing@intellstartup.com')
    setupNewAccountPage.getCompany().focus()
    setupNewAccountPage.getEmailErrorIcon()
      .should('contain', 'check')

    setupNewAccountPage.getCompany().type('Smartdev')
    setupNewAccountPage.getPassword().focus()
    setupNewAccountPage.getCompanyErrorIcon()
      .should('contain', 'check')

    setupNewAccountPage.getPassword().type('12345678')
    setupNewAccountPage.getRepeatPassword().focus()
    setupNewAccountPage.getPasswordErrorIcon()
      .should('contain', 'check')

    setupNewAccountPage.getRepeatPassword().type('12345678')
    setupNewAccountPage.getTitle().click()
    setupNewAccountPage.getRepeatPasswordErrorICon()
      .should('contain', 'check')

    setupNewAccountPage.getRegisterButton().click()
    setupNewAccountPage.getErrorMessage()
      .should('be.visible')
      .should('contain', 'E-mail already in use.')
    setupNewAccountPage.getErrorMessage()
      .should('be.visible')
      .should('contain', 'Try to login instead by clicking on I already have an account.')
  })

  it(`SignIn page should be displayed when user clicks on 'I ALREADY HAVE AN ACCOUNT'`, () => {
    setupNewAccountPage.getHaveAnAccount().click()
    signInPage.getHeader().should('contain', 'Create + Manage Your Projects')
    signInPage.getWelcomeLabel().should('contain', 'Welcome back!')
  })

  it('Error message should be displayed when user inputs invalid information', () => {
    setupNewAccountPage.getRegisterButton().click()
    setupNewAccountPage.getFullNameErrorMessage().should('be.visible').should('contain','Required field')
    setupNewAccountPage.getEmailErrorMessage().should('be.visible').should('contain','Required field')
    setupNewAccountPage.getCompanyErrorMessage().should('be.visible').should('contain','Required field')
    setupNewAccountPage.getPasswordErrorMessage().should('be.visible').should('contain','Required field')
    setupNewAccountPage.getRepeatPasswordErrorMessage().should('be.visible').should('contain','Required field')
  })

  it(`'Invalid e-mail format' message should be displayed when user enters invalid email`, () => {
    setupNewAccountPage.getEmail().type('invalidEmail')
    setupNewAccountPage.getCompany().click()
    setupNewAccountPage.getEmailErrorMessage().should('be.visible').should('contain', 'Invalid e-mail format')
  })

  it(`'Must contain at least 8 characters' should be displayed when user enter password contains less than 8 characters`, () => {
    setupNewAccountPage.getPassword().type('1')
    setupNewAccountPage.getRepeatPassword().type('1')
    setupNewAccountPage.getRegisterButton().click()
    setupNewAccountPage.getPasswordErrorMessage().should('contain', 'Must contain at least 8 characters')
    setupNewAccountPage.getRepeatPasswordErrorMessage().should('contain', 'Must contain at least 8 characters')
  })

  it(`'Repeated password does not match' should be displayed when user enters 'Repeated password does not match' not match with Password`, () => {
    setupNewAccountPage.getPassword().type('12345678')
    setupNewAccountPage.getRepeatPassword().type('12345679')
    setupNewAccountPage.getRegisterButton().click()
    setupNewAccountPage.getRepeatPasswordErrorMessage().should('contain', 'Repeated password does not match')
  })
})
