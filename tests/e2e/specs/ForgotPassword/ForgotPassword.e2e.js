/// <reference types="cypress" />
describe('ForgotPassword', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('a').click()
  })

  it(`'Forgot password' should be displayed`, () => {
    cy.get('.header').should('contain', 'Forgot password')
  })

  it('User can request reset password with valid email', () => {
    cy.get('[name="Email"]').type('testing@intellstartup.com')
    cy.get('[class="header text-center text-color--grey"]').click()
    cy.get('.v-input__append-inner > .v-icon').should('contain', 'check')
    cy.get('.text-right > .v-btn').click()
    cy.get('.header').should('be.visible').should('contain', `Check your e-mail!`)
  })

  it(`'error.email' should be display when user enters invalid email`, () => {
    cy.get('[name="Email"]').type('invalidEmail')
    cy.get('[class="header text-center text-color--grey"]').click()
    cy.get('.v-messages__message').should('contain', 'Invalid e-mail format').should('be.visible')
  })

  it(`SignIn page should be displayed when user click on 'BACK TO LOGIN' button`, () => {
    cy.get('.pl-0').click()
    cy.get('.header').should('contain', 'Create + Manage Your Projects')
    cy.get('.welcome').should('contain', 'Welcome back!')
  })
})
