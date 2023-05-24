let login = "cypress@manager.com"
let currPass = "TestPass1"
let newPass = "TestPass2"
let newCurrPass
let oldPass

let successPasswordChanged = 'Password successfully changed!'



describe ('Manager Portal', function(){

  it('Sign in/out', function (){
    //Open site
    cy.visit('/')

    //Sign In
    cy.get('input[type="email"]').type(login)
    cy.get('input[type="password"]').type(currPass)
    cy.get('button[type="submit"]').click()

    //Sign Out
    cy.get('div[class="dropdown"]').find('button').click()
    cy.contains('a', 'Sign Out').click()
  })

  it('Change password', function(){
      
      //Open site
      cy.visit('/')

      //Sign In
      cy.get('input[type="email"]').type(login)
      cy.get('input[type="password"]').type(currPass)
      cy.get('button[type="submit"]').click()

      //Change password
      cy.get('div[class="dropdown"]').find('button').click()
      cy.contains('a', 'Password').click()
      cy.get('#change-current-password').type(currPass)
      cy.get('#reset-new-password').type(newPass)
      cy.get('#reset-rep-password').type(newPass)
      cy.get('button[type="submit"]').click()
      cy.get('.fade').contains("Password successfully changed!")

      //Change current and new password
      newCurrPass = newPass
      oldPass = currPass

      //Sign Out
      cy.get('div[class="dropdown"]').find('button').click()
      cy.contains('a', 'Sign Out').click()

      //Check old password
      cy.get('input[type="email"]').type(login)
      cy.get('input[type="password"]').type(oldPass)
      cy.get('button[type="submit"]').click()
      cy.get('.fade').contains("The entered password is incorrect. Please try again.")

      //Check new password
      cy.get('input[type="password"]').clear().type(newCurrPass)
      cy.get('button[type="submit"]').click()
      cy.get('.sc-papXJ').contains("Home")

      //Return to the default password
      cy.get('div[class="dropdown"]').find('button').click()
      cy.contains('a', 'Password').click()
      cy.get('#change-current-password').type(newCurrPass)
      cy.get('#reset-new-password').type(oldPass)
      cy.get('#reset-rep-password').type(oldPass)
      cy.get('button[type="submit"]').click()
      cy.get('[role="alert"]').should('contain', successPasswordChanged)
  })
})