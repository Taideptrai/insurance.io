class ForgotPasswordPage{
  getHeader(){
    return cy.get('.header')
  }

  getDescription(){
    return cy.get('.description')
  }

  getEmail(){
    return cy.get('[name="Email"]')
  }

  getEmailErrorIcon(){
    return cy.get('.v-input__append-inner > .v-icon')
  }

  getEmailErrorMessage(){
    return cy.get('.v-messages__message')
  }

  getBackToLoginButton(){
    return cy.get('.pl-0')
  }

  getSendButton(){
    return cy.get('[class="header text-center text-color--grey"]')
  }
}

export default ForgotPasswordPage
