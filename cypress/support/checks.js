import { onPageElement } from "./pageElements"

function checkRadioDown(index){
    if(index > 0){
        cy.get('.custom-radio').find('input').eq(index - 1).should('not.be.checked')
        checkRadioDown(index - 1)                 
    }
}

function checkRadioUp(index){
    if(index < 2){
        cy.get('.custom-radio').find('input').eq(index + 1).should('not.be.checked')
        checkRadioUp(index + 1)                 
    }
}

function checkCheckboxUpChecking(index){
    if(index < 4){
        cy.get('.custom-checkbox').find('input').eq(index + 1).should('not.be.checked')
        checkCheckboxUpChecking(index + 1)                 
    }
}

function checkCheckboxDownChecking(index){
    if(index > 0){
        cy.get('.custom-checkbox').find('input').eq(index - 1).should('be.checked')
        checkCheckboxDownChecking(index - 1)                 
    }
}

function checkCheckboxUpUnchecking(index){
    if(index < 4){
        cy.get('.custom-checkbox').find('input').eq(index + 1).should('be.checked')
        checkCheckboxUpUnchecking(index + 1)                 
    }
}

function checkCheckboxDownUnchecking(index){
    if(index > 0){
        cy.get('.custom-checkbox').find('input').eq(index - 1).should('not.be.checked')
        checkCheckboxDownUnchecking(index - 1)                 
    }
}

export class checks{
    
    findWorkRequest(workRequestName){
        onPageElement.findInputByPlaceholderAndTypeText('Search', workRequestName)
        cy.get('button').contains('Search').click()
        cy.get('tr.sc-bxSTMQ').should('contain', workRequestName)
    }

    checkToogleButtons(){
        cy.get('.custom-toggle').each(toggle => {
            cy.wrap(toggle).find('input').should('not.be.checked')
            cy.wrap(toggle).find('input').click({force:true})
            cy.wrap(toggle).find('input').should('be.checked')
        })
    }

    checkTextArea(text){
        cy.get('[class="sc-foDcoF jqZLhT"]').find('textarea').type(text, {force:true})
        cy.get('[class="sc-foDcoF jqZLhT"]').should('contain', text)
    }

    checkRadiobuttons(){
        cy.get('.custom-radio').each((radio, index) => {
            cy.wrap(radio).find('input').check({force:true})

            checkRadioDown(index)
            checkRadioUp(index)
        })
    }

    checkInput(text){
        cy.get('[placeholder="Enter answer"]').type(text, {force:true})
        cy.get('input[placeholder="Enter answer"]').should('have.value', text)
    }

    checkCheckbox(){
        cy.get('.custom-checkbox').each((checkbox, index) => {
            cy.wrap(checkbox).find('input').check({force:true})

            checkCheckboxUpChecking(index)
            checkCheckboxDownChecking(index)

        })

        cy.get('.custom-checkbox').each((checkbox, index) => {
            cy.wrap(checkbox).find('input').uncheck({force:true})

            checkCheckboxUpUnchecking(index)
            checkCheckboxDownUnchecking(index)

        })
    }

    checkDatepicker(){
        let currentTime = new Date()

        let currYear = currentTime.getFullYear()
        let currMonth = currentTime.getMonth() + 1
        let currDay = currentTime.getDate()
        let currHour = currentTime.getHours() % 12 || 12
        let currMinute = currentTime.getMinutes()
        let currSecond = currentTime.getSeconds()

        //Fill out fields and check it's filled
        cy.get('.react-datetime-picker__inputGroup__year').clear().type(currYear)
        cy.get('.react-datetime-picker__inputGroup__year').should('have.value', currYear)

        cy.get('.react-datetime-picker__inputGroup__month').clear().type(currMonth)
        cy.get('.react-datetime-picker__inputGroup__month').should('have.value', currMonth)

        cy.get('.react-datetime-picker__inputGroup__day').clear().type(currDay)
        cy.get('.react-datetime-picker__inputGroup__day').should('have.value', currDay)
        
        cy.get('.react-datetime-picker__inputGroup__hour').clear().type(currHour)
        cy.get('.react-datetime-picker__inputGroup__hour').should('have.value', currHour)

        cy.get('.react-datetime-picker__inputGroup__minute').clear().type(currMinute)
        cy.get('.react-datetime-picker__inputGroup__minute').should('have.value', currMinute)

        cy.get('.react-datetime-picker__inputGroup__second').clear().type(currSecond)
        cy.get('.react-datetime-picker__inputGroup__second').should('have.value', currSecond)

        cy.get('.react-datetime-picker__inputGroup__amPm').select('AM')
        cy.get('.react-datetime-picker__inputGroup__amPm').should('have.value', 'am')

        //Clear fields and check it's cleared
        cy.get('.react-datetime-picker__button').click()
        cy.get('.react-datetime-picker__inputGroup__year').should('have.value', '')
        cy.get('.react-datetime-picker__inputGroup__month').should('have.value', '')
        cy.get('.react-datetime-picker__inputGroup__day').should('have.value', '')
        cy.get('.react-datetime-picker__inputGroup__hour').should('have.value', '')
        cy.get('.react-datetime-picker__inputGroup__minute').should('have.value', '')
        cy.get('.react-datetime-picker__inputGroup__second').should('have.value', '')
    }
}

export const onCheck = new checks()