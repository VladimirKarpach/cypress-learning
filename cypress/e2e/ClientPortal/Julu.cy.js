/// <reference types="cypress"/>

import { signInTo, signOutFrom } from "../../support/signInOut"
import { onPageElement, pageElements } from "../../support/pageElements"

let errorMessages = {
    wrongPassword: 'The entered password is incorrect. Please try again.',
    onlyManagersOrClients:  'The entered Email is not found. Please, enter the correct email or consult your Kleenway Representative for assistance.',
    emailNotFound: 'The entered Email is not found. Please, enter the correct email or consult your Kleenway Representative for assistance.',
    WrongCurrentPassword: 'The entered current password is incorrect. Please try again.',
    ConfirmationPassMismatch: 'The password confirmation does not match the new password.',
    WrongNewPassword: 'New password should meet the requirements: at least 8 characters, at least one uppercase letter, one lowercase letter and one number, not too obvious (like your name).',
    errorWrongCurrentPass: 'The entered current password is incorrect. Please try again.',
    errorConfirmationPassMismatch: 'The password confirmation does not match the new password.',
    errorWrongNewPass: 'New password should meet the requirements: at least 8 characters, at least one uppercase letter, one lowercase letter and one number, not too obvious (like your name).'
    } 

let successMessage = {
    PasswordChanged: 'Password successfully changed!',
    SentChangedPassword: 'Password reset instructions successfully sent. Please, check your email.',
}

let userEmails = {
    correctClienPortal: 'cypress@test.com',
    correctManagerPortal: 'cypress@manager.com',
    notManagerOrCliet: 'qa_employee@test.com',
    wrong: 'any@mail.io',
}

let passwords = {
    correctCleintPortal: 'TestPass1',
    correctManagerPOrtal: 'TestPass1',
    correctNotManagerOrCliet: 'testpass',
    correctNewPassword: 'TestPass2',

    wrongLowercasseNumbersOnly: 'testpass1',
    wrongUppercaseNumbersOnly: 'TESTPASS1',
    worngWithoutNumbers: 'TESTpass',
    wrongOnlyNumbes: '12345678',
    wrongThreeSameInRow: 'TestPasss1',
    wrongFirstNameIncluded: 'CypressPass1',
    wrongLastNameIncluded: 'AutoPass1',
    worngLessEightCharacters: 'TestPa1',
    wrong: 'blablabla'
}
let clientUserName = 'Cypress Auto'




let woName = 'Parent Work Request'
let woNameNew = 'Test Work Request'

describe('Client Portal', () => {

    //ignoring errors in console
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach('Open Application', () => {
        cy.visit('/')
    })

    describe('Log In and Reset Paswordss tests', () => {

    
        it('Sign In With Correct Credentials', () => {
    
            signInTo.clientPortal(userEmails.correctClienPortal, passwords.correctCleintPortal)
            cy.get('header').find('button').should('contain', clientUserName)
    
        })
    
        it('Sign in with Incorrect Credentials', () =>{
    
            signInTo.clientPortal(userEmails.notManagerOrCliet, passwords.correctNotManagerOrCliet)
            onPageElement.alertMessage(errorMessages.onlyManagersOrClients)
    
            signInTo.clientPortal(userEmails.wrong, passwords.correctCleintPortal)
            onPageElement.alertMessage(errorMessages.emailNotFound)
    
            signInTo.clientPortal(userEmails.correctClienPortal, passwords.wrong)
            onPageElement.alertMessage(errorMessages.wrongPassword)
    
        })
    
        it('Reset Password. Correct Credentials', () =>{
    
            //Change password
            signInTo.clientPortal(userEmails.correctClienPortal, passwords.correctCleintPortal)
            onPageElement.toResetPasswordPage()
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.correctNewPassword)
            onPageElement.confirmPassword(passwords.correctNewPassword)
            onPageElement.submit()
            onPageElement.successMessage(successMessage.PasswordChanged)
    
            //Check if password was applied
            signOutFrom.clientPortal()
            signInTo.clientPortal(userEmails.correctClienPortal, passwords.correctCleintPortal)
            onPageElement.alertMessage(errorMessages.wrongPassword)
            signInTo.clientPortal(userEmails.correctClienPortal, passwords.correctNewPassword)
    
            //Change password back
            onPageElement.toResetPasswordPage()
            onPageElement.enterCurrentPassword(passwords.correctNewPassword)
            onPageElement.enterNewPassword(passwords.correctCleintPortal)
            onPageElement.confirmPassword(passwords.correctCleintPortal)
            onPageElement.submit()
            onPageElement.successMessage(successMessage.PasswordChanged)
        })

        it('Reset Password. Incorrect Input. Error Message block tets', () => {
            signInTo.clientPortal(userEmails.correctClienPortal, passwords.correctCleintPortal)
            onPageElement.toResetPasswordPage()

            //Wrong Current Password
            onPageElement.enterCurrentPassword(passwords.wrong)
            onPageElement.enterNewPassword(passwords.correctNewPassword)
            onPageElement.confirmPassword(passwords.correctNewPassword)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.WrongCurrentPassword)

            //Wrong New Password. Only lowercase and numbers
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongLowercasseNumbersOnly)
            onPageElement.confirmPassword(passwords.wrongLowercasseNumbersOnly)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)

            //Wrong New Password. Only uooercase and numbers
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongUppercaseNumbersOnly)
            onPageElement.confirmPassword(passwords.wrongUppercaseNumbersOnly)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)

            //Wrong New Password. No numbers
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.worngWithoutNumbers)
            onPageElement.confirmPassword(passwords.worngWithoutNumbers)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)

            ////Wrong New Password. Only numbers
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongOnlyNumbes)
            onPageElement.confirmPassword(passwords.wrongOnlyNumbes)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)

            //Wrong New Password. Three same letter in the line
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongThreeSameInRow)
            onPageElement.confirmPassword(passwords.wrongThreeSameInRow)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)

            //Wrong New Password. Contains First Name
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongFirstNameIncluded)
            onPageElement.confirmPassword(passwords.wrongFirstNameIncluded)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)

            //Wrong New Password. Contains Last Name
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongLastNameIncluded)
            onPageElement.confirmPassword(passwords.wrongLastNameIncluded)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)

            //Wrong Confirmation Password
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.correctNewPassword)
            onPageElement.confirmPassword(passwords.wrongUppercaseNumbersOnly)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorConfirmationPassMismatch)
        })

    })

    describe('Work Requests tests', () => {
        
        beforeEach('Sign In to the Client Portal', () => {

            signInTo.clientPortal(userEmails.correctClienPortal, passwords.correctCleintPortal)

        })

        it('Cretae New Work Requst', () => {

        })
    })


})