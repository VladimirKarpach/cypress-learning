/// <reference types="cypress"/>

import { signInTo, signOutFrom } from "../../support/signInOut"
import { onPageElement, pageElements } from "../../support/pageElements"
import { checks, check } from "../../support/checks"

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
            cy.reload()

            //Wrong New Password. Only lowercase and numbers
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongLowercasseNumbersOnly)
            onPageElement.confirmPassword(passwords.wrongLowercasseNumbersOnly)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)
            cy.reload()

            //Wrong New Password. Only uooercase and numbers
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongUppercaseNumbersOnly)
            onPageElement.confirmPassword(passwords.wrongUppercaseNumbersOnly)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)
            cy.reload()

            //Wrong New Password. No numbers
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.worngWithoutNumbers)
            onPageElement.confirmPassword(passwords.worngWithoutNumbers)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)
            cy.reload()

            ////Wrong New Password. Only numbers
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongOnlyNumbes)
            onPageElement.confirmPassword(passwords.wrongOnlyNumbes)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)
            cy.reload()

            //Wrong New Password. Three same letter in the line
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongThreeSameInRow)
            onPageElement.confirmPassword(passwords.wrongThreeSameInRow)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)
            cy.reload()

            //Wrong New Password. Contains First Name
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongFirstNameIncluded)
            onPageElement.confirmPassword(passwords.wrongFirstNameIncluded)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)
            cy.reload()

            //Wrong New Password. Contains Last Name
            onPageElement.enterCurrentPassword(passwords.correctCleintPortal)
            onPageElement.enterNewPassword(passwords.wrongLastNameIncluded)
            onPageElement.confirmPassword(passwords.wrongLastNameIncluded)
            onPageElement.submit()
            onPageElement.alertMessage(errorMessages.errorWrongNewPass)
            cy.reload()

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

            onPageElement.goToWorkOrders()
            onPageElement.selectTileByName('Water System')


            let workRequestName ='Work Request ' + (Math.random() * 1000)
            console.log (workRequestName)

            //Fill out all fieds and submit
            onPageElement.findInputByPlaceholderAndTypeText('Enter Work Request Name', workRequestName)
            onPageElement.findInputByContentlderAndSelect('Select Classification')
            onPageElement.selectOptionFromDropdown()
            onPageElement.findInputByContentlderAndSelect('Select Work Type')
            onPageElement.selectOptionFromDropdown()
            onPageElement.findInputByContentlderAndSelect('Select Priority Level')
            onPageElement.selectOptionFromDropdown()
            cy.get('[placeholder="Select Location"]').click({force:true})
            cy.get('.sc-jWEIYm').find('li').eq(0).click({force:true})
            onPageElement.findInputByPlaceholderAndTypeText('Enter Description', 'Test Description')
            cy.contains('button', 'Confirm').trigger('click')
            cy.get('label.sc-dZeWys').click()
            cy.contains('button', 'Submit').click()

            //Verify the Work Request was added
            check.findWorkRequest(workRequestName)
            
        })

        it('Chekc service types questions', () => {

            onPageElement.goToWorkOrders()
            onPageElement.selectTileByName('Janitorial')

            check.checkToogleButtons()
            check.checkTextArea('Tets text for the Text area')
            check.checkRadiobuttons()
            check.checkInput('Test text for the Input')
            check.checkCheckbox()
            check.checkDatepicker()
        
        })

        it('Check that created Work Request displayed correctly', () => {
            onPageElement.goToWorkOrders()
            onPageElement.selectWorkRequest('Search', 'Parent Work Request')
            check.chekcFieldContentByContent('Work Request Name:', 'WO3296: Parent Work Request')
            check.chekcFieldContentByContent('Location:', 'CYPRESSLOC')
            check.chekcFieldContentByContent('Child Work Requests:', 'WO3297: Child ticket 1')
            check.chekcFieldContentByContent('Child Work Requests:', 'WO3298: Child ticket 2')
            check.chekcFieldContentByContent('Child Work Requests:', 'WO3299: Child ticket 3')
            check.chekcFieldContentByContent('Creation Time:', 'April 26th 2023, 11:51 AM')
            check.chekcFieldContentByContent('Status:', 'New')
            check.chekcFieldContentByContent('Service Type:', 'Water Systems')
            check.chekcFieldContentByContent('Classification:', 'Other')
            check.chekcFieldContentByContent('Work Type:', 'Other')
            check.chekcFieldContentByContent('Priority Level:', 'Emergency/Immediate')
            check.chekcFieldContentByContent('Requestor First Name:', 'Cypress')
            check.chekcFieldContentByContent('Requestor Email:', 'cypress@test.com')
            check.chekcFieldContentByContent('Requestor Last Name:', 'Auto')
            check.chekcFieldContentByContent('Requestor Phone No:', 'N/A')
            check.chekcFieldContentByContent('Description:', 'Test Description')
            check.chekcFieldContentByContent('Attachments:', 'istockphoto-1146517111-612x612.jpg')
            check.chekcFieldContentByContent('Target Start:', 'April 26th 2023, 11:51 AM')
            check.chekcFieldContentByContent('Target Finish:', 'April 26th 2023, 11:51 PM')
            check.chekcFieldContentByContent('Scheduled Start:', 'June 6th 2023, 4:15 AM')
            check.chekcFieldContentByContent('Scheduled Finish:', 'June 6th 2023, 8:00 AM')
            check.chekcFieldContentByContent('Actual Start:', 'June 5th 2023, 4:30 AM')
            check.chekcFieldContentByContent('Actual Finish:', 'June 5th 2023, 6:45 AM')
            check.chekcFieldContentByContent('Technician Notes', 'April 26th 2023, 5:56 AM')
            check.chekcFieldContentByContent('Technician Notes', 'Details if note from technician. Could be pretty long, so let se how it will be display at the Client Portal UI. Hope all will be great.')
            check.chekcFieldContentByValue('Technician Name:', 'Roman Ilyad')
            check.chekcFieldContentByValue('Contact Phone:', '+333333')
            check.chekcFieldContentByValue('Contact Email:', 'roman@kleenwayservices.com')
            check.chekcFieldContentWhithImage('Photos(optional):', 0, 'https://us-central1-kleenway-development.cloudfunctions.net/clientPortal-getMaximoAttachment?workorderid=3943&attachmentId=2249&fileName=png-image.png')
            check.chekcFieldContentWhithImage('Photos(optional):', 1, 'https://us-central1-kleenway-development.cloudfunctions.net/clientPortal-getMaximoAttachment?workorderid=3943&attachmentId=2250&fileName=circle.png')
            check.chekcFieldContentWhithImage('Technician Photos:', 0, 'https://us-central1-kleenway-development.cloudfunctions.net/clientPortal-getMaximoAttachment?workorderid=3943&attachmentId=2251&fileName=tree-736885__480.jpg')
            check.chekcFieldContentWhithImage('Technician Photos:', 1, 'https://us-central1-kleenway-development.cloudfunctions.net/clientPortal-getMaximoAttachment?workorderid=3943&attachmentId=2252&fileName=istockphoto-517188688-612x612.jpg')
            
            check.sendCommentAndCheck('Test comment ')

            check.redirectionToChildAndParentTikcets()
        })


    })


})