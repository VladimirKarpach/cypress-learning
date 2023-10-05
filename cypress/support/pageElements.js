
export class pageElements{

    alertMessage(message){
        cy.get('.alert-danger').should('contain', message)
    }

    successMessage(message){
        cy.get('.alert-success').should('contain', message)
    }

    toResetPasswordPage(){
        cy.get('header').find('button').click({force:true})
        cy.get('header').find('a').contains('Change Password').click({force:true})
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
        cy.get('button[type="submit"]').click({force:true})
    }

    goToWorkOrders(){
        cy.get('nav', {timeout: 10000}).find('a').contains('Work Requests').click({force:true})
    }

    selectTileByName(text){
        cy.get('[class="sc-gSAPjG fmhsUf"]', {timeout:5000}).contains(text).click({force:true})
    }

    findInputByPlaceholderAndTypeText(palceholder, text){

        cy.get(`[placeholder="${palceholder}"]:visible`, {timeout: 10000}).type(text, {force:true})
    }

    findInputByContentlderAndSelect(palceholder){

        cy.get('div').contains(palceholder).click({force:true})

    }
   
    selectOptionFromDropdown(){
        cy.get('[class="sc-hRwTwm dGIepr"]').find('div').eq(0).click({force:true})
    }

    findToggleButton(){
        cy.get('.custom-toggle')
    }

    selectWorkRequest(placeholder, workRequestName){
        this.findInputByPlaceholderAndTypeText(placeholder, workRequestName)
        cy.get('button').contains('Search').click({force:true})
        cy.wait(2000)
        cy.contains('tr', workRequestName).click({force:true})
    }

}

export const onPageElement = new pageElements()