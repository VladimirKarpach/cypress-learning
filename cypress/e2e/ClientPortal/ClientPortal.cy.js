/// <reference types="cypress"/>



let wrongPasswordMessage = 'The entered password is incorrect. Please try again.'
let onlyManagersOrClientsMessage = 'The entered Email is not found. Please, enter the correct email or consult your Kleenway Representative for assistance.'
let emailNotFoundMessage = 'The entered Email is not found. Please, enter the correct email or consult your Kleenway Representative for assistance.'
let errorWrongCurrentPass = 'The entered current password is incorrect. Please try again.'
let errorConfirmationPassMismatch = 'The password confirmation does not match the new password.'
let errorWrongNewPass = 'New password should meet the requirements: at least 8 characters, at least one uppercase letter, one lowercase letter and one number, not too obvious (like your name).'
let successPasswordChanged = 'Password successfully changed!'
let successSentChangedPassword = 'Password reset instructions successfully sent. Please, check your email.'

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

let woNameNew = 'Test Work Request'

function signIn() {
    cy.get('input[type="email"]').clear().type(correctClientMail)
    cy.get('input[type="password"]').clear().type(correctPasswordCleint)
    cy.get('button[type="submit"]').click()
}

describe("Client Portal", function () {

    //  Ignore errors in Console
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    it("Sign in/out", function () {

        cy.visit('/')

        // check all elements on the page
        cy.get('label[for="sign-in-email"]').should('contain', 'Email Address')
        cy.get('label[for="sign-in-password"]').should('contain', 'Password')
        cy.get('button[class="sc-hAZoDl fBdZfv btn btn-light"]').should('contain', 'Forgot your password?')
        cy.get('button[type="submit"]').should('contain', 'Sign In')

        //  check fields are required
        cy.get('input[type="email"]').type(notManagerOrClietMail)
        cy.get('button[type="submit"]').should('be.disabled')
        cy.get('input[type="email"]').clear()

        cy.get('input[type="password"]').type(correctPassForNotManagerOrCleint)
        cy.get('button[type="submit"]').should('be.disabled')
        cy.get('input[type="password"]').clear()

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
        cy.get('[role="alert"]').should('contain', wrongPasswordMessage)

        // correct credentials
        signIn()
        cy.get('button[class="sc-igHpSv efYDaS dropdown-toggle btn btn-primary"]').should('contain', clientUserName)

        // sign out
        cy.get('button[class="sc-igHpSv efYDaS dropdown-toggle btn btn-primary"]').should('contain', clientUserName).click()
        cy.contains('a', 'Sign Out').click()
        cy.get('label[for="sign-in-email"]').should('contain', 'Email Address')
        cy.get('label[for="sign-in-password"]').should('contain', 'Password')
    })

    it('Forgot Password. Page Content', () => {
        cy.visit('/')

        cy.get('button').contains('Forgot your password?').click()

        // check page elements
        cy.get('label[class="sc-ivTmOn hFGKCp"]').should('contain', 'Forgot Your Password?')
        cy.get('label[class="sc-cxabCf htiFkT"]').should('contain', 'Please enter your Email Address and we will send you the instructions on how to reset your password.')
        cy.get('button[class="sc-hAZoDl fBdZfv btn btn-light"]').should('contain', 'Back to Sign In')
        cy.get('button[type="submit"]').should('contain', 'Send Instructions')

        // check required fields
        cy.get('button[type="submit"]').should('be.disabled')
        cy.get('input[type="email"]').type(correctClientMail)
        cy.get('button[type="submit"]').should('not.be.disabled')

        //check message was sent
        cy.get('button[type="submit"]').click()
        cy.wait(5000)
        cy.get('[role="alert"]').should('contain', successSentChangedPassword)

        // check Back to Sign In
        cy.get('button[class="sc-hAZoDl fBdZfv btn btn-light"]').contains('Back to Sign In').click()
        cy.get('label[for="sign-in-email"]').should('contain', 'Email Address')
        cy.get('label[for="sign-in-password"]').should('contain', 'Password')
    })

    it('Change Password. Errors block', () => {

        cy.visit('/')

        signIn()

        // go to appropriated page
        cy.get('button[class="sc-igHpSv efYDaS dropdown-toggle btn btn-primary"]').click()
        cy.contains('a', 'Password').click()

        // check required fields        
        cy.get('input#reset-new-password').type(correctNewPasswordClient)
        cy.get('input#reset-rep-password').type(correctNewPasswordClient)
        cy.get('button[type="submit"]').should('be.disabled')
        cy.get('input#reset-new-password').clear()
        cy.get('input#reset-rep-password').clear()

        cy.get('input#change-current-password').type(correctNewPasswordClient)
        cy.get('input#reset-rep-password').type(correctNewPasswordClient)
        cy.get('button[type="submit"]').should('be.disabled')
        cy.get('input#change-current-password').clear()
        cy.get('input#reset-rep-password').clear()

        cy.get('input#change-current-password').type(correctNewPasswordClient)
        cy.get('input#reset-new-password').type(correctNewPasswordClient)
        cy.get('button[type="submit"]').should('be.disabled')
        cy.get('input#change-current-password').clear()
        cy.get('input#reset-new-password').clear()

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

        signIn()

        // go to appropriated page
        cy.get('button[class="sc-igHpSv efYDaS dropdown-toggle btn btn-primary"]').click()
        cy.contains('a', 'Password').click()

        //check the page elements
        cy.get('label[class="sc-cCsOjp jGKeAu"]').should('contain', 'Change Password')
        cy.get('label[class="sc-ciZhAO jolbHO"]').should('contain', 'To make your account secure, make sure your new password:')
        cy.contains('li', 'is at least 8 characters long').should('contain', 'is at least 8 characters long')
        cy.contains('li', 'has at least one uppercase letter, one lowercase letter and one number').should('contain', 'has at least one uppercase letter, one lowercase letter and one number')
        cy.contains('li', 'is not too obvious, like your name').should('contain', 'is not too obvious, like your name')
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
        cy.get('button[class="sc-igHpSv efYDaS dropdown-toggle btn btn-primary"]').should('contain', clientUserName).click()
        cy.contains('a', 'Sign Out').click()

        //  check Previous Password
        cy.get('input[type="email"]').type(correctClientMail)
        cy.get('input[type="password"]').type(correctPasswordCleint)
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', wrongPasswordMessage)

        //  check new password
        cy.get('input[type="email"]').clear().type(correctClientMail)
        cy.get('input[type="password"]').clear().type(correctNewPasswordClient)
        cy.get('button[type="submit"]').click()
        cy.get('button[class="sc-igHpSv efYDaS dropdown-toggle btn btn-primary"]').should('contain', clientUserName)

        //  return default password
        cy.get('button[class="sc-igHpSv efYDaS dropdown-toggle btn btn-primary"]').click()
        cy.contains('a', 'Password').click()
        cy.get('input#change-current-password').type(correctNewPasswordClient)
        cy.get('input#reset-new-password').type(correctPasswordCleint)
        cy.get('input#reset-rep-password').type(correctPasswordCleint)
        cy.get('button[type="submit"]').click()
        cy.wait(3000)
        cy.get('[role="alert"]').should('contain', successPasswordChanged)
        cy.get('button[class="sc-igHpSv efYDaS dropdown-toggle btn btn-primary"]').should('contain', clientUserName).click()
        cy.contains('a', 'Sign Out').click()
    })

    it('Check  View Ticket Details page', () => {

        cy.visit('/')

        signIn()

        //  Go to All Work Requests page
        cy.contains('label', 'Work Requests').click()

        //  Find and open needed Work request
        cy.get('button[class="sc-hAZoDl fBdZfv btn btn-light"]').contains('Search').click()
        cy.wait(5000)
        cy.get('input[class="sc-fbPSWO hQRRvE"]').type(woName)
        cy.get('button[class="sc-hAZoDl fBdZfv btn btn-light"]').contains('Apply Search').click()
        cy.wait(1000)
        cy.get('tr[class="sc-jQHtVU cjdcOE"]').contains('td', woName).click()

        //  Check page objects
        cy.get('div[class="sc-djvmMF jyOOKp"]').should('contain', 'View Work Request Details')

        //  Check labels
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Name').should('contain', 'Work Request Name:')
        cy.get('div[class="sc-ewDcJz TEBtv"]').contains('Child').should('contain', 'Child Work Requests:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Time').should('contain', 'Creation Time:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Status').should('contain', 'Status:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Service').should('contain', 'Service Type:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Classification').should('contain', 'Classification:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Work Type').should('contain', 'Work Type:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Priority').should('contain', 'Priority Level:')
        cy.get('div[class="sc-ewDcJz TEBtv"]').contains('Child').should('contain', 'Child Work Requests:')
        cy.get('div[class="sc-ewDcJz jZnTTx"]').contains('Location').should('contain', 'Location:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Target Start').should('contain', 'Target Start:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Target Finish').should('contain', 'Target Finish:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('First Name').should('contain', 'Requestor First Name:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Last Name').should('contain', 'Requestor Last Name:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Phone').should('contain', 'Requestor Phone No:')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Email').should('contain', 'Requestor Email:')
        cy.get('div[class="sc-ktCSKO gJgzNM"]').contains('Description').should('contain', 'Description')
        // cy.get('label').contains('Photos').should('contain', 'Photos:').should('contains', '(optional)')
        cy.get('div[class="sc-ewDcJz hynhWm"]').contains('Attachments').should('contain', 'Attachments:')


    })

    it('Ckeck styles', () => {
        cy.visit('/')

        signIn()

        //  Navigation menu
        cy.get('div[class="sc-fVLGaz hSTNxA"]')
            .should('contain', 'Home')
        cy.get('nav[class="sc-bgrGEg cMzWIl"]').then(navigationMenu => {
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
            cy.wrap(navigationMenu).find('a[class="sc-iMJOuO egWhhn"]').each(inactiveButton => {
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
            let year = new Date().getFullYear()
            console.log(year)
            let footerText = 'Copyright ' + year + ' Kleenway Building Maintenance Inc. | All Rights Reserved'
            console.log(footerText)

            cy.get('footer')
                .should('have.css', 'background-color', 'rgb(249, 249, 249)')
                .find('label')
                .should('contain', footerText)
                .should('have.css', 'font-size', '10px')
                .and('have.css', 'color', 'rgb(180, 180, 180)')

        })
    })

    it('Create a Work Request', () => {
        cy.visit('/')

        signIn()

        // go to New Work Request page
        cy.get('[class="sc-fVLGaz glDEhv"]').contains('Work Requests').click()
        cy.get('[class="sc-bczRLJ ecQjpe"]').contains('Water Systems').click()

        //  Check required fields        
        cy.contains('div', 'Work Request Name:').find('input')
        cy.contains('div', 'Classification:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Work Type:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Priority Level:').find('[class="sc-BeQoi djQezw"]').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Location:').find('span').click()
        cy.get('div[class="sc-eXBvqI jEKdan"]')
            .find('ul')
            .eq(0)
            .click()
        cy.contains('div', 'Description:').find('textarea').type('Test description')
        cy.contains('button', 'Confirm').should('be.disabled')
        cy.reload()

        cy.contains('div', 'Work Request Name').find('input').type(woNameNew, { force: true })
        cy.contains('div', 'Work Type:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Priority Level:').find('[class="sc-BeQoi djQezw"]').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Location:').find('span').click()
        cy.get('div[class="sc-eXBvqI jEKdan"]')
            .find('ul')
            .eq(0)
            .click()
        cy.contains('div', 'Description:').find('textarea').type('Test description')
        cy.contains('button', 'Confirm').should('be.disabled')
        cy.reload()

        cy.contains('div', 'Work Request Name').find('input').type(woNameNew, { force: true })
        cy.contains('div', 'Work Request Name:').find('input')
        cy.contains('div', 'Classification:').find('span').click()
        cy.contains('div', 'Work Type:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Priority Level:').find('[class="sc-BeQoi djQezw"]').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Location:').find('span').click()
        cy.get('div[class="sc-eXBvqI jEKdan"]')
            .find('ul')
            .eq(0)
            .click()
        cy.contains('div', 'Description:').find('textarea').type('Test description')
        cy.contains('button', 'Confirm').should('be.disabled')
        cy.reload()

        cy.contains('div', 'Work Request Name').find('input').type(woNameNew, { force: true })
        cy.contains('div', 'Work Request Name:').find('input')
        cy.contains('div', 'Classification:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Priority Level:').find('[class="sc-BeQoi djQezw"]').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Location:').find('span').click()
        cy.get('div[class="sc-eXBvqI jEKdan"]')
            .find('ul')
            .eq(0)
            .click()
        cy.contains('div', 'Description:').find('textarea').type('Test description')
        cy.contains('button', 'Confirm').should('be.disabled')
        cy.reload()

        cy.contains('div', 'Work Request Name').find('input').type(woNameNew, { force: true })
        cy.contains('div', 'Work Request Name:').find('input')
        cy.contains('div', 'Classification:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Work Type:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Location:').find('span').click()
        cy.get('div[class="sc-eXBvqI jEKdan"]')
            .find('ul')
            .eq(0)
            .click()
        cy.contains('div', 'Description:').find('textarea').type('Test description')
        cy.contains('button', 'Confirm').should('be.disabled')
        cy.reload()

        cy.contains('div', 'Work Request Name').find('input').type(woNameNew, { force: true })
        cy.contains('div', 'Work Request Name:').find('input')
        cy.contains('div', 'Classification:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Work Type:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Priority Level:').find('[class="sc-BeQoi djQezw"]').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Description:').find('textarea').type('Test description')
        cy.contains('button', 'Confirm').should('be.disabled')
        cy.reload()

        cy.contains('div', 'Work Request Name').find('input').type(woNameNew, { force: true })
        cy.contains('div', 'Work Request Name:').find('input')
        cy.contains('div', 'Classification:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Work Type:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Priority Level:').find('[class="sc-BeQoi djQezw"]').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Location:').find('span').click()
        cy.get('div[class="sc-eXBvqI jEKdan"]')
            .find('ul')
            .eq(0)
            .click()
        cy.contains('button', 'Confirm').should('be.disabled')
        cy.reload()

        // fill out all fields and Confirm
        cy.contains('div', 'Work Request Name').find('input').type(woNameNew, { force: true })
        cy.contains('div', 'Work Request Name:').find('input')
        cy.contains('div', 'Classification:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Work Type:').find('span').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Priority Level:').find('[class="sc-BeQoi djQezw"]').click()
        cy.get('div[style="display: block; z-index: 1000; position: relative; overflow-y: initial; max-height: 270px;"]')
            .find('div')
            .eq(0)
            .click()
        cy.contains('div', 'Location:').find('span').click()
        cy.get('div[class="sc-eXBvqI jEKdan"]')
            .find('ul')
            .eq(0)
            .click()
        cy.contains('div', 'Description:').find('textarea').type('Test description')
        cy.contains('button', 'Confirm').click()
    })
})