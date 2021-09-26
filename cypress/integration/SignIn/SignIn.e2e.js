/// <reference types="cypress" />

import ForgotPasswordPage from '/cypress/PagesObject/ForgotPassword/ForgotPasswordPage'
import HomePage from '/cypress/PagesObject/Home/HomePage.js'
import SetupNewAccountPage from '/cypress/PagesObject/SignUp/SetupNewAccountPage'
import SignInPage from '/cypress/PagesObject/SignIn/SignInPage.js'
import User from '/cypress/PagesObject/Constains/User'

describe('SignIn', () => {
  const signInPage = new SignInPage()
  const homePage = new HomePage()
  const setupNewAccountPage = new SetupNewAccountPage()
  const forgotPasswordPage = new ForgotPasswordPage()
  const user = new User.User1()

  beforeEach(() => {
    //Open SignIn page
    signInPage.visit()
  })
  it(`'Welcome back!' and Create + 'Manage Your Projects' is displayed when open correct url`, () => {
    //'Create + Manage Your Projects' should be displayed
    signInPage.getHeader().should('contain', 'Create + Manage Your Projects')
    //'Welcome back!' should be displayed
    signInPage.getWelcomeLabel().should('contain', 'Welcome back!')
  })

  it('User can SignIn with valid User/Pass', () => {
    //Enter email
    signInPage.enterEmail(user.getUserName())
    //Enter password
    signInPage.enterPassword(user.getPassword())
    //Click Login button
    signInPage.submit()
    //'My Projects' should be displayed
    homePage.getHeader().should('contain', 'My Projects')
  })

  it(`'Invalid e-mail format' is displayed when enter invalid email`, () => {
    //Enter invalidEmail
    signInPage.enterEmail('invalidEmail')
    //Click Login button
    signInPage.submit()
    //'Invalid e-mail format' error should be displayed
    signInPage.getEmailError()
      .should('be.visible')
      .should('contain', 'Invalid e-mail format')
  })

  it(`'Required fiedld' should be displayed when enter invalid Password`, () => {
    signInPage.getPassword().trigger('focus')
    signInPage.submit()
    signInPage.getEmailErrorIcon().should('be.visible')
    signInPage.getPasswordError()
      .should('be.visible')
      .should('contain', 'Required field')
  })

  it(`Create account page is displayed when user click 'CREATE ACCOUNT'`, () => {
    signInPage.getCreateAccount().click()
    setupNewAccountPage.getTitle().should('contain', 'Setup a New Account')
    setupNewAccountPage.getCaption().should(
      'contain',
      'It takes less than a minute to start creating + managing your M+A Insurance Projects'
    )
  })
  it(`Forgot password page is displayed when user clicks on 'Forgot password?'`, () => {
    signInPage.getForgotPassword().click()
    forgotPasswordPage.getHeader().should('contain', 'Forgot password')
  })
})
