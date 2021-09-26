class SetupNewAccountPage{
  getTitle(){
    return cy.get('.card__title')
  }

  getCaption(){
    return cy.get('.card__caption')
  }

  getFullName(){
    return cy.get('[class="v-form"]').find('[name="fullName"]')
  }
  getFullNameErrorIcon(){
    return cy.get('[class="v-form"]')
    .find('[class="v-icon notranslate success--text material-icons theme--light"]')
    .eq(0)
  }

  getFullNameErrorMessage(){
    return cy.get(
      ':nth-child(3) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    )
  }


  getEmail(){
    return cy.get('[class="v-form"]').find('[name="Email"]')
  }
  getEmailErrorIcon(){
    return cy.get('[class="v-form"]')
      .find('[class="v-icon notranslate success--text material-icons theme--light"]')
      .eq(1)
  }

  getEmailErrorMessage(){
    return cy.get(
      ':nth-child(4) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    )
  }

  getCompany(){
    return cy.get('[class="v-form"]').find('[name="companyName"]')
  }

  getCompanyErrorIcon(){
    return cy.get('[class="v-form"]')
      .find('[class="v-icon notranslate success--text material-icons theme--light"]')
      .eq(2)
  }

  getCompanyErrorMessage(){
    return cy.get(
      ':nth-child(5) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    )
  }

  getPassword(){
    return cy.get('[class="v-form"]').find('[name="password"]')
  }

  getPasswordErrorIcon(){
    return cy.get('[class="v-form"]')
      .find('[class="v-icon notranslate success--text material-icons theme--light"]')
      .eq(3)
  }

  getPasswordErrorMessage(){
    return cy.get(
      ':nth-child(6) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    )
  }

  getRepeatPassword(){
    return cy.get('[class="v-form"]').find('[name="confirmPassword"]')
  }

  getRepeatPasswordErrorICon(){
    return cy.get('[class="v-form"]')
      .find('[class="v-icon notranslate success--text material-icons theme--light"]')
      .eq(4)
  }

  getRepeatPasswordErrorMessage(){
    return cy.get(
      ':nth-child(7) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
    )
  }

  getRegisterButton(){
    return cy.get('.v-btn--has-bg')
  }

  getHaveAnAccount(){
    return cy.get('.pl-0 > .v-btn__content')
  }

  getErrorMessage(){
    return cy.get('[class="v-form"]')
    .find('[class="error-message mb-0 mt-6 text-center"]')
  }
}

export default SetupNewAccountPage
