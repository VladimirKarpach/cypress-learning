var login = "manager@mail.com";
var currPass = "TestPass1";
var newPass = "TestPass2";
var newCurrPass;
var oldPass;



describe ('Manager Portal', function(){
  it('Change password', function(){
      cy.viewport(1920, 1080);

      //Open site
      cy.visit('https://kori-dev.kleenwayservices.com/');

      //Sign In
      cy.get('input[type="email"]').type(login);
      cy.get('input[type="password"]').type(currPass);
      cy.get('button[type="submit"]').click();

      //Change password
      cy.get('[href="/change-password"] > .sc-eYmodA').click();
      cy.get('#change-current-password').type(currPass);
      cy.get('#reset-new-password').type(newPass);
      cy.get('#reset-rep-password').type(newPass);
      cy.get('button[type="submit"]').click();
      cy.get('.fade').contains("Password successfully changed!");

      //Change current and new password
      newCurrPass = newPass;
      oldPass = currPass;

      //Sign Out
      cy.get('[href="/"] > .sc-eYmodA').click();

      //Check old password
      cy.get('input[type="email"]').type(login);
      cy.get('input[type="password"]').type(oldPass);
      cy.get('button[type="submit"]').click();
      cy.get('.fade').contains("The entered password is incorrect. Please try again.");

      //Check new password
      cy.get('input[type="password"]').clear().type(newCurrPass);
      cy.get('button[type="submit"]').click();
      cy.get('.sc-papXJ').contains("Home");

      //Return to the default password
      cy.get('[href="/change-password"] > .sc-eYmodA').click();
      cy.get('#change-current-password').type(newCurrPass);
      cy.get('#reset-new-password').type(oldPass);
      cy.get('#reset-rep-password').type(oldPass);
      cy.get('button[type="submit"]').click();
  })

  it.only('All clients page', () => {
    
    cy.visit('/')
    cy.get('input[type="email"]').type(login)
    cy.get('input[type="password"]').type(currPass)
    cy.get('button').contains('Sign In').click()
    cy.get('a[href="/clients"]').click()
    cy.get('th[class="sc-hNKHps fyLzaB"]').contains('Logo').should('contain','Logo')
    cy.get('th[class="sc-hNKHps fyLzaB"]').contains('Name').should('contain','Name')
    cy.get('th[class="sc-hNKHps fyLzaB"]').contains('Time Zone').should('contain','Time Zone')
    cy.get('li[class="sc-lbxAil fQpkzm"]').contains('1')
  })
})