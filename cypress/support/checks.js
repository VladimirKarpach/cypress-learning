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
}

export const onCheck = new checks()