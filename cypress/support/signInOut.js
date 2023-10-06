
export class signIn{
    
    clientPortal(userEmail, userPassword){
        cy.get('#sign-in-email').clear().type(userEmail)
        cy.get('#sign-in-password').clear().type(userPassword)
        cy.get('button[type="submit"]').click()
    }

    managerPOrtal(userEmail, userPassword){
        cy.get('#sign-in-email').clear().type(userEmail)
        cy.get('#sign-in-password').clear().type(userPassword)
        cy.get('button[type="submit"]').click()
    }

}

export class signOut{
        clientPortal(){
            cy.get('header').find('button').click()
            cy.get('header').find('a').contains('Sign Out').click()
        }

        managerPortal(){
            cy.get('header').find('button').click()
            cy.get('header').find('a').contains('Sign Out').click()
        }

}

export const signInTo = new signIn()
export const signOutFrom = new signOut()