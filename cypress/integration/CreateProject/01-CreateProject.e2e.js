/// <reference types="cypress" />

describe('CreateProject', () => {
  beforeEach(() => {
    /*eslint-disable */
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    /*eslint-enable */
    //Open SignIn page
    cy.visit('/')
    //Enter email
    cy.get('[name="Email"]').type('testing@intellstartup.com')
    //Enter password
    cy.get('[name="password"]').type('12345678')
    //Click Login button
    cy.get('.text-right > .v-btn').click()
    //Click New Project
    cy.get('[href="/project/create"]').click()
  })

  it(`Create new project should be displayed`, () => {
    //Verify 'Project Details' text displayed
    cy.get(':nth-child(1) > .title-content > span.white--text').should('contain', 'Project Details')
    //Verify 'Policy' text displayed
    cy.get(':nth-child(2) > .title-content > span.white--text').should('contain', 'Policy')
    //Verify 'Participants' text displayed
    cy.get(':nth-child(3) > .title-content > span.white--text').should('contain', 'Participants')
    //Verify 'Hold Harmless Letters' text displayed
    cy.get(':nth-child(4) > .title-content > span.white--text').should('contain', 'Hold Harmless Letters')
    //Verify 'Non-disclosure Agreement' text displayed
    cy.get(':nth-child(5) > .title-content > span.white--text').should('contain', 'Non-disclosure Agreement')
  })

  it(`'Required field' should be displayed when user enter invalid Project name`, () => {
    //Focus Project name textfield
    cy.get('[class="form-card"]').find('[name="name"]').focus()
    //Focus Project name textfield
    cy.get('[class="form-card"]').find('[name="summary"]').trigger('focus')
    //'Required field' should be display under Project name textfield
    cy.get('.v-messages__message').should('contain', 'Required field').should('be.visible')
  })

  it(`Participants's information should be displayed when User selected as Buyer`, () => {
    //Select Buyer role
    cy.get('[role="radiogroup"]').find('[class="v-input--selection-controls__ripple accent--text"]').eq(0).click()
    //Seller participants should be displayed
    cy.get('[class="content"]')
      .find('[class="title seller-buyer darkgrey-1--text"]')
      .eq(0)
      .should('be.visible')
      .should('contain', 'Seller')
    //Seller's email participants should be displayed
    cy.get('[class="content"]').find('[name="sellerMail"]').should('be.visible')

    //My principal advisor information should be displayed
    cy.get('[class="content"]')
      .find('[class="title darkgrey-1--text mt-8"]')
      .eq(0)
      .should('be.visible')
      .should('contain', 'My principal advisor')
    //My principal advisor's Name textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_name"]').eq(0).should('be.visible')
    //My principal advisor's email textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_email"]').eq(0).should('be.visible')

    //My support advisor information should be displayed
    cy.get('[class="content"]')
      .find('[class="title darkgrey-1--text mt-8"]')
      .eq(1)
      .should('be.visible')
      .should('contain', 'My support advisor')
    //My support advisor's name textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_name"]').eq(1).should('be.visible')
    //My support advisor's email textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_email"]').eq(1).should('be.visible')
  })

  it(`Participants's information should be displayed when User selected as Buyer's Principal Advisor`, () => {
    //Select Buyer's Principal Advisor role
    cy.get('[class="content-radio"]').find('[class="v-input--selection-controls__ripple"]').eq(0).click()
    //Seller participants should be displayed
    cy.get('[class="content"]')
      .find('[class="title seller-buyer darkgrey-1--text"]')
      .eq(0)
      .should('be.visible')
      .should('contain', 'Seller')
    //Seller's email participants should be displayed
    cy.get('[name="sellerMail"]').should('be.visible')
    //Buyer participants should be displayed
    cy.get('[class="content"]')
      .find('[class="title seller-buyer darkgrey-1--text"]')
      .eq(1)
      .should('be.visible')
      .should('contain', 'Buyer')
    //Buyer's email participants should be displayed
    cy.get('[name="buyerMail"]').should('be.visible')
  })

  it(`Participants's information should be displayed when User selected as Seller`, () => {
    //Select Seller role
    cy.get('[class="content-radio"]').find('[class="v-input--selection-controls__ripple"]').eq(1).click()
    //Buyer participants should be displayed
    cy.get('[class="content"]')
      .find('[class="title seller-buyer darkgrey-1--text"]')
      .eq(0)
      .should('be.visible')
      .should('contain', 'Buyer')
    //Buyer's email participants should be displayed
    cy.get('[name="buyerMail"]').should('be.visible')

    //My principal advisor information should be displayed
    cy.get('[class="content"]')
      .find('[class="title darkgrey-1--text mt-8"]')
      .eq(0)
      .should('be.visible')
      .should('contain', 'My principal advisor')
    //My principal advisor's Name textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_name"]').eq(0).should('be.visible')
    //My principal advisor's email textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_email"]').eq(0).should('be.visible')

    //My support advisor information should be displayed
    cy.get('[class="content"]')
      .find('[class="title darkgrey-1--text mt-8"]')
      .eq(1)
      .should('be.visible')
      .should('contain', 'My support advisor')
    //My support advisor's name textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_name"]').eq(1).should('be.visible')
    //My support advisor's email textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_email"]').eq(1).should('be.visible')
  })

  it(`Participants's information should be displayed when User selected as Seller's Principal Advisor`, () => {
    //Select Seller's Principal Advisor role
    cy.get('[class="content-radio"]').find('[class="v-input--selection-controls__ripple"]').eq(2).click()
    //Seller participants should be displayed
    cy.get('[class="content"]')
      .find('[class="title seller-buyer darkgrey-1--text"]')
      .eq(0)
      .should('be.visible')
      .should('contain', 'Seller')
    //Seller's email participants should be displayed
    cy.get('[name="sellerMail"]').should('be.visible')

    //Buyer participants should be displayed
    cy.get('[class="content"]')
      .find('[class="title seller-buyer darkgrey-1--text"]')
      .eq(1)
      .should('be.visible')
      .should('contain', 'Buyer')
    //Buyer's email participants should be displayed
    cy.get('[name="buyerMail"]').should('be.visible')

    //My support advisor information should be displayed
    cy.get('[class="content"]')
      .find('[class="title darkgrey-1--text mt-8"]')
      .eq(0)
      .should('be.visible')
      .should('contain', 'My support advisor')
    //My support advisor's name textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_name"]').eq(0).should('be.visible')
    //My support advisor's email textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_email"]').eq(0).should('be.visible')
  })

  it(`'Required field' error should be displayed when user enters invalid Seller's email and Buyer's email`, () => {
    //Select Buyer's Principal Advisor
    cy.get('[class="content-radio"]').find('[class="v-input--selection-controls__ripple"]').eq(0).click()
    //Focus Seller's email textfield
    cy.get('[name="sellerMail"]').should('be.visible').trigger('focus')
    //Focus Buyer's email textfield
    cy.get('[name="buyerMail"]').should('be.visible').trigger('focus')
    //Click on Seller label
    cy.get('[class="content"]').find('[class="title seller-buyer darkgrey-1--text"]').eq(0).click()
    //'Required field' should be displayed under Seller's email textfield
    cy.get('[class="content"]')
      .find('[class="v-messages__message"]')
      .eq(0)
      .should('be.visible')
      .should('contain', 'Required field')
    //'Required field' should be displayed under Buyer's email textfield
    cy.get('[class="content"]')
      .find('[class="v-messages__message"]')
      .eq(1)
      .should('be.visible')
      .should('contain', 'Required field')
  })

  it(`'Required field' should be displayed when user enter invalid advisor company name,advisor company email`, () => {
    //Select Buyer role
    cy.get('[role="radiogroup"]').find('[class="v-input--selection-controls__ripple accent--text"]').eq(0).click()
    //Focus My principal advisor's Name textfield
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_name"]').eq(0).trigger('focus')
    //Click on My principal advisor label
    cy.get('[class="content"]').find('[class="title darkgrey-1--text mt-8"]').eq(0).click()
    //'Required field' should be displayed under Advisor company name textfield
    cy.get('[class="padvisor__content"]')
      .find('[class="v-messages__message"]')
      .eq(0)
      .should('be.visible')
      .should('contain', 'Required field')

    ////Focus My principal advisor's emal textfield
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_email"]').eq(0).trigger('focus')
    //Click on My principal advisor label
    cy.get('[class="content"]').find('[class="title darkgrey-1--text mt-8"]').eq(0).click()
    //'Required field' should be displayed under Advisor company email textfield
    cy.get('[class="padvisor__content"]')
      .find('[class="v-messages__message"]')
      .eq(1)
      .should('be.visible')
      .should('contain', 'Required field')

    //My support advisor's name textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_name"]').eq(1).trigger('focus')
    //Click on My support advisor label
    cy.get('[class="content"]').find('[class="title darkgrey-1--text mt-8"]').eq(1).click()
    //'Required field' should be displayed under Advisor company email textfield
    cy.get('[class="padvisor__content"]')
      .find('[class="v-messages__message"]')
      .eq(2)
      .should('be.visible')
      .should('contain', 'Required field')

    //My support advisor's email textfield should be displayed
    cy.get('[class="padvisor"]').find('[name="principalAdvisor_email"]').eq(1).trigger('focus')
    //Click on My support advisor label
    cy.get('[class="content"]').find('[class="title darkgrey-1--text mt-8"]').eq(1).click()
    //'Required field' should be displayed under Advisor company email textfield
    cy.get('[class="padvisor__content"]')
      .find('[class="v-messages__message"]')
      .eq(3)
      .should('be.visible')
      .should('contain', 'Required field')
  })

  it('Verify user can add/remove another support advisor', () => {
    //Select Buyer role
    cy.get('[role="radiogroup"]').find('[class="v-input--selection-controls__ripple accent--text"]').eq(0).click()
    //User should have 2 advisors information input as Buyer role
    cy.get('[class="content"]').children('[class="padvisor"]').should('have.length', 2)
    //Click on 'ADD ANOTHER SUPPORT ADVISOR'
    cy.get('[class="content"]')
      .find('[class="add-support-btn v-btn v-btn--outlined theme--light v-size--large accent--text"]')
      .click()
    //Advisor information input should be added
    cy.get('[class="content"]').children('[class="padvisor"]').should('have.length', 3)
    //Click remove button right on advisor information
    cy.get('[class="content"]')
      .find('[class="v-icon notranslate v-icon--link material-icons theme--light darkgrey-1--text"]')
      .eq(2)
      .click()
    //User should have 2 advisors information input as Buyer role
    cy.get('[class="content"]').children('[class="padvisor"]').should('have.length', 2)
  })
})
