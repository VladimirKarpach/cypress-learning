

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

}

export const onPageElement = new pageElements()