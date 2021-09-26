/// <reference types="cypress" />

import ConfirmEmailSentPage from '/cypress/PagesObject/ForgotPassword/ConfirmEmailSentPage'
import ForgotPasswordPage from '/cypress/PagesObject/ForgotPassword/ForgotPasswordPage'
import SignInPage from '/cypress/PagesObject/SignIn/SignInPage.js'

describe('ForgotPassword', () => {
  const signInPage = new SignInPage
  const forgotPasswordPage = new ForgotPasswordPage()
  const confirmEmailSentPage = new ConfirmEmailSentPage()

  beforeEach(() => {
    signInPage.visit()
    signInPage.getForgotPassword().click()
  })

  it(`'Forgot password' should be displayed`, () => {
    forgotPasswordPage.getHeader().should('contain', 'Forgot password')
    forgotPasswordPage.getDescription().should('contain', 'Enter the e-mail address associated with your')
    forgotPasswordPage.getDescription().should('contain', 'account to receive a password reset link.')
  })

  it('User can request reset password with valid email', () => {
    forgotPasswordPage.getEmail().type('testing@intellstartup.com')
    forgotPasswordPage.getHeader().click()
    forgotPasswordPage.getEmailErrorIcon().should('contain', 'check')
    forgotPasswordPage.getSendButton().click()
    confirmEmailSentPage.getHeader().should('contain', `Check your e-mail!`)
    confirmEmailSentPage.getDescription().should('contain', `Check your e-mail!`)
  })

  it(`'error.email' should be display when user enters invalid email`, () => {
    forgotPasswordPage.getEmail().type('invalidEmail')
    forgotPasswordPage.getHeader().click()
    forgotPasswordPage.getEmailErrorMessage().should('contain', 'Invalid e-mail format').should('be.visible')
  })

  it(`SignIn page should be displayed when user click on 'BACK TO LOGIN' button`, () => {
    forgotPasswordPage.getBackToLoginButton().click()
    signInPage.getHeader().should('contain', 'Create + Manage Your Projects')
    signInPage.getWelcomeLabel().should('contain', 'Welcome back!')
  })
})
