/// <reference types="cypress"/>



let wrongPasswordMessage = 'The entered password is incorrect. Please try again.'
let onlyManagersOrClientsMessage = 'The entered Email is not found. Please, enter the correct email or consult your Kleenway Representative for assistance.'
let emailNotFoundMessage = 'The entered Email is not found. Please, enter the correct email or consult your Kleenway Representative for assistance.'
let errorWrongCurrentPass = 'The entered current password is incorrect. Please try again.'
let errorConfirmationPassMismatch = 'The password confirmation does not match the new password.'
let errorWrongNewPass = 'New password should meet the requirements: at least 8 characters, at least one uppercase letter, one lowercase letter and one number, not too obvious (like your name).'
let successPasswordChanged = 'Password successfully changed!'

let wrongPassLowerNumbers = 'testpass1'
let wrongPassUpperNumbers = 'TESTPASS1'
let worngPassLowerUpper = 'TESTpass'
let wrongPassNumbers = '12345678'
let wrongPassThreeInRow = 'TestPasss1'
let wrongPassWithFN = 'CypressPass1'
let wrongPassWithLN = 'AutoPass1'
let worngLessEight = 'TestPa1'

let notManagerOrClietMail = 'qa_employee@test.com'
let correctPassForNotManagerOrCleint = 'testpass'
let correctClientMail = 'cypress@test.com'
let correctPasswordCleint = 'TestPass1'
let correctNewPasswordClient = 'TestPass2'
let wrongEmail = 'any@mail.io'
let wrongPassword = 'blablabla'
let clientUserName = 'Cypress Auto'

let woName = 'Parent Work Request'

describe("Client Portal", function(){

    //  Ignore errors in Console
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })

    it("Sign in", function(){
        
        cy.visit('/')

        // check all elements on the page
        cy.get('label[for="sign-in-email"]').should('contain', 'Email Address')
        cy.get('label[for="sign-in-password"]').should('contain', 'Password')
        cy.get('button[class="sc-hAZoDl icfOxT btn btn-light"]').should('contain', 'Forgot your password?')
        cy.get('button[type="submit"]').should('contain', 'Sign In')

        // check error message if user doesn't have Manager or Client role
        cy.get('input[type="email"]').type(notManagerOrClietMail)
        cy.get('input[type="password"]').type(correctPassForNotManagerOrCleint)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', onlyManagersOrClientsMessage)

        // check message if email doesn't set to the KORi
        cy.get('input[type="email"]').clear().type(wrongEmail)
        cy.get('input[type="password"]').clear().type(correctPasswordCleint)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', emailNotFoundMessage)

        // check error message if user has worng password
        cy.get('input[type="email"]').clear().type(correctClientMail)
        cy.get('input[type="password"]').clear().type(wrongPassword)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain',wrongPasswordMessage)

        // correct credentials
        cy.get('input[type="email"]').clear().type(correctClientMail)
        cy.get('input[type="password"]').clear().type(correctPasswordCleint)
        cy.get('button[type="submit"]').click()
        cy.get('label[class="sc-eTtvFv ievaFl"]').should('contain', clientUserName)

        // sign out
        cy.get('[class="sc-iQJPop dfUhgN active"][href="/"]').click()
        cy.get('label[for="sign-in-email"]').should('contain', 'Email Address')
        cy.get('label[for="sign-in-password"]').should('contain', 'Password')
    })

    it('Forgot Password. Page Content', () => {
        cy.visit('/')

        cy.get('button').contains('Forgot your password?').click()

        // check page elements
        cy.get('label[class="sc-ivTmOn hFGKCp"]').should('contain', 'Forgot Your Password?')
        cy.get('label[class="sc-cxabCf htiFkT"]').should('contain', 'Please enter your Email Address and we will send you the instructions on how to reset your password.')
        cy.get('button[class="sc-hAZoDl icfOxT btn btn-light"]').should('contain', 'Back to Sign In')
        cy.get('button[type="submit"]').should('contain', 'Send Instructions')

        // check Back to Sign In
        cy.get('button[class="sc-hAZoDl icfOxT btn btn-light"]').click()
        cy.get('label[for="sign-in-email"]').should('contain', 'Email Address')
        cy.get('label[for="sign-in-password"]').should('contain', 'Password')
    })

    it('Change Password. Errors block', () => {

        cy.visit('/')

        //Sign in
        cy.get('input[type="email"]').clear().type(correctClientMail)
        cy.get('input[type="password"]').clear().type(correctPasswordCleint)
        cy.get('button[type="submit"]').click()

        // go to appropriated page
        cy.get('a[class="sc-iQJPop dfUhgN"][href="/change-password"]').click()

        //  Errors. Wrong current password
        cy.get('input#change-current-password').type(correctNewPasswordClient)
        cy.get('input#reset-new-password').type(correctNewPasswordClient)
        cy.get('input#reset-rep-password').type(correctNewPasswordClient)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorWrongCurrentPass)
        cy.reload(true)

        //  Errors. New and Confirmation passwords are mismatch
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(correctPasswordCleint)
        cy.get('input#reset-rep-password').type(correctNewPasswordClient)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorConfirmationPassMismatch)
        cy.reload(true)
        
        //  Errors. Lowercase and numbers
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(wrongPassLowerNumbers)
        cy.get('input#reset-rep-password').type(wrongPassLowerNumbers)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorWrongNewPass)
        cy.reload(true)

        //  Errors. Uppercase and numbers
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(wrongPassUpperNumbers)
        cy.get('input#reset-rep-password').type(wrongPassUpperNumbers)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorWrongNewPass)
        cy.reload(true)

        //  Errors. Lowercase and upercase
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(worngPassLowerUpper)
        cy.get('input#reset-rep-password').type(worngPassLowerUpper)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorWrongNewPass)
        cy.reload(true)

        //  Errors. Only numbers
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(wrongPassNumbers)
        cy.get('input#reset-rep-password').type(wrongPassNumbers)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorWrongNewPass)
        cy.reload(true)

        //  Errors. Three same characters in row
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(wrongPassThreeInRow)
        cy.get('input#reset-rep-password').type(wrongPassThreeInRow)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorWrongNewPass)
        cy.reload(true)

        //  Errors. Contains the First Name
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(wrongPassWithFN)
        cy.get('input#reset-rep-password').type(wrongPassWithFN)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorWrongNewPass)
        cy.reload(true)

        //  Errors. Contains the Last Name
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(wrongPassWithLN)
        cy.get('input#reset-rep-password').type(wrongPassWithLN)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorWrongNewPass)
        cy.reload(true)

        //  Errors. Less 8 characters
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(worngLessEight)
        cy.get('input#reset-rep-password').type(worngLessEight)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', errorWrongNewPass)
        cy.reload(true)
    })
    
    it('Change password. Correct Input', () => {
        cy.visit('/')

        //Sign in
        cy.get('input[type="email"]').clear().type(correctClientMail)
        cy.get('input[type="password"]').clear().type(correctPasswordCleint)
        cy.get('button[type="submit"]').click()

        // go to appropriated page
        cy.get('a[class="sc-iQJPop dfUhgN"][href="/change-password"]').click()

        //check the page elements
        cy.get('label[class="sc-cCsOjp jGKeAu"]').should('contain', 'Change Password')
        cy.get('label[class="sc-ciZhAO jolbHO"]').should('contain', 'To make your account secure, make sure your new password:')
        cy.contains('li', 'is at least 8 characters long').should('contain', 'is at least 8 characters long')
        cy.contains('li','has at least one uppercase letter, one lowercase letter and one number').should('contain', 'has at least one uppercase letter, one lowercase letter and one number')
        cy.contains('li','is not too obvious, like your name').should('contain', 'is not too obvious, like your name')
        cy.get('label[for="change-current-password"]').should('contain', 'Current Password')
        cy.get('label[for="reset-new-password"]').should('contain', 'New Password')
        cy.get('label[for="reset-rep-password"]').should('contain', 'Confirm New Password')
        cy.get('button[type="submit"]').should('contain', 'Save')

        //  Correct input
        cy.get('input#change-current-password').type(correctPasswordCleint)
        cy.get('input#reset-new-password').type(correctNewPasswordClient)
        cy.get('input#reset-rep-password').type(correctNewPasswordClient)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', successPasswordChanged)

        //  sign out and check password was changed in the KORi DB
        cy.get('[class="sc-iQJPop dfUhgN"]').click()

        //  check Previous Password
        cy.get('input[type="email"]').type(correctClientMail)
        cy.get('input[type="password"]').type(correctPasswordCleint)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain',wrongPasswordMessage)

        //  check new password
        cy.get('input[type="email"]').clear().type(correctClientMail)
        cy.get('input[type="password"]').clear().type(correctNewPasswordClient)
        cy.get('button[type="submit"]').click()
        cy.get('label[class="sc-eTtvFv ievaFl"]').should('contain', clientUserName)

        //  return default password
        cy.get('a[class="sc-iQJPop dfUhgN"][href="/change-password"]').click()
        cy.get('input#change-current-password').type(correctNewPasswordClient)
        cy.get('input#reset-new-password').type(correctPasswordCleint)
        cy.get('input#reset-rep-password').type(correctPasswordCleint)
        cy.get('button[type="submit"]').click()
    })

    it.only('Check  View Ticket Details page', () => {

        cy.visit('/')

        //  Sign in
        cy.get('input[type="email"]').clear().type(correctClientMail)
        cy.get('input[type="password"]').clear().type(correctPasswordCleint)
        cy.get('button[type="submit"]').click()

        //Go to All Work Requests page
        cy.get('a[class="sc-bczRLJ hgBxOv"]').contains('Work Requests').click()

        //Find and open needed Work request. Test push
        cy.get('button[class="sc-hAZoDl icfOxT btn btn-light"]').contains('Search').click()
        cy.wait(5000)
        cy.get('input[class="sc-fbPSWO hQRRvE"]').type(woName)
        cy.get('button[class="sc-hAZoDl icfOxT btn btn-light"]').contains('Apply Search').click()
        cy.wait(1000)
        cy.get('tr[class="sc-jQHtVU cjdcOE"]').contains('td', woName).click()

    })
})