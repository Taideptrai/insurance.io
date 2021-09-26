class ConfirmEmailSentPage{
  getHeader(){
    return cy.get('.header')
  }

  getDescription(){
    return cy.get('.description')
  }
}

export default ConfirmEmailSentPage
