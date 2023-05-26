let login = "cypress@manager.com"
let currPass = "TestPass1"
let newPass = "TestPass2"
let newCurrPass
let oldPass

let successPasswordChanged = 'Password successfully changed!'

function signIn (){
  cy.get('input[type="email"]').type(login)
  cy.get('input[type="password"]').type(currPass)
  cy.get('button[type="submit"]').click()
}



describe ('Manager Portal', function(){

  it('Sign in/out', function (){
    //Open site
    cy.visit('/')

    signIn()

    //Sign Out
    cy.get('div[class="dropdown"]').find('button').click()
    cy.contains('a', 'Sign Out').click()
  })

  it('Change password', function(){
      
      //Open site
      cy.visit('/')

      signIn()

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

  it('Check styles', function(){
    
    cy.visit('/')

    signIn()
    
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
      cy.get('div[class="sc-fVLGaz hSTNxA"]')
        .should('contain', 'Home')

      //  Header
      cy.get('.cMKwJU').should('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box')
        .and('have.css', 'border-bottom', '0.8px solid rgb(232, 232, 232)')

      //  Footer
      let year = new Date().getFullYear()
      console.log(year)
      let footerText = 'Copyright ' +year+ ' Kleenway Building Maintenance Inc. | All Rights Reserved'
      console.log(footerText)

      cy.get('footer')
        .should('have.css', 'background-color', 'rgb(249, 249, 249)')
        .find('label')
        .should('contain', footerText)
        .should('have.css', 'font-size', '10px')
        .and('have.css', 'color', 'rgb(180, 180, 180)')

    })
  })

  it('Check clients tabel', function (){
     // Open site
     cy.visit('/')

     signIn()

    // Navigate to page
     cy.get('a[class="sc-iMJOuO egWhhn"]').contains('Clients').click()
     cy.get('div[class="sc-fVLGaz hSTNxA"]')
      .should('contain', 'Clients')

     // Navigation bar
     cy.get('div[class="sc-gKXOVf hyloqv"]').find('a')
      .eq(0)
      .should('contain', 'Home')
    cy.get('div[class="sc-gKXOVf hyloqv"]').find('a')
      .eq(1)
      .should('contain', 'Clients')
    cy.get('div[class="sc-gKXOVf hyloqv"]').find('a')
      .contains('Home')
      .click()
    cy.get('div[class="sc-gKXOVf hyloqv"]').find('a')
      .eq(0)
      .should('contain', 'Home')
      cy.get('div[class="sc-gKXOVf hyloqv"]').find('a')
      .eq(1)
      .should('not.exist')

    //  Cleints tabel header
    cy.get('a[class="sc-iMJOuO egWhhn"]').contains('Clients').click()
    cy.get('tr[class="sc-dsQDmV ksGquX"]').then(tableHeader => {
      cy.wrap(tableHeader).should('have.css', 'background-color', 'rgb(203, 203, 203)')
      cy.wrap(tableHeader).find('th').each(label => {
        
        let labelText = label.text().trim()
        
        let text = {
          "Logo": "Logo",
          "Name": "Name",
          "Time Zone": "Time Zone"
        }

        cy.wrap(label).should('have.css', 'font-size', '18px')
          .and('have.css', 'color', 'rgb(85, 85, 85)')
          .and('contain', text[labelText])
      })
    })

    //  Redirect to the correct client info     
    cy.get('table[class="sc-bUbCnL fvwMww"]').find('tr')
      .eq(1)
      .find('td')
      .eq(1).then(clientName => {
        const clName = clientName.text().trim()
        cy.wrap(clientName)
          .click()
        cy.get('div[class="sc-gKXOVf hyloqv"]').find('a')
          .eq(2)
          .should('contain', clName)
        cy.get('div[class="sc-fjOrxA gjKWjZ"]')
          .find('p')
          .should('contain', clName)
      })
    
    //  Check the Client Info page styles
    cy.get('div[class="sc-eCOUaW cyOYLy nav-item"]')
      .find('a')
      .contains('General Info')
      .invoke('attr', 'aria-selected')
      .should('eq', 'true')

    cy.get('div[class="sc-fjOrxA gjKWjZ"]')
      .should('have.css', 'background-color', 'rgb(225, 225, 225)')
    cy.get('div[class="sc-fjOrxA gjKWjZ"]')
      .find('p')
      .should('have.css', 'font-size', '20px')
      .and('have.css', 'color', 'rgb(85, 85, 85)')
    cy.get('div[class="sc-ivmvlL caRrtz"]')
      .find('button').each( (buttonName, index) =>{

        let btnName = index.toString()
        
        let text = {
          "0":"Close without Saving",
          "1":"Save and Continue Editing",
          "2":"Save and Close"
        }

        cy.wrap(buttonName)
          .should('have.css', 'font-size', '14px')
          .and('contain', text[index])
        if (index < 2){
          cy.wrap(buttonName)
          .should('have.css', 'text-decoration', 'underline solid rgb(85, 85, 85)')
        }
        cy.get('div[class="sc-ivmvlL caRrtz"]')
        .find('button')
        .eq(2)
        .should('have.css', 'background-color', 'rgb(185, 224, 165)')
      })
    cy.get('[class="sc-eCOUaW cyOYLy nav-item"]')
      .find('a').each((navElement, index) =>{
        let elName = navElement.text().trim()

        let text = {
          "0":"General Info",
          "1":"Info Messages",
          "2":"Time & Attendance",
          "3":"Locations"
        }

        cy.wrap(navElement)
          .should('have.css', 'font-size', '16px')
          .and('have.css', 'color', 'rgb(85, 85, 85)')
          .and('contain', text[index])
      })
    cy.get('[class="sc-eCOUaW cyOYLy nav-item"]')
      .find('a[aria-selected="false"]').each(unselected =>{
        cy.wrap(unselected)
          .should('have.css', 'background-color', 'rgb(225, 225, 225)')
      })
    cy.get('[class="sc-eCOUaW cyOYLy nav-item"]')
      .find('a[aria-selected="true"]').each(unselected =>{
        cy.wrap(unselected)
          .should('have.css', 'background-color', 'rgb(255, 255, 255)')
      })


      
  }) 
})