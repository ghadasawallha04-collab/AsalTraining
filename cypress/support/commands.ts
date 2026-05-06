/// <reference types="cypress" />
Cypress.Commands.add(
    'clickByText',
    (selector:string,text:string)=>{
        cy.contains(selector,text)
        .should('be.visible')
        .click();
    }
);
export {};