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

  it.only('Check styles', function(){
    
    cy.visit('/')

    //  Sign In
    cy.get('input[type="email"]').type(login)
    cy.get('input[type="password"]').type(currPass)
    cy.get('button[type="submit"]').click()

    //  Left menu
    cy.get('nav[class="sc-bgrGEg cMzWIl"]').then( navigationMenu => {
      cy.wrap(navigationMenu)
        .should('have.css', 'background-color', 'rgb(250, 250, 250)')
        .should('have.css', 'border-right', '0.8px solid rgb(230, 230, 230)')
      cy.wrap(navigationMenu).find('a').each(button => {
        cy.wrap(button).find('label').should('have.css', 'font-size', '14px')
      })
      cy.wrap(navigationMenu).find('a[class="sc-iMJOuO egWhhn active"]')
        .find('div')
        .should('have.css', 'background-color', 'rgb(129, 193, 125)')
        .find('label')
        .should('have.css', 'color', 'rgb(255, 255, 255)')
      cy.wrap(navigationMenu).find('a[class="sc-iMJOuO egWhhn"]').each( inactiveButton => {
        cy.wrap(inactiveButton)
        .find('div')
        .should('not.have.css', 'background-color', 'rgb(129, 193, 125)')
        .find('label')
        .should('have.css', 'color', 'rgb(108, 108, 108)')
      })

      //  Header
      cy.get('.cMKwJU').should('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box')
        .and('have.css', 'border-bottom', '0.8px solid rgb(232, 232, 232)')

      //  Footer
      cy.get('footer')
        .should('have.css', 'background-color', 'rgb(249, 249, 249)')
        .find('label')
        .should('contain', 'Copyright 2023 Kleenway Building Maintenance Inc. | All Rights Reserved')
        .should('have.css', 'font-size', '10px')
        .and('have.css', 'color', 'rgb(180, 180, 180)')

    })
  })
})