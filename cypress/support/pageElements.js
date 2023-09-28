

export class pageElements{

    alertMessage(message){
        cy.get('.alert-danger').should('contain', message)
    }

    successMessage(message){
        cy.get('.alert-success').should('contain', message)
    }

    toResetPasswordPage(){
        cy.get('header').find('button').click()
        cy.get('header').find('a').contains('Change Password').click()
    }

    enterCurrentPassword(password){
        cy.get('#change-current-password').clear().type(password)
    }

    enterNewPassword(password){
        cy.get('#reset-new-password').clear().type(password)
    }

    confirmPassword(password){
        cy.get('#reset-rep-password').clear().type(password)
    }

    submit(){
        cy.get('button[type="submit"]').click()
    }

    goToWorkOrders(){
        cy.get('nav').find('a').contains('Work Requests').click()
    }

    selectTileByName(text){
        cy.get('[class="sc-gSAPjG fmhsUf"]').contains(text).click()
    }

    findInputByPlaceholderAndTypeText(palceholder, text){

        cy.get(`[placeholder="${palceholder}"]`).type(text, {force:true})
    }

    findInputByContentlderAndSelect(palceholder){

        cy.get('div').contains(palceholder).click({force:true})

    }
   
    selectOptionFromDropdown(){
        cy.get('[class="sc-hRwTwm dGIepr"]').find('div').eq(0).click({force:true})
    }
}

export const onPageElement = new pageElements()