class SignInPage {
  visit() {
    cy.visit('/');
  }

  getHeader() {
    return cy.get('.header');
  }

  getWelcomeLabel() {
    return cy.get('.welcome');
  }

  enterEmail(value) {
    const field = cy.get('[name="Email"]');
    field.clear();
    field.type(value);

    return this;
  }

  getEmailError(){
    return cy.get(':nth-child(1) > .col > .v-input > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
  }

  getEmailErrorIcon(){
    return cy.get('.v-input__append-inner > .material-icons')
  }

  getPassword(){
    return cy.get('[name="password"]')
  }
  
  enterPassword(value) {
    const field = cy.get('[name="password"]');
    field.clear();
    field.type(value);

    return this;
  }

  getPasswordError(){
    return cy.get(':nth-child(1) > .col > .v-input > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
  }

  getCreateAccount(){
    return cy.get('.pl-0 > .v-btn__content')
  }

  getForgotPassword(){
    return cy.get('a')
  }
    
  submit() {
    const button = cy.get('.text-right > .v-btn');
    button.click();
  }
}

export default SignInPage;
